import { generateRandomId } from "../generateRandomId.js";

describe("generateRandomId", () => {
  const allowedChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  it("should return a string", () => {
    const id = generateRandomId(10);
    expect(typeof id).toBe("string");
  });

  it("should return a string of the correct length", () => {
    const id = generateRandomId(10);
    expect(id.length).toBe(10);
  });

  it("should return a string containing only the allowed characters", () => {
    const id = generateRandomId(10);
    for (let i = 0; i < id.length; i++) {
      expect(allowedChars.includes(id[i])).toBe(true);
    }
  });
});
