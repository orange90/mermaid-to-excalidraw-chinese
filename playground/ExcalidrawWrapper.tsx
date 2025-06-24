import { useEffect, useState } from "react";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types.js";
import { graphToExcalidraw } from "../src/graphToExcalidraw";
import { DEFAULT_FONT_SIZE, FONT_FAMILY } from "../src/constants";
import { loadPingFangMengMengFont, isPingFangMengMengAvailable } from "./fontManager";
import type { MermaidData } from "./";

interface ExcalidrawWrapperProps {
  mermaidDefinition: MermaidData["definition"];
  mermaidOutput: MermaidData["output"];
}

// 字体加载函数现在从fontManager导入

// 简单直接的字体重写
const setupCustomFont = async () => {
  try {
    // 确保字体已加载
    await loadPingFangMengMengFont();
    
    // 尝试访问Excalidraw内部的字体系统
    // 这是一个hack方法，直接修改全局对象
    (window as any).ExcalidrawFontFamily = {
      1: 'PingFangMengMeng, Virgil, Segoe UI Emoji',
      2: 'Nunito',
      3: 'Comic Shanns'
    };

    // 同时修改document.fonts的Virgil字体
    const pingFangFont = new FontFace(
      'Virgil', // 冒充Virgil字体
      'url(./fonts/PingFangMengMeng-2.ttf)',
      { weight: 'normal', style: 'normal' }
    );
    
    await pingFangFont.load();
    
    // 删除原有的Virgil字体（如果存在）
    document.fonts.forEach(font => {
      if (font.family === 'Virgil') {
        document.fonts.delete(font);
      }
    });
    
    // 添加我们的字体作为Virgil
    document.fonts.add(pingFangFont);
    
    console.log('✅ 已成功替换Virgil字体为平方萌萌哒！');
    return true;
  } catch (error) {
    console.warn('字体替换失败:', error);
    return false;
  }
};

// 覆盖Excalidraw的字体映射
const overrideExcalidrawFonts = () => {
  // 等待Excalidraw完全加载
  const checkAndOverride = () => {
    try {
      // 尝试访问Excalidraw内部的字体映射
      const canvas = document.querySelector('.excalidraw canvas') as HTMLCanvasElement;
      if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 覆盖Canvas的font属性设置
          const originalFont = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font');
          if (originalFont) {
            Object.defineProperty(ctx, 'font', {
              set: function(value: string) {
                // 如果字体设置包含Virgil，替换为平方萌萌哒
                let newValue = value;
                if (value.includes('Virgil') || value.includes('font-family-1') || value.includes('handwritten')) {
                  newValue = value.replace(/Virgil|font-family-1|handwritten/g, 'PingFangMengMeng');
                  console.log('字体已替换:', value, '->', newValue);
                }
                originalFont.set?.call(this, newValue);
              },
              get: originalFont.get,
              configurable: true
            });
          }
        }
      }
    } catch (error) {
      console.warn('字体覆盖失败:', error);
    }
  };

  // 立即执行一次
  checkAndOverride();
  
  // 使用MutationObserver监听DOM变化
  const observer = new MutationObserver(() => {
    checkAndOverride();
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
  const [fontLoaded, setFontLoaded] = useState(false);

  // 设置自定义字体
  useEffect(() => {
    setupCustomFont().then((success) => {
      setFontLoaded(success);
      if (success) {
        // 字体设置成功后，开始覆盖字体渲染
        const cleanup = overrideExcalidrawFonts();
        return cleanup;
      }
    });
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
      fontFamily: FONT_FAMILY.HANDWRITTEN, // 使用手写字体ID（现在会是平方萌萌哒）
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
            currentItemFontFamily: FONT_FAMILY.PINGFANG_MENGMENG, // 平方萌萌哒中文字体
          },
        }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
      {/* 字体状态指示器 */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: fontLoaded ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 152, 0, 0.9)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 'bold',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        {fontLoaded ? '✅ 平方萌萌哒字体已激活' : '⏳ 正在加载平方萌萌哒字体...'}
      </div>
    </div>
  );
};

export default ExcalidrawWrapper;
