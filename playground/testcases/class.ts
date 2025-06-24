import type { TestCase } from "../SingleTestCase";

export const CLASS_DIAGRAM_TESTCASES: TestCase[] = [
  {
    type: "class",
    name: "类",
    definition: `classDiagram
  class 动物
    `,
  },
  {
    type: "class",
    name: "类与关系",
    definition: `classDiagram
  class 动物
  交通工具 <|-- 汽车`,
  },
  {
    type: "class",
    name: "带标签的类",
    definition: `classDiagram
  class 动物["带标签的动物"]
  class 汽车["带有*!符号的汽车"]
  动物 --> 汽车`,
  },
  {
    type: "class",
    name: "带成员的类",
    definition: `classDiagram
  class 银行账户
  银行账户 : +String 所有者
  银行账户 : +Bigdecimal 余额
  银行账户 : +存款(金额)
  银行账户 : +取款(金额)`,
  },
  {
    type: "class",
    name: "使用花括号的类成员",
    definition: `classDiagram
  class 银行账户{
    +String 所有者
    +BigDecimal 余额
    +存款(金额)
    +取款(金额)
  }`,
  },
  {
    type: "class",
    name: "带成员和返回类型的类",
    definition: `classDiagram
  class 银行账户{
    +String 所有者
    +BigDecimal 余额
    +存款(金额) bool
    +取款(金额) int
  }`,
  },
  {
    type: "class",
    name: "泛型类型的类",
    definition: `classDiagram
  class 正方形~形状~{
    int id
    List~int~ 位置
    设置点(List~int~ 点集)
    获取点() List~int~
  }
  
  正方形 : -List~string~ 消息
  正方形 : +设置消息(List~string~ 消息)
  正方形 : +获取消息() List~string~
  正方形 : +获取距离矩阵() List~List~int~~`,
  },
  {
    type: "class",
    name: "多个带成员的类",
    definition: `classDiagram
  class 鸭子
  鸭子 : +String 喙颜色
  鸭子 : +游泳()
  class 鱼
  鱼 : -int 英尺大小
  鱼 : +能吃()
  class 斑马
  斑马 : +bool 是否野生
  斑马 : +跑()
  `,
  },
  {
    type: "class",
    name: "类关系 [1]",
    definition: `classDiagram
  类A <|-- 类B
  类C *-- 类D
  类E o-- 类F
  类G <-- 类H
  `,
  },
  {
    type: "class",
    name: "类关系 [2]",
    definition: `classDiagram
  类I -- 类J
  类K <.. 类L
  类M <|.. 类N
  类O .. 类P`,
  },
  {
    type: "class",
    name: "双向类关系",
    definition: `classDiagram
  动物 <|--|> 斑马
  鸟 o..\* 孔雀`,
  },
  {
    type: "class",
    name: "带方向的双向类关系",
    definition: `classDiagram
    direction RL
    类A <|--|> 类B
    类C *--* 类D
    类E o--o 类F
    类G <--> 类H`,
  },
  {
    type: "class",
    name: "带命名空间的类",
    definition: `classDiagram
  namespace 基础形状 {
    class 三角形
    class 矩形 {
      double 宽度
      double 高度
    }
  }`,
  },
  {
    type: "class",
    name: "关系的基数/多重性",
    definition: `classDiagram
  客户 "1" --> "*" 票据
  学生 "1" --> "1..*" 课程
  银河系 --> "many" 恒星 : 包含`,
  },
  {
    type: "class",
    name: "类的注解",
    definition: `classDiagram
  class 形状{
    <<interface>>
    顶点数
    绘制()
  }
  class 颜色{
    <<enumeration>>
    红色
    蓝色
    绿色
    白色
    黑色
  }`,
  },
  {
    type: "class",
    name: "注释",
    definition: `classDiagram
  %% 这整行是注释 classDiagram class 形状 <&lt;interface&gt;>
  class 形状{
    <<interface>>
    顶点数
    绘制()
  }`,
  },
  {
    type: "class",
    name: "设置图的方向 -> 从左到右",
    definition: `classDiagram
  direction LR
  class 学生 {
    -身份证 : 身份证
  }
  class 身份证{
    -id : int
    -姓名 : string
  }
  class 自行车{
    -id : int
    -名称 : string
  }
  学生 "1" --o "1" 身份证 : 携带
  学生 "1" --o "1" 自行车 : 骑行`,
  },
  {
    type: "class",
    name: "设置图的方向 -> 从右到左",
    definition: `classDiagram
  direction RL
  class 学生 {
    -身份证 : 身份证
  }
  class 身份证{
    -id : int
    -姓名 : string
  }
  class 自行车{
    -id : int
    -名称 : string
  }
  学生 "1" --o "1" 身份证 : 携带
  学生 "1" --o "1" 自行车 : 骑行`,
  },
  {
    type: "class",
    name: "设置图的方向 -> 从上到下",
    definition: `classDiagram
  direction TB
  class 学生 {
    -身份证 : 身份证
  }
  class 身份证{
    -id : int
    -姓名 : string
  }
  class 自行车{
    -id : int
    -名称 : string
  }
  学生 "1" --o "1" 身份证 : 携带
  学生 "1" --o "1" 自行车 : 骑行`,
  },
  {
    type: "class",
    name: "设置图的方向 -> 从下到上",
    definition: `classDiagram
  direction BT
  class 学生 {
    -身份证 : 身份证
  }
  class 身份证{
    -id : int
    -姓名 : string
  }
  class 自行车{
    -id : int
    -名称 : string
  }
  学生 "1" --o "1" 身份证 : 携带
  学生 "1" --o "1" 自行车 : 骑行`,
  },
  {
    type: "class",
    name: "平方萌萌哒字体 - 中文类图测试 🎨",
    definition: `classDiagram
  direction TB
  
  class 动物 {
    <<abstract>>
    +名字: String
    +年龄: int
    +吃(食物: String): void
    +睡觉(): void
  }
  
  class 哺乳动物 {
    +毛发颜色: String
    +喂奶(): void
  }
  
  class 鸟类 {
    +翅膀跨度: double
    +飞行(): boolean
  }
  
  class 猫咪 {
    +品种: String
    +喵喵叫(): void
    +抓挠(): void
  }
  
  class 狗狗 {
    +品种: String
    +汪汪叫(): void
    +摇尾巴(): void
  }
  
  class 企鹅 {
    +游泳速度: int
    +滑行(): void
  }
  
  class 主人 {
    +姓名: String
    +电话: String
    +喂食(宠物: 动物): void
    +抚摸(宠物: 动物): void
  }
  
  动物 <|-- 哺乳动物
  动物 <|-- 鸟类
  哺乳动物 <|-- 猫咪
  哺乳动物 <|-- 狗狗
  鸟类 <|-- 企鹅
  
  主人 "1" --> "*" 猫咪 : 养育
  主人 "1" --> "*" 狗狗 : 养育
  主人 "1" --> "*" 企鹅 : 观赏`,
  },
];
