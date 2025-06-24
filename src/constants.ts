export const DEFAULT_FONT_SIZE = 20;

// Font families supported by Excalidraw
export const FONT_FAMILY = {
  /** 平方萌萌哒 - 自定义中文手写字体 */
  PINGFANG_MENGMENG: 1,
  /** Excalifont - handwritten font (supports Chinese characters) */
  HANDWRITTEN: 1,
  /** Nunito - normal font */
  NORMAL: 2,
  /** Comic Shanns - code font */
  CODE: 3,
} as const;

// 字体名称映射
export const FONT_FAMILY_NAMES = {
  1: 'PingFangMengMeng, Virgil, Segoe UI Emoji', // 平方萌萌哒，fallback到默认手写字体
  2: 'Nunito, Assistant',
  3: 'Comic Shanns, Cascadia Code',
} as const;

export const SVG_TO_SHAPE_MAPPER: { [key: string]: "rectangle" | "ellipse" } = {
  rect: "rectangle",
  circle: "ellipse",
};

// visit https://mermaid.js.org/schemas/config.schema.json for default schema
export const MERMAID_CONFIG = {
  startOnLoad: false,
  flowchart: { curve: "linear" },
  themeVariables: {
    // Multiplying by 1.25 to increase the font size by 25% and render correctly in Excalidraw
    fontSize: `${DEFAULT_FONT_SIZE * 1.25}px`,
  },
  maxEdges: 500,
  maxTextSize: 50000,
};
