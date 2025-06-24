import { Fragment } from "react";

import { FLOWCHART_DIAGRAM_TESTCASES } from "./testcases/flowchart";
import { SEQUENCE_DIAGRAM_TESTCASES } from "./testcases/sequence.ts";
import { CLASS_DIAGRAM_TESTCASES } from "./testcases/class.ts";
import { UNSUPPORTED_DIAGRAM_TESTCASES } from "./testcases/unsupported.ts";

import SingleTestCase, { TestCase } from "./SingleTestCase.tsx";
import type { ActiveTestCaseIndex, MermaidData } from "./index.tsx";

interface TestcasesProps {
  onChange: (
    definition: MermaidData["definition"],
    activeTestCaseIndex: number | "custom" | null
  ) => void;
  activeTestCaseIndex: ActiveTestCaseIndex;
}

const Testcases = ({ onChange }: TestcasesProps) => {
  const testcaseTypes: { name: string; displayName: string; testcases: TestCase[] }[] = [
    { name: "Flowchart", displayName: "流程图", testcases: FLOWCHART_DIAGRAM_TESTCASES },
    { name: "Sequence", displayName: "时序图", testcases: SEQUENCE_DIAGRAM_TESTCASES },
    { name: "Class", displayName: "类图", testcases: CLASS_DIAGRAM_TESTCASES },
    { name: "Unsupported", displayName: "不支持的图表", testcases: UNSUPPORTED_DIAGRAM_TESTCASES },
  ];

  const allTestCases = testcaseTypes.flatMap((type) => type.testcases);

  let testCaseIndex = 0;
  return (
    <div>
      {testcaseTypes.map(({ name, displayName, testcases }) => {
        const baseId = name.toLowerCase();
        return (
          <Fragment key={baseId}>
            <h2>
              {displayName} {"示例 🎨"}
            </h2>
            <details>
              <summary>
                {displayName} {"测试用例"}
              </summary>
              <div id={`${baseId}-container`} className="testcase-container">
                {testcases.map((testcase, index) => {
                  return (
                    <SingleTestCase
                      key={`${testcase.type}-${index}`}
                      index={testCaseIndex++}
                      onChange={(index) => {
                        const { definition } = allTestCases[index];
                        onChange(definition, index);
                      }}
                      testcase={testcase}
                    />
                  );
                })}
              </div>
            </details>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Testcases;
