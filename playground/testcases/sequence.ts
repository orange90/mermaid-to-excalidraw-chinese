import { TestCase } from "../SingleTestCase";

export const SEQUENCE_DIAGRAM_TESTCASES: TestCase[] = [
  {
    type: "sequence",
    name: "Solid and dotted line without arrow",
    definition: `sequenceDiagram
  Alice->John: Hello John, how are you?
  John-->Alice: Great!`,
  },
  {
    type: "sequence",
    name: "Solid and dotted line with arrow head",
    definition: `sequenceDiagram
  Alice->>John: Hello John, how are you?
  John-->>Alice: Great!
  Alice->>John: See you later!`,
  },
  {
    type: "sequence",
    name: "Solid and Dotted line with cross at end",
    definition: `sequenceDiagram
  Alice-xJohn: Hello John, how are you?
  John--xAlice: Great!`,
  },
  {
    type: "sequence",
    name: "Solid and dotted line with open arrow at end",
    definition: `sequenceDiagram
  Alice-)John: Hello John, how are you?
  John--)Alice: Great!
  Alice-)John: See you later!`,
  },
  {
    type: "sequence",
    name: "Actor symbols",
    definition: `sequenceDiagram
  actor Alice
  actor Bob
  Alice->>Bob: Hi Bob
  Bob->>Alice: Hi Alice`,
  },
  {
    type: "sequence",
    name: "Aliases",
    definition: `sequenceDiagram
  participant A as Alice
  participant J as John
  A->>J: Hello John, how are you?
  J->>A: Great!`,
  },
  {
    type: "sequence",
    name: "Notes",
    definition: `sequenceDiagram
  participant Alice
  Note left of Alice: This is a note
  Note right of Alice: Hey I am coming soon!`,
  },
  {
    type: "sequence",
    name: "Grouping",
    definition: `sequenceDiagram
  box rgb(191, 223, 255) Alice & John
    participant Alice
    participant John
  end
  box Another Group
    actor Bob
    actor June
  end
  Alice->>John: Hello John, how are you?
  John->>Alice: Great!
  Alice->>Bob: Hello Bob, how is June?
  Bob->>June: Hello June, how are you?`,
  },
  {
    type: "sequence",
    name: "Activations",
    definition: `sequenceDiagram
  Alice->>+John: Hello John, how are you?
  Alice->>+John: John, can you hear me?
  John-->>-Alice: Hi Alice, I can hear you!
  John-->>-Alice: I feel great!`,
  },
  {
    type: "sequence",
    name: "Loops",
    definition: `sequenceDiagram
  Alice->John: Hi John, how are you?
  loop Every minute
    John-->Alice: Great!
  end`,
  },
  {
    type: "sequence",
    name: "Alternate Paths",
    definition: `sequenceDiagram
  Alice->>Bob: Hello Bob, how are you?
  alt is sick
      Bob->>Alice: Not so good :(
  else is well
      Bob->>Alice: Feeling fresh like a daisy
  end
  opt Extra response
      Bob->>Alice: Thanks for asking
  end`,
  },
  {
    type: "sequence",
    name: "Critical Regions",
    definition: `sequenceDiagram
  critical Establish a connection to the DB
      Service-->DB: connect
  option Network timeout
      Service-->Service: Log error
  option Credentials rejected
      Service-->Service: Log different error
  end`,
  },
  {
    type: "sequence",
    name: "Parallel Actions",
    definition: `sequenceDiagram
  par Alice to Bob
    Alice->>Bob: Hello Folks!
  and Alice to John
    Alice->>John: Hello Folks!
  end
  Bob-->>Alice: Hi Alice!
  John-->>Alice: Hi Alice!`,
  },
  {
    type: "sequence",
    name: "Break",
    definition: `sequenceDiagram
  Consumer-->API: Book something
  API-->BookingService: Start booking process
  break when the booking process fails
      API-->Consumer: show failure
  end
  API-->BillingService: Start billing process`,
  },
  {
    type: "sequence",
    name: "Comments",
    definition: `sequenceDiagram
  Alice->>John: Hi John, whats up?
  %% this is a comment
  John-->>Alice: Great!`,
  },
  {
    type: "sequence",
    name: "Background Hightlights",
    definition: `sequenceDiagram
  participant Alice
  participant John

  rect rgb(191, 223, 255)
  note right of Alice: Alice calls John.
  Alice->>+John: Hello John, how are you?
  rect rgb(200, 150, 255)
  Alice->>+John: John, can you hear me?
  John-->>-Alice: Hi Alice, I can hear you!
  end
  John-->>-Alice: I feel great!
  end
  Alice ->>+ John: Did you want to go to the game tonight?
  John -->>- Alice: Yeah! See you there.`,
  },
  {
    type: "sequence",
    name: "Grouping with Background Highlights",
    definition: `sequenceDiagram
  rect rgb(191, 223, 255)
  box rgb(252, 194, 215) Alice and John
    participant Alice
    actor John
  end
  note right of Alice: Alice calls John.
  Alice->>+John: Hello John, how are you?
  John-->>-Alice: I feel great!
  end
   `,
  },
  {
    type: "sequence",
    name: "Sequence Numbers",
    definition: `sequenceDiagram
  autonumber
  Alice->>John: Hello John, how are you?
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!`,
  },
  {
    type: "sequence",
    name: "Entity codes",
    definition: `sequenceDiagram
    Alice->>Bob: I #9829; you!
    Bob->>Alice: I #9829; you #infin; times more!`,
  },
  {
    type: "sequence",
    name: "Actor creation and destruction",
    definition: `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you ?
    Bob->>Alice: Fine, thank you. And you?
    create participant Carl
    Alice->>Carl: Hi Carl!
    create actor D as Donald
    Carl->>D: Hi!
    destroy Carl
    Alice-xCarl: We are too many
    destroy Bob
    Bob->>Alice: I agree`,
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
