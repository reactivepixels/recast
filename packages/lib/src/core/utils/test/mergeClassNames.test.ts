import { mergeClassNames } from "../mergeClassNames"

describe("mergeClassNames", () => {
  it("should combine two string values from duplicate key", () => {
    const target = { root: "hello" }
    const source = { root: "world" }
    const expectedResult = { root: "hello world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should combine two arrays from duplicate key", () => {
    const target = { root: ["hello"] }
    const source = { root: ["world"] }
    const expectedResult = { root: "hello world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should combine mixed array/string from duplicate key", () => {
    const target = { root: ["hello"] }
    const source = { root: "world" }
    const expectedResult = { root: "hello world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should combine mixed string/array from duplicate key", () => {
    const target = { root: "hello" }
    const source = { root: ["world"] }
    const expectedResult = { root: "hello world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should handle an empty target value", () => {
    const target = { root: "" }
    const source = { root: ["world"] }
    const expectedResult = { root: "world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should handle an empty source value", () => {
    const target = { root: ["hello"] }
    const source = { root: "" }
    const expectedResult = { root: "hello" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should handle an empty target and source value", () => {
    const target = { root: "" }
    const source = { root: "" }
    const expectedResult = { root: "" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should handle an `undefined` target value", () => {
    const target = undefined
    const source = { root: ["world"] }
    const expectedResult = { root: "world" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should handle an `undefined` source value", () => {
    const target = { root: ["hello"] }
    const source = undefined
    const expectedResult = { root: "hello" }

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })

  it("should handle an `undefined` target and source value", () => {
    const target = undefined
    const source = undefined
    const expectedResult = {}

    expect(mergeClassNames(target, source)).toEqual(expectedResult)
  })
})
