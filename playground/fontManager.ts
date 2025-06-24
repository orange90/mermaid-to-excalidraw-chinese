// 字体管理器 - 专门为Excalidraw处理平方萌萌哒字体

interface FontConfig {
  name: string;
  url: string;
  fallbacks: string[];
}

class FontManager {
  private loadedFonts: Set<string> = new Set();

  async loadFont(config: FontConfig): Promise<boolean> {
    try {
      // 检查字体是否已加载
      if (this.loadedFonts.has(config.name)) {
        return true;
      }

      // 创建FontFace实例
      const fontFace = new FontFace(
        config.name,
        `url(${config.url})`,
        {
          weight: 'normal',
          style: 'normal',
          display: 'swap'
        }
      );

      // 加载字体
      await fontFace.load();
      
      // 添加到document.fonts
      document.fonts.add(fontFace);
      
      // 标记为已加载
      this.loadedFonts.add(config.name);
      
      console.log(`字体 ${config.name} 加载成功！`);
      return true;
    } catch (error) {
      console.warn(`字体 ${config.name} 加载失败:`, error);
      return false;
    }
  }

  async loadPingFangMengMeng(): Promise<boolean> {
    return this.loadFont({
      name: 'PingFangMengMeng',
      url: './fonts/PingFangMengMeng-2.ttf',
      fallbacks: ['Virgil', 'Segoe UI Emoji', 'sans-serif']
    });
  }

  // 检查字体是否可用
  isFontAvailable(fontName: string): boolean {
    return this.loadedFonts.has(fontName) || this.checkSystemFont(fontName);
  }

  // 检查系统是否有该字体
  private checkSystemFont(fontName: string): boolean {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return false;

    // 使用一个已知字体作为基准
    context.font = `12px monospace`;
    const baselineWidth = context.measureText('测试文字').width;

    // 测试目标字体
    context.font = `12px ${fontName}, monospace`;
    const testWidth = context.measureText('测试文字').width;

    return baselineWidth !== testWidth;
  }

  // 获取字体回退序列
  getFontFamily(primaryFont: string, fallbacks: string[] = []): string {
    const fonts = [primaryFont, ...fallbacks];
    return fonts.join(', ');
  }
}

// 创建全局字体管理器实例
export const fontManager = new FontManager();

// 导出便利函数
export const loadPingFangMengMengFont = () => fontManager.loadPingFangMengMeng();
export const isPingFangMengMengAvailable = () => fontManager.isFontAvailable('PingFangMengMeng');
export const getPingFangMengMengFamily = () => 
  fontManager.getFontFamily('PingFangMengMeng', ['Virgil', 'Segoe UI Emoji', 'sans-serif']); 