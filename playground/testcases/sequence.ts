import { TestCase } from "../SingleTestCase";

export const SEQUENCE_DIAGRAM_TESTCASES: TestCase[] = [
  {
    type: "sequence",
    name: "实线和虚线（无箭头）",
    definition: `sequenceDiagram
  小爱->小明: 你好小明，最近怎么样？
  小明-->小爱: 很好啊！`,
  },
  {
    type: "sequence",
    name: "实线和虚线（带箭头）",
    definition: `sequenceDiagram
  小爱->>小明: 你好小明，最近怎么样？
  小明-->>小爱: 很好啊！
  小爱->>小明: 回头见！`,
  },
  {
    type: "sequence",
    name: "实线和虚线（末端带叉）",
    definition: `sequenceDiagram
  小爱-x小明: 你好小明，最近怎么样？
  小明--x小爱: 很好啊！`,
  },
  {
    type: "sequence",
    name: "实线和虚线（开放箭头）",
    definition: `sequenceDiagram
  小爱-)小明: 你好小明，最近怎么样？
  小明--)小爱: 很好啊！
  小爱-)小明: 回头见！`,
  },
  {
    type: "sequence",
    name: "角色符号",
    definition: `sequenceDiagram
  actor 小爱
  actor 小明
  小爱->>小明: 嗨，小明
  小明->>小爱: 嗨，小爱`,
  },
  {
    type: "sequence",
    name: "别名",
    definition: `sequenceDiagram
  participant A as 小爱
  participant J as 小明
  A->>J: 你好小明，最近怎么样？
  J->>A: 很好啊！`,
  },
  {
    type: "sequence",
    name: "备注",
    definition: `sequenceDiagram
  participant 小爱
  Note left of 小爱: 这是一个备注
  Note right of 小爱: 嘿，我马上就来！`,
  },
  {
    type: "sequence",
    name: "分组",
    definition: `sequenceDiagram
  box rgb(191, 223, 255) 小爱 & 小明
    participant 小爱
    participant 小明
  end
  box 另一个组
    actor 小波
    actor 小红
  end
  小爱->>小明: 你好小明，最近怎么样？
  小明->>小爱: 很好啊！
  小爱->>小波: 你好小波，小红好吗？
  小波->>小红: 你好小红，最近怎么样？`,
  },
  {
    type: "sequence",
    name: "激活状态",
    definition: `sequenceDiagram
  小爱->>+小明: 你好小明，最近怎么样？
  小爱->>+小明: 小明，听得到我说话吗？
  小明-->>-小爱: 嗨小爱，我听得到！
  小明-->>-小爱: 我感觉很棒！`,
  },
  {
    type: "sequence",
    name: "循环",
    definition: `sequenceDiagram
  小爱->小明: 嗨小明，最近怎么样？
  loop 每分钟
    小明-->小爱: 很好啊！
  end`,
  },
  {
    type: "sequence",
    name: "条件分支",
    definition: `sequenceDiagram
  小爱->>小波: 你好小波，最近怎么样？
  alt 生病了
      小波->>小爱: 不太好 :(
  else 很健康
      小波->>小爱: 感觉像雏菊一样清新
  end
  opt 额外回应
      小波->>小爱: 谢谢关心
  end`,
  },
  {
    type: "sequence",
    name: "关键区域",
    definition: `sequenceDiagram
  critical 建立数据库连接
      服务-->数据库: 连接
  option 网络超时
      服务-->服务: 记录错误
  option 凭据被拒
      服务-->服务: 记录不同错误
  end`,
  },
  {
    type: "sequence",
    name: "并行操作",
    definition: `sequenceDiagram
  par 小爱对小波
    小爱->>小波: 大家好！
  and 小爱对小明
    小爱->>小明: 大家好！
  end
  小波-->>小爱: 嗨小爱！
  小明-->>小爱: 嗨小爱！`,
  },
  {
    type: "sequence",
    name: "中断",
    definition: `sequenceDiagram
  用户-->接口: 预订某个东西
  接口-->预订服务: 开始预订流程
  break 当预订流程失败时
      接口-->用户: 显示失败信息
  end
  接口-->计费服务: 开始计费流程`,
  },
  {
    type: "sequence",
    name: "注释",
    definition: `sequenceDiagram
  小爱->>小明: 嗨小明，最近怎么样？
  %% 这是一个注释
  小明-->>小爱: 很好啊！`,
  },
  {
    type: "sequence",
    name: "背景高亮",
    definition: `sequenceDiagram
  participant 小爱
  participant 小明

  rect rgb(191, 223, 255)
  note right of 小爱: 小爱给小明打电话。
  小爱->>+小明: 你好小明，最近怎么样？
  rect rgb(200, 150, 255)
  小爱->>+小明: 小明，听得到我说话吗？
  小明-->>-小爱: 嗨小爱，我听得到！
  end
  小明-->>-小爱: 我感觉很棒！
  end
  小爱 ->>+ 小明: 今晚想去看比赛吗？
  小明 -->>- 小爱: 好啊！到时见。`,
  },
  {
    type: "sequence",
    name: "分组和背景高亮",
    definition: `sequenceDiagram
  rect rgb(191, 223, 255)
  box rgb(252, 194, 215) 小爱和小明
    participant 小爱
    actor 小明
  end
  note right of 小爱: 小爱给小明打电话。
  小爱->>+小明: 你好小明，最近怎么样？
  小明-->>-小爱: 我感觉很棒！
  end
   `,
  },
  {
    type: "sequence",
    name: "序号",
    definition: `sequenceDiagram
  autonumber
  小爱->>小明: 你好小明，最近怎么样？
  小明-->>小爱: 很好啊！
  小明->>小波: 你呢？
  小波-->>小明: 很棒！`,
  },
  {
    type: "sequence",
    name: "实体编码",
    definition: `sequenceDiagram
    小爱->>小波: 我 #9829; 你！
    小波->>小爱: 我 #9829; 你 #infin; 倍！`,
  },
  {
    type: "sequence",
    name: "角色创建和销毁",
    definition: `sequenceDiagram
    小爱->>小波: 你好小波，最近怎么样？
    小波->>小爱: 很好，谢谢。你呢？
    create participant 小强
    小爱->>小强: 嗨小强！
    create actor D as 小东
    小强->>D: 嗨！
    destroy 小强
    小爱-x小强: 我们人太多了
    destroy 小波
    小波->>小爱: 我同意`,
  },
  {
    type: "sequence",
    name: "中文时序图 - 平方萌萌哒字体测试",
    definition: `sequenceDiagram
    participant 小明 as 👨 小明
    participant 小红 as 👩 小红
    participant 系统 as 🖥️ 系统

    小明->>小红: 你好！今天天气真好呢 ☀️
    小红-->>小明: 是啊，要不要一起去公园？ 🌸
    
    rect rgb(255, 248, 220)
    Note over 小明,小红: 💭 两人商量出游计划
    小明->>+系统: 查询天气预报 🌤️
    系统-->>-小明: 今日晴朗，适合出游 ✨
    end
    
    alt 天气很好
        小明->>小红: 太好了！我们出发吧 🚗
        小红->>小明: 好的，带上野餐垫 🧺
    else 天气不好
        小明->>小红: 改天再去吧 😅
    end
    
    loop 每小时检查
        系统-->小明: 天气更新通知 📱
    end
    
    小明->>小红: 路上小心哦！ 💝
    小红-->>小明: 你也是！期待下次见面 🤗`,
  },
];
