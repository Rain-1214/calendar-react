import ClassNameConverter from "./ClassNameObj2Str";

describe('Tool ClassNameConverter Test', () => {

  it("component should converter object's key to string by object's value", () => {
    const obj = {
      "A": true,
      "B": false,
      "C": true
    };
    expect(ClassNameConverter.translateClassNameObj2Str(obj)).toBe('A C');
  })

})