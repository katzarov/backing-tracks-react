import { formatFromMilliSeconds } from "@src/utils/utils";

describe("Utils/formatFromMilliSeconds", () => {
  it("should format milliseconds into mm:ss format", () => {
    const expectedResult = "00:01";
    const result = formatFromMilliSeconds(1000);
    expect(result).toMatch(expectedResult);
  });

  describe("should format milliseconds into mm:ss format (table test)", () => {
    it.each`
      milliseconds | mmssformat | testumber
      ${999}       | ${"00:00"} | ${1}
      ${1000}      | ${"00:01"} | ${2}
      ${48862}     | ${"00:48"} | ${3}
      ${59999}     | ${"00:59"} | ${4}
      ${60000}     | ${"01:00"} | ${5}
      ${61000}     | ${"01:01"} | ${6}
      ${6000000}   | ${"00:00"} | ${7}
    `(
      "#$testumber formats $milliseconds into $mmssformat",
      ({ milliseconds, mmssformat }) => {
        expect(formatFromMilliSeconds(milliseconds)).toStrictEqual(mmssformat);
      }
    );
  });
});
