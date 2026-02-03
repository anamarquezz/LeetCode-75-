/**
 * 17. Letter Combinations of a Phone Number
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * 
 * Given a string containing digits from 2-9 inclusive, return all possible 
 * letter combinations that the number could represent. Return the answer in any order.
 * 
 * A mapping of digits to letters (just like on the telephone buttons):
 * 2 -> "abc", 3 -> "def", 4 -> "ghi", 5 -> "jkl"
 * 6 -> "mno", 7 -> "pqrs", 8 -> "tuv", 9 -> "wxyz"
 * 
 * Note: 1 does not map to any letters.
 * 
 * @example
 * Input: digits = "23"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * @example
 * Input: digits = "2"
 * Output: ["a","b","c"]
 * 
 * Constraints:
 * - 0 <= digits.length <= 4
 * - digits[i] is a digit in the range ['2', '9']
 */

/**
 * Backtracking Approach
 * 
 * Build combinations character by character. For each digit, try all possible
 * letters and recursively build the rest of the combination.
 * 
 * Time Complexity: O(4^n * n) - At most 4 letters per digit, n digits, n to build string
 * Space Complexity: O(n) - Recursion depth equals number of digits
 * 
 * @param {string} digits - String of digits from 2-9
 * @return {string[]} - All possible letter combinations
 */
var letterCombinations = function(digits) {
    if (!digits || digits.length === 0) return [];
    
    // Phone digit to letters mapping
    const phoneMap = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };
    
    const result = [];
    
    /**
     * Backtrack to build combinations
     * @param {number} index - Current digit index
     * @param {string} current - Current combination being built
     */
    const backtrack = (index, current) => {
        // Base case: combination is complete
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        // Get letters for current digit
        const letters = phoneMap[digits[index]];
        
        // Try each letter
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    };
    
    backtrack(0, '');
    return result;
};