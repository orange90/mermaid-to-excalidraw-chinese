import { useEffect, useState } from "react";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types.js";
import { graphToExcalidraw } from "../src/graphToExcalidraw";
import { DEFAULT_FONT_SIZE, FONT_FAMILY } from "../src/constants";
import FontTest from "./FontTest";
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
          console.log('🎨 Canvas字体拦截:', value, '->', newValue);
        }
        originalFont.set?.call(this, newValue);
      },
      get: originalFont.get,
      configurable: true
    });
    console.log('✅ Canvas字体拦截器已安装');
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
  console.log('✅ 字体CSS已注入');
};

const ExcalidrawWrapper = ({
  mermaidDefinition,
  mermaidOutput,
}: ExcalidrawWrapperProps) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [fontStatus, setFontStatus] = useState<'loading' | 'available' | 'fallback'>('loading');

  // 设置字体替换
  useEffect(() => {
    const setupFont = async () => {
      try {
        console.log('🚀 开始设置平方萌萌哒字体...');
        
        // 1. 注入CSS
        injectFontCSS();
        
        // 2. 设置Canvas拦截
        const canvasIntercepted = interceptCanvasFontRendering();
        
        // 3. 检查字体文件是否可用
        const fontFileAvailable = await checkFontAvailability();
        
        if (fontFileAvailable) {
          setFontStatus('available');
          console.log('✅ 平方萌萌哒字体文件可用');
        } else {
          setFontStatus('fallback');
          console.log('⚠️ 字体文件不可用，使用回退方案');
        }
        
        // 4. 强制重新渲染（如果API可用）
        if (excalidrawAPI) {
          setTimeout(() => {
            excalidrawAPI.refresh();
          }, 100);
        }
        
      } catch (error) {
        console.error('❌ 字体设置失败:', error);
        setFontStatus('fallback');
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

  const getStatusInfo = () => {
    switch (fontStatus) {
      case 'loading':
        return { text: '⏳ 正在设置平方萌萌哒字体...', color: 'rgba(255, 152, 0, 0.9)' };
      case 'available':
        return { text: '✅ 平方萌萌哒字体已激活', color: 'rgba(76, 175, 80, 0.9)' };
      case 'fallback':
        return { text: '⚠️ 使用字体回退方案', color: 'rgba(255, 193, 7, 0.9)' };
    }
  };

  const statusInfo = getStatusInfo();

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
      
      {/* 字体测试面板 */}
      <FontTest />
      
      {/* 字体状态指示器 */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: statusInfo.color,
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 'bold',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        userSelect: 'none'
      }}>
        {statusInfo.text}
      </div>

      {/* 调试信息 */}
      {fontStatus === 'fallback' && (
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          zIndex: 1000,
          maxWidth: '300px'
        }}>
          <div>💡 调试提示：</div>
          <div>1. 确保字体文件在 ./fonts/ 目录</div>
          <div>2. 检查浏览器控制台的详细错误</div>
          <div>3. 字体替换仍可能生效</div>
        </div>
      )}
    </div>
  );
};

export default ExcalidrawWrapper;
