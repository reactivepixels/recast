import { debounce } from "../debounce.js";

jest.useFakeTimers();

describe("debounce", () => {
  let func: jest.Mock<unknown, unknown[], unknown>;
  let debouncedFunc: (arg0: string) => void;
  let teardown: () => void;

  beforeEach(() => {
    func = jest.fn();
    [debouncedFunc, teardown] = debounce(func, 1000);
  });

  it("should return an array with two functions", () => {
    expect(typeof debouncedFunc).toBe("function");
    expect(typeof teardown).toBe("function");
  });

  it("should delay the execution of the original function by the specified amount of time", () => {
    debouncedFunc("arg");
    expect(func).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledWith("arg");
  });

  it("should cancel the previous execution if called again within the specified delay", () => {
    debouncedFunc("arg1");
    jest.advanceTimersByTime(500);
    debouncedFunc("arg2");
    jest.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledWith("arg2");
  });

  it("should teardown function cancels the execution of the debounced function", () => {
    debouncedFunc("arg");
    teardown();
    jest.advanceTimersByTime(1000);
    expect(func).not.toHaveBeenCalled();
  });
});
