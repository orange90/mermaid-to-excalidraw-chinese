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

// 简单直接的字体重写 - 针对生产环境优化
const setupCustomFont = async () => {
  try {
    // 1. 首先设置系统中文字体映射（即使自定义字体失败也能工作）
    (window as any).ExcalidrawFontFamily = {
      1: `${SYSTEM_CHINESE_FONTS}, Virgil, Segoe UI Emoji, sans-serif`,
      2: 'Nunito, sans-serif',
      3: 'Comic Shanns, monospace'
    };

    // 2. 尝试加载自定义字体文件
    try {
      const pingFangFont = new FontFace(
        'PingFangMengMeng',
        `url(${fontUrl})`,
        { 
          weight: 'normal', 
          style: 'normal',
          display: 'swap'
        }
      );
      
      await pingFangFont.load();
      document.fonts.add(pingFangFont);
      
      // 更新字体映射包含自定义字体
      (window as any).ExcalidrawFontFamily[1] = `PingFangMengMeng, ${SYSTEM_CHINESE_FONTS}, Virgil, Segoe UI Emoji, sans-serif`;
      
      console.log('✅ PingFangMengMeng font loaded successfully');
      return true;
      
    } catch (fontError) {
      // 字体文件加载失败，继续使用系统字体
      console.log('⚠️ Custom font not available, using system fonts');
      return true; // 仍然返回true，因为系统字体可用
    }
    
  } catch (error) {
    console.error('❌ Font setup failed:', error);
    return false;
  }
};

// 强制CSS字体覆盖 - 确保在所有环境中生效
const injectFontCSS = () => {
  const style = document.createElement('style');
  style.id = 'chinese-font-override';
  
  const fullFontChain = `'PingFangMengMeng', '${SYSTEM_CHINESE_FONTS}', 'Virgil', 'Segoe UI Emoji', sans-serif`;
  
  style.textContent = `
    /* 强制覆盖Excalidraw字体 */
    .excalidraw canvas {
      font-family: ${fullFontChain} !important;
    }
    
    /* 覆盖CSS变量 */
    :root {
      --excalidraw-font-family-1: ${fullFontChain} !important;
    }
    
    /* 额外保障 */
    .excalidraw .canvas-wrapper canvas,
    .excalidraw-container canvas {
      font-family: ${fullFontChain} !important;
    }
  `;
  
  const existing = document.getElementById('chinese-font-override');
  if (existing) existing.remove();
  
  document.head.appendChild(style);
};

// 覆盖Excalidraw的字体映射 - 增强版
const overrideExcalidrawFonts = () => {
  // 全局Canvas字体拦截
  const originalFont = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font');
  if (originalFont && originalFont.set) {
    Object.defineProperty(CanvasRenderingContext2D.prototype, 'font', {
      set: function(value: string) {
        let newValue = value;
        if (value.includes('Virgil') || value.includes('Arial') || value.includes('sans-serif')) {
          // 替换为中文字体
          newValue = value.replace(/Virgil/g, SYSTEM_CHINESE_FONTS);
          newValue = newValue.replace(/Arial/g, SYSTEM_CHINESE_FONTS);
          newValue = newValue.replace(/sans-serif/g, `${SYSTEM_CHINESE_FONTS}, sans-serif`);
        }
        originalFont.set?.call(this, newValue);
      },
      get: originalFont.get,
      configurable: true
    });
  }
  
  // 监听DOM变化，确保持续应用
  const observer = new MutationObserver(() => {
    // 持续应用CSS覆盖
    injectFontCSS();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => observer.disconnect();
};

const ExcalidrawWrapper = ({
  mermaidDefinition,
  mermaidOutput,
}: ExcalidrawWrapperProps) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  // 设置字体支持
  useEffect(() => {
    const setupFonts = async () => {
      // 1. 注入CSS
      injectFontCSS();
      
      // 2. 设置字体
      await setupCustomFont();
      
      // 3. 覆盖Canvas渲染
      const cleanup = overrideExcalidrawFonts();
      return cleanup;
    };

    setupFonts();
  }, []);

  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }

    if (mermaidDefinition === "" || mermaidOutput === null) {
      excalidrawAPI.resetScene();
      return;
    }

    const { elements, files } = graphToExcalidraw(mermaidOutput, {
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: FONT_FAMILY.HANDWRITTEN, // 使用手写字体ID（现在会是中文字体）
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
  }, [mermaidDefinition, mermaidOutput]);

  return (
    <div className="excalidraw-wrapper">
      <Excalidraw
        initialData={{
          appState: {
            viewBackgroundColor: "#fafafa",
            currentItemFontFamily: FONT_FAMILY.HANDWRITTEN, // 使用手写字体（现在应该是中文字体）
          },
        }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
};

export default ExcalidrawWrapper;
