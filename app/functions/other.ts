export const isUpper = (str: string): boolean => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}
export const includeNumber = (str: string) : boolean => /\d/.test(str)