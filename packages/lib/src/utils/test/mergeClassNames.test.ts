import { mergeClassNames } from "../mergeClassNames"

describe("mergeClassNames tests", () => {
  it("should combine two string values from duplicate key", () => {
    const target = { root: "hello" }
    const source = { root: "world" }
    const expectedResult = { root: "hello world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should combine two arrays from duplicate key", () => {
    const target = { root: ["hello"] }
    const source = { root: ["world"] }
    const expectedResult = { root: ["hello", "world"] }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should combine mixed array/string from duplicate key", () => {
    const target = { root: ["hello"] }
    const source = { root: "world" }
    const expectedResult = { root: ["hello", "world"] }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should combine mixed string/array from duplicate key", () => {
    const target = { root: "hello" }
    const source = { root: ["world"] }
    const expectedResult = { root: "hello world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })
})
