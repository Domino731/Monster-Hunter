/**
 * check if string has an upper letter
 * @param string - string that you want to check
 * @returns 
 */
export const isUpper = (string: string): boolean => {
    return !/[a-z]/.test(string) && /[A-Z]/.test(string);
}

/**
 * check if string has a number 
 * @param string - string that you want to check if he has
 */
export const includeNumber = (string: string) : boolean => /\d/.test(string);