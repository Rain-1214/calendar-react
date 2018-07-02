
class ClassNameConverter {

  public static translateClassNameObj2Str (classNameObj: { [key: string]: boolean }): string {
    const keys = Object.keys(classNameObj);
    if (keys.length <= 0) {
      return '';
    }
    let result = '';
    for(const key of keys) {
      result += classNameObj[key] ? `${key} ` : '';
    }
    return result.trimRight();
  }

  private constructor() {}
}

export default ClassNameConverter;