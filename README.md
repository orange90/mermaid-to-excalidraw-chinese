# mermaid-to-excalidraw

Convert mermaid diagrams to excalidraw

## Set up

Install packages:

```
yarn
```

Start development playground:

```
yarn start
```

Build command:

```
yarn build
```

## Get started

```ts
parseMermaidToExcalidraw(
  diagramDefinition: string, 
  config?: MermaidConfig,
  excalidrawConfig?: ExcalidrawConfig
)
```

The `diagramDefinition` is the mermaid diagram definition.
`config` is the mermaid config. You can use the `config` param when you want to pass some custom config to mermaid.
`excalidrawConfig` is the excalidraw configuration where you can specify font options including Chinese handwriting font support.

Currently `mermaid-to-excalidraw` only supports the :point_down: config params

```ts
{
  /**
   * Whether to start the diagram automatically when the page loads.
   * @default false
   */
  startOnLoad?: boolean;
  /**
   * The flowchart curve style.
   * @default "linear"
   */
  flowchart?: {
    curve?: "linear" | "basis";
  };
  /**
   * Theme variables
   * @default { fontSize: "20px" }
   */
  themeVariables?: {
    fontSize?: string;
  };
  /**
   * Maximum number of edges to be rendered.
   * @default 500
   */
  maxEdges?: number;
  /**
   * Maximum number of characters to be rendered.
   * @default 50000
   */
  maxTextSize?: number;
}
```

**ExcalidrawConfig options:**

```ts
{
  /**
   * Font size for text elements
   * @default 20
   */
  fontSize?: number;
  /**
   * Font family for text elements
   * @default 1 (Excalifont - handwritten with Chinese support)
   * 1: Excalifont (handwritten, supports Chinese characters)
   * 2: Nunito (normal)
   * 3: Comic Shanns (code)
   */
  fontFamily?: 1 | 2 | 3;
}
```

Example code:

```ts
import { parseMermaidToExcalidraw, FONT_FAMILY } from "@excalidraw/mermaid-to-excalidraw";

try {
  const { elements, files } = await parseMermaidToExcalidraw(
    diagramDefinition,
    {
      themeVariables: {
        fontSize: "25px",
      },
    },
    {
      fontFamily: FONT_FAMILY.HANDWRITTEN, // Use Chinese handwriting font
    }
  );
  // Render elements and files on Excalidraw
} catch (e) {
  // Parse error, displaying error message to users
}
```

## Playground

Try out [here](https://mermaid-to-excalidraw.vercel.app).

## API

Head over to the [docs](https://docs.excalidraw.com/docs/@excalidraw/mermaid-to-excalidraw/api).

## Support new Diagram type

Head over to the [docs](https://docs.excalidraw.com/docs/@excalidraw/mermaid-to-excalidraw/codebase/new-diagram-type).
