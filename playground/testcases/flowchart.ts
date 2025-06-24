import { TestCase } from "../SingleTestCase";

export const FLOWCHART_DIAGRAM_TESTCASES: TestCase[] = [
  {
    name: "从上到下方向",
    definition: `flowchart TD
开始 --> 结束
`,
    type: "flowchart",
  },
  {
    name: "从左到右方向",
    definition: `flowchart LR
开始 --> 结束
`,
    type: "flowchart",
  },
  {
    name: "圆角矩形节点",
    definition: `flowchart LR
id1(这是方框中的文本)
`,
    type: "flowchart",
  },
  {
    name: "体育场形状节点",
    definition: `flowchart LR
id1([这是方框中的文本])
`,
    type: "flowchart",
  },
  {
    name: "子程序形状节点",
    definition: `flowchart LR
id1[[这是方框中的文本]]
`,
    type: "flowchart",
  },
  {
    name: "圆柱形节点",
    definition: `flowchart LR
id1[(数据库)]
`,
    type: "flowchart",
  },
  {
    name: "圆形节点",
    definition: `flowchart LR
id1((这是圆圈中的文本))
`,
    type: "flowchart",
  },
  {
    name: "不对称形状节点",
    definition: `flowchart LR
id1>这是方框中的文本]
`,
    type: "flowchart",
  },
  {
    name: "菱形节点",
    definition: `flowchart LR
id1{这是方框中的文本}
`,
    type: "flowchart",
  },
  {
    name: "六边形节点",
    definition: `flowchart LR
id1{{这是方框中的文本}}
`,
    type: "flowchart",
  },
  {
    name: "平行四边形",
    definition: `flowchart TD
id1[/这是方框中的文本/]
`,
    type: "flowchart",
  },
  {
    name: "平行四边形(备用文本)",
    definition: `flowchart TD
id1[\\这是方框中的文本\\]
`,
    type: "flowchart",
  },
  {
    name: "梯形",
    definition: `flowchart TD
A[/圣诞节\\]
`,
    type: "flowchart",
  },
  {
    name: "梯形(备用)",
    definition: `flowchart TD
B[\\去购物/]
`,
    type: "flowchart",
  },
  {
    name: "双圆圈",
    definition: `flowchart TD
id1(((这是圆圈中的文本)))
`,
    type: "flowchart",
  },
  {
    name: "带箭头的链接",
    definition: `flowchart LR
A-->B
`,
    type: "flowchart",
  },
  {
    name: "带箭头和文本的链接",
    definition: `flowchart LR
A-->|文本|B
`,
    type: "flowchart",
  },
  {
    name: "带箭头和文本的链接(另一种语法)",
    definition: `flowchart LR
A-- 文本 -->B
`,
    type: "flowchart",
  },
  {
    name: "点线链接",
    definition: `flowchart LR
A-.->B;
`,
    type: "flowchart",
  },
  {
    name: "带文本的点线链接",
    definition: `flowchart LR
A-. 文本 .-> B
`,
    type: "flowchart",
  },
  {
    name: "开放链接",
    definition: `flowchart LR
A --- B
`,
    type: "flowchart",
  },
  {
    name: "带文本的开放链接",
    definition: `flowchart LR
A-- 这是文本! ---B
`,
    type: "flowchart",
  },
  {
    name: "带文本的开放链接(另一种语法)",
    definition: `flowchart LR
A---|这是文本|B
`,
    type: "flowchart",
  },
  {
    name: "粗链接",
    definition: `flowchart LR
A ==> B
`,
    type: "flowchart",
  },
  {
    name: "带文本的粗链接",
    definition: `flowchart LR
A == 文本 ==> B
`,
    type: "flowchart",
  },
  {
    name: "链接的链式连接",
    definition: `flowchart LR
A -- 文本 --> B -- 文本2 --> C
`,
    type: "flowchart",
  },
  {
    name: "同一行中的多节点链接",
    definition: `flowchart LR
a --> b & c--> d
`,
    type: "flowchart",
  },
  {
    name: "描述依赖关系的多节点链接",
    definition: `flowchart TB
A & B--> C & D
`,
    type: "flowchart",
  },
  {
    name: "新型箭头类型",
    definition: `flowchart LR
A --o B
A --x B
`,
    type: "flowchart",
  },
  {
    name: "多方向箭头",
    definition: `flowchart LR
A o--o B
A <--> B
A x--x B
`,
    type: "flowchart",
  },
  {
    name: "子图",
    definition: `flowchart TB
c1-->a2
subgraph 第一个
a1-->a2
end
subgraph 第二个
b1-->b2
end
subgraph 第三个
c1-->c2
end
`,
    type: "flowchart",
  },
  {
    name: "子图中的子图",
    definition: `flowchart TB
c1-->a2
subgraph IDE
  subgraph aa1 [集成开发环境]
    a1-->a2
  end
  subgraph bb1 [中间件]
    b1-->b2
  end
end`,
    type: "flowchart",
  },
  {
    name: "Beta：子图方向",
    definition: `flowchart LR
  subgraph TOP
    direction TB
    subgraph B1
        direction RL
        i1 -->f1
    end
    subgraph B2
        direction BT
        i2 -->f2
    end
  end
  A --> TOP --> B
  B1 --> B2
`,
    type: "flowchart",
  },
  {
    name: "子图与子图之间的交互",
    definition: `flowchart TB
c1-->a2
subgraph 第一个
a1-->a2
end
subgraph 第二个
b1-->b2
end
subgraph 第三个
c1-->c2
end
第一个 --> 第二个
第三个 --> 第二个
第二个 --> c2
`,
    type: "flowchart",
  },
  {
    name: "样式和类",
    definition: `flowchart LR
id1(开始)-->id2(结束)
style id1 fill:#f9f,stroke:#333,stroke-width:4px
style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
`,
    type: "flowchart",
  },
  {
    name: "类",
    definition: `flowchart LR
A:::someclass --> B
classDef someclass fill:#f96;
`,
    type: "flowchart",
  },
  {
    name: "CSS类",
    definition: `flowchart LR
A-->B[AAABBB]
B-->D
class A cssClass;
`,
    type: "flowchart",
  },
  {
    name: "默认类",
    definition: `flowchart LR
A[AAA]-->B[BBB]
B-->D[DDD]
classDef default fill:#f9f,stroke:#333,stroke-width:4px;
`,
    type: "flowchart",
  },
  {
    name: "基础的fontawesome支持",
    definition: `flowchart TD
B["fa:fa-twitter 推特"]
B-->C[fa:fa-ban 禁用]
B-->D(fa:fa-spinner 加载中);
B-->E(A fa:fa-camera-retro 可能隐藏文本);
`,
    type: "flowchart",
  },
  {
    name: "图的方向",
    definition: `flowchart BT
A[我是文本] --> B{决策}
B -->|是| C[A]
B -->|否| D[B]
C --> D
`,
    type: "flowchart",
  },
  {
    name: "平方萌萌哒字体 - 中文支持 🎨",
    definition: `flowchart TD
开始([🚀 开始项目]) --> 检查{💭 需要什么？}
检查 -->|编程| 代码[👨‍💻 写代码]
检查 -->|设计| 设计[🎨 做设计]
检查 -->|测试| 测试[🧪 进行测试]

代码 --> 调试{🐛 有bug吗？}
调试 -->|是| 修复[🔧 修复问题]
调试 -->|否| 完成

设计 --> 审核{👀 设计OK吗？}
审核 -->|否| 修改[✏️ 修改设计]
审核 -->|是| 完成

测试 --> 结果{📊 测试通过？}
结果 -->|否| 修复
结果 -->|是| 完成

修复 --> 代码
修改 --> 设计
完成([🎉 项目完成])

style 开始 fill:#e1f5fe
style 完成 fill:#c8e6c9
style 检查 fill:#fff3e0
style 调试 fill:#fce4ec
style 审核 fill:#f3e5f5
style 结果 fill:#e8f5e8
`,
    type: "flowchart",
  },
];
