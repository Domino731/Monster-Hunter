// check if string has an upper letter
export const isUpper = (str: string): boolean => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

// check if string has a number 
export const includeNumber = (str: string) : boolean => /\d/.test(str)