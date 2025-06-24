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

// 简化的字体加载检查
const checkFontAvailability = () => {
  return new Promise<boolean>((resolve) => {
    // 检查字体文件是否可访问
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = './fonts/PingFangMengMeng-2.ttf';
  });
};

// 更直接的Canvas字体拦截
const interceptCanvasFontRendering = () => {
  // 拦截所有Canvas 2D Context的font设置
  const originalFont = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font');
  if (originalFont && originalFont.set) {
    Object.defineProperty(CanvasRenderingContext2D.prototype, 'font', {
      set: function(value: string) {
        let newValue = value;
        // 使用更强大的中文字体回退链替换
        const chineseFontFallback = `'PingFangMengMeng', 'PingFang SC', '苹方', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑'`;
        
        if (value.includes('Virgil') || value.includes('Arial') || value.includes('sans-serif')) {
          // 替换为中文字体链 + 原始字体
          newValue = value.replace(/(Virgil|Arial)/g, `${chineseFontFallback}, $1`);
          newValue = newValue.replace(/sans-serif/g, `${chineseFontFallback}, sans-serif`);
          // 移除调试日志，保持静默
        }
        originalFont.set?.call(this, newValue);
      },
      get: originalFont.get,
      configurable: true
    });
    return true;
  }
  return false;
};

// 注入自定义CSS来强制字体替换
const injectFontCSS = () => {
  const style = document.createElement('style');
  style.id = 'pingfang-mengmeng-override';
  style.textContent = `
    /* 强制覆盖所有可能的字体设置 */
    .excalidraw canvas {
      font-family: 'PingFangMengMeng', 'PingFang SC', '苹方', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'Virgil', 'Segoe UI Emoji', sans-serif !important;
    }
    
    /* 覆盖Excalidraw内部的字体设置 */
    * {
      --excalidraw-font-family-1: 'PingFangMengMeng', 'PingFang SC', '苹方', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'Virgil', 'Segoe UI Emoji', sans-serif !important;
    }
    
    /* 额外的强制样式 */
    .excalidraw .canvas-wrapper canvas {
      font-family: 'PingFangMengMeng', 'PingFang SC', '苹方', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'Virgil', 'Segoe UI Emoji', sans-serif !important;
    }
  `;
  
  // 移除之前的样式
  const existing = document.getElementById('pingfang-mengmeng-override');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(style);
};

const ExcalidrawWrapper = ({
  mermaidDefinition,
  mermaidOutput,
}: ExcalidrawWrapperProps) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  // 设置字体替换（静默模式）
  useEffect(() => {
    const setupFont = async () => {
      try {
        // 1. 注入CSS
        injectFontCSS();
        
        // 2. 设置Canvas拦截
        interceptCanvasFontRendering();
        
        // 3. 检查字体文件是否可用（静默）
        await checkFontAvailability();
        
        // 4. 强制重新渲染（如果API可用）
        if (excalidrawAPI) {
          setTimeout(() => {
            excalidrawAPI.refresh();
          }, 100);
        }
        
      } catch (error) {
        // 静默处理错误
      }
    };

    setupFont();
  }, [excalidrawAPI]);

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
      fontFamily: FONT_FAMILY.HANDWRITTEN, // 使用手写字体ID
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
            currentItemFontFamily: FONT_FAMILY.HANDWRITTEN,
          },
        }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
};

export default ExcalidrawWrapper;
