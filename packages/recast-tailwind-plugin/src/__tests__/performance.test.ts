import { describe, it, expect } from "vitest";
import * as RecastExports from "../index";

function generateLargeComponentContent(count: number): string {
  let content = "";
  for (let i = 0; i < count; i++) {
    content += `
      export const Component${i} = recast(Primitive${i}, {
        base: "bg-blue-500 text-white p-2 rounded-md",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg"
          },
          color: {
            primary: "bg-blue-500",
            secondary: "bg-green-500",
            accent: "bg-red-500"
          }
        }
      });
    `;
  }
  return content;
}

function measureExecutionTime(
  fn: () => void,
  iterations: number = 100
): number {
  const times: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }
  return times.reduce((a, b) => a + b, 0) / times.length;
}

describe.skip("Performance Tests", () => {
  it("should parse large number of components efficiently", () => {
    const largeContent = generateLargeComponentContent(1000);
    const avgTime = measureExecutionTime(() =>
      RecastExports.extractRecastComponents(largeContent)
    );
    console.log(
      `Average time to parse 1000 components: ${avgTime.toFixed(2)}ms`
    );
    expect(avgTime).toBeLessThan(20); // ms
  });

  // it("should parse complex props efficiently", () => {
  //   const complexProps =
  //     'size={{ default: "sm", md: "lg" }} color="primary" isActive={true} data={{ key1: "value1", key2: 42 }} style={{ color: "red", fontSize: 16 }}';
  //   const avgTime = measureExecutionTime(() => parseProps(complexProps));
  //   console.log(`Average time to parse complex props: ${avgTime.toFixed(2)}ms`);
  //   expect(avgTime).toBeLessThan(2); // ms
  // });
});
