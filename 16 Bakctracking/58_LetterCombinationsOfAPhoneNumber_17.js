// ============================================
// Letter Combinations of a Phone Number
// Purpose: Generate all possible letter combos
// ⭐ ============================================
/*
Given a string containing digits from 2-9, return all possible letter combinations
that the number could represent.

Digit mapping:
2 -> "abc", 3 -> "def", 4 -> "ghi", 5 -> "jkl"
6 -> "mno", 7 -> "pqrs", 8 -> "tuv", 9 -> "wxyz"

Example 1:
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2:
Input: digits = "2"
Output: ["a","b","c"]

Constraints:
0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9']
*/

// ============================================
// Solution Function
// ============================================

var letterCombinations = function(digits) {
    if (!digits || digits.length === 0) return [];

    const phoneMap = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };

    const result = [];

    const backtrack = (index, current) => {
        if (index === digits.length) {
            result.push(current);
            return;
        }

        const letters = phoneMap[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    };

    backtrack(0, "");
    return result;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", letterCombinations("23")); // Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log("Test 2:", letterCombinations("2"));  // Expected: ["a","b","c"]
console.log("Test 3:", letterCombinations(""));   // Expected: []

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Backtracking
// 1. For each digit, try all mapped letters.
// 2. Append one letter and recurse to the next digit.
// 3. When all digits are used, push the built string.
//
// Time Complexity:  O(4^n * n)
// Space Complexity: O(n)