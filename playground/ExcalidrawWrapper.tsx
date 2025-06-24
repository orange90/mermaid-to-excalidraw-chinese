import { useEffect, useState } from "react";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types.js";
import { graphToExcalidraw } from "../src/graphToExcalidraw";
import { DEFAULT_FONT_SIZE, FONT_FAMILY } from "../src/constants";
import type { MermaidData } from "./";

// 通过Vite导入字体文件，这样路径会自动处理
import fontUrl from './fonts/PingFangMengMeng-2.ttf?url';

interface ExcalidrawWrapperProps {
  mermaidDefinition: MermaidData["definition"];
  mermaidOutput: MermaidData["output"];
}

// 系统中文字体回退链
const SYSTEM_CHINESE_FONTS = 'PingFang SC, 苹方, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, SimSun, 宋体';

// 字体管理器
class FontManager {
  private static instance: FontManager;
  private fontLoaded = false;
  private systemFonts = 'PingFang SC, 苹方, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, SimSun, 宋体';

  static getInstance() {
    if (!FontManager.instance) {
      FontManager.instance = new FontManager();
    }
    return FontManager.instance;
  }

  async loadCustomFont(): Promise<boolean> {
    if (this.fontLoaded) return true;

    console.log('🎯 Loading PingFangMengMeng font...');

    // 首先设置CSS @font-face（如果还没有）
    this.injectFontCSS();

    // 尝试多个字体源
    const fontSources = [
      '/PingFangMengMeng-2.ttf', // Vercel生产环境
      './fonts/PingFangMengMeng-2.ttf', // 本地开发
      '/pingfangmengmeng-2.ttf' // 备用小写路径
    ];

    for (const src of fontSources) {
      try {
        console.log(`🔍 Trying to load font from: ${src}`);
        
        const font = new FontFace(
          'PingFangMengMeng',
          `url(${src})`,
          { weight: 'normal', style: 'normal', display: 'swap' }
        );

        await font.load();
        document.fonts.add(font);
        
        console.log(`✅ Font loaded successfully from: ${src}`);
        this.fontLoaded = true;
        return true;
      } catch (error) {
        console.log(`❌ Failed to load from ${src}:`, error);
      }
    }

    console.log('⚠️ Custom font failed to load, will use system fonts');
    return false;
  }

  private injectFontCSS() {
    const existingStyle = document.getElementById('pingfang-font-style');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'pingfang-font-style';
    style.textContent = `
      @font-face {
        font-family: 'PingFangMengMeng';
        src: url('/PingFangMengMeng-2.ttf') format('truetype'),
             url('./fonts/PingFangMengMeng-2.ttf') format('truetype'),
             url('/pingfangmengmeng-2.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  setupExcalidrawFonts() {
    const chineseFontChain = this.fontLoaded 
      ? `PingFangMengMeng, ${this.systemFonts}`
      : this.systemFonts;

    console.log(`🎨 Setting Excalidraw fonts: ${chineseFontChain}`);

    // 设置Excalidraw字体映射
    (window as any).ExcalidrawFontFamily = {
      1: `${chineseFontChain}, Virgil, Segoe UI Emoji, sans-serif`,
      2: 'Nunito, sans-serif', 
      3: 'Comic Shanns, monospace'
    };

    // 拦截Canvas字体设置
    this.interceptCanvasFont(chineseFontChain);

    // 注入CSS覆盖
    this.injectCanvasCSS(chineseFontChain);
  }

  private interceptCanvasFont(chineseFontChain: string) {
    const originalSetFont = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font');
    if (!originalSetFont) return;

    Object.defineProperty(CanvasRenderingContext2D.prototype, 'font', {
      set: function(value: string) {
        let newValue = value;
        
        // 替换Excalidraw使用的字体
        if (value.includes('Virgil') || value.includes('handwritten') || value.includes('font-family-1')) {
          newValue = value.replace(/(Virgil|handwritten|font-family-1)/g, chineseFontChain);
          console.log(`🔄 Font intercepted: ${value} → ${newValue}`);
        }
        
        originalSetFont.set?.call(this, newValue);
      },
      get: originalSetFont.get,
      configurable: true
    });
  }

  private injectCanvasCSS(chineseFontChain: string) {
    const existingStyle = document.getElementById('excalidraw-font-override');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'excalidraw-font-override';
    style.textContent = `
      .excalidraw canvas {
        font-family: ${chineseFontChain}, Virgil, Segoe UI Emoji, sans-serif !important;
      }
      
      :root {
        --excalidraw-font-family-1: ${chineseFontChain}, Virgil, Segoe UI Emoji, sans-serif !important;
      }
    `;
    document.head.appendChild(style);
  }
}

const ExcalidrawWrapper = ({
  mermaidDefinition,
  mermaidOutput,
}: ExcalidrawWrapperProps) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const [fontReady, setFontReady] = useState(false);

  // 字体初始化
  useEffect(() => {
    const initFont = async () => {
      const fontManager = FontManager.getInstance();
      
      // 加载字体
      await fontManager.loadCustomFont();
      
      // 设置Excalidraw字体
      fontManager.setupExcalidrawFonts();
      
      // 持续监控并更新字体设置
      const interval = setInterval(() => {
        fontManager.setupExcalidrawFonts();
      }, 3000);

      setFontReady(true);

      return () => clearInterval(interval);
    };

    initFont();
  }, []);

  // 图表渲染
  useEffect(() => {
    if (!excalidrawAPI || !fontReady) {
      return;
    }

    if (mermaidDefinition === "" || mermaidOutput === null) {
      excalidrawAPI.resetScene();
      return;
    }

    const { elements, files } = graphToExcalidraw(mermaidOutput, {
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: FONT_FAMILY.HANDWRITTEN,
    });

    excalidrawAPI.updateScene({
      elements: convertToExcalidrawElements(elements),
    });
    excalidrawAPI.scrollToContent(excalidrawAPI.getSceneElements(), {
      fitToContent: true,
    });

    if (files) {
      excalidrawAPI.addFiles(Object.values(files));
    }
  }, [mermaidDefinition, mermaidOutput, excalidrawAPI, fontReady]);

  return (
    <div className="excalidraw-wrapper">
      <Excalidraw
        initialData={{
          appState: {
            viewBackgroundColor: "#fafafa",
            currentItemFontFamily: FONT_FAMILY.HANDWRITTEN,
          },
        }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
};

export default ExcalidrawWrapper;
