import { useEffect, useState } from 'react';

// 字体测试组件
const FontTest = () => {
  const [fontInfo, setFontInfo] = useState<string[]>([]);

  useEffect(() => {
    const testFonts = () => {
      const testText = '测试中文字体效果 - 平方萌萌哒';
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      const fonts = [
        'PingFangMengMeng',
        'PingFang SC',
        '苹方',
        'Hiragino Sans GB',
        'Microsoft YaHei',
        '微软雅黑',
        'Virgil',
        'Arial'
      ];

      const results: string[] = [];
      
      fonts.forEach(font => {
        ctx.font = `20px ${font}`;
        const width = ctx.measureText(testText).width;
        
        // 检查是否为默认字体
        ctx.font = '20px serif';
        const defaultWidth = ctx.measureText(testText).width;
        
        const available = width !== defaultWidth;
        results.push(`${font}: ${available ? '✅ 可用' : '❌ 不可用'} (宽度: ${width.toFixed(1)}px)`);
      });

      setFontInfo(results);
    };

    testFonts();
  }, []);

  return (
    <div style={{ 
      position: 'absolute', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(255,255,255,0.95)', 
      padding: '15px', 
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontSize: '13px',
      fontFamily: 'monospace',
      maxWidth: '350px',
      zIndex: 9999
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>🔤 字体测试面板</h3>
      
      {/* 系统字体测试 */}
      <div style={{ marginBottom: '15px' }}>
        <strong>系统字体检测:</strong>
        {fontInfo.map((info, index) => (
          <div key={index} style={{ fontSize: '12px', marginTop: '3px' }}>
            {info}
          </div>
        ))}
      </div>

      {/* 视觉字体测试 */}
      <div>
        <strong>视觉效果测试:</strong>
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          background: '#f5f5f5', 
          borderRadius: '4px' 
        }}>
          <div style={{ 
            fontFamily: "'PingFangMengMeng', 'PingFang SC', '苹方', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑'",
            fontSize: '16px',
            marginBottom: '5px'
          }}>
            中文测试：平方萌萌哒字体 🎨
          </div>
          <div style={{ 
            fontFamily: 'Virgil, Arial, sans-serif',
            fontSize: '16px',
            color: '#666'
          }}>
            Original: Hello World 123
          </div>
        </div>
      </div>
      
      {/* 状态指示 */}
      <div style={{ 
        marginTop: '10px', 
        padding: '5px', 
        background: '#e3f2fd', 
        borderRadius: '4px',
        fontSize: '11px',
        color: '#1565c0'
      }}>
        💡 如果平方萌萌哒显示为"不可用"，系统会自动使用苹方或微软雅黑等中文字体
      </div>
    </div>
  );
};

export default FontTest; 