import type { TestCase } from "../SingleTestCase";

export const UNSUPPORTED_DIAGRAM_TESTCASES: TestCase[] = [
  {
    type: "unsupported",
    name: "ER图（实体关系图）",
    definition: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
    
    CUSTOMER {
        string name "客户姓名"
        string phone "电话号码"
        string email "邮箱地址"
    }
    ORDER {
        int orderNumber "订单号"
        date orderDate "下单日期"
        string status "订单状态"
    }`,
  },
  {
    type: "unsupported",
    name: "甘特图",
    definition: `gantt
    title 甘特图示例
    dateFormat  YYYY-MM-DD
    section 第一阶段
    任务一           :a1, 2014-01-01, 30d
    另一个任务       :after a1  , 20d
    section 第二阶段
    第二阶段任务     :2014-01-12  , 12d
    又一个任务       : 24d`,
  },
];
