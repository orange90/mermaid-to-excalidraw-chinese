import { useEffect, useState } from "react";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types.js";
import { graphToExcalidraw } from "../src/graphToExcalidraw";
import { DEFAULT_FONT_SIZE, FONT_FAMILY } from "../src/constants";
import type { MermaidData } from "./";

interface ExcalidrawWrapperProps {
  mermaidDefinition: MermaidData["definition"];
  mermaidOutput: MermaidData["output"];
}

// 简单直接的字体重写
const setupCustomFont = async () => {
  try {
    // 尝试访问Excalidraw内部的字体系统
    // 这是一个hack方法，直接修改全局对象
    (window as any).ExcalidrawFontFamily = {
      1: 'PingFangMengMeng, PingFang SC, 苹方, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Virgil, Segoe UI Emoji',
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
    
    return true;
  } catch (error) {
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
                // 如果字体设置包含Virgil，替换为中文字体
                let newValue = value;
                const chineseFonts = 'PingFang SC, 苹方, Hiragino Sans GB, Microsoft YaHei, 微软雅黑';
                if (value.includes('Virgil') || value.includes('font-family-1') || value.includes('handwritten')) {
                  newValue = value.replace(/Virgil|font-family-1|handwritten/g, chineseFonts);
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
      // 静默处理错误
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

  // 设置自定义字体
  useEffect(() => {
    setupCustomFont().then((success) => {
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
