// ============================================
// Decode String
// Purpose: Decode an encoded string using stack
// ? ============================================
/*
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 10^5.

Example 1:
Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Example 2:
Input: s = "3[a2[c]]"
Output: "accaccacc"

Example 3:
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"

Constraints:
1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets '[]'.
s is guaranteed to be a valid input.
All the integers in s are in the range [1, 300].
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    const stack = [];
    let currentNum = '';
    let currentStr = '';
    
    for (let char of s) {
        if (char === '[') {
            // Push current string and number to stack
            stack.push({ str: currentStr, num: Number(currentNum) });
            currentStr = '';
            currentNum = '';
        } else if (char === ']') {
            // Pop from stack and repeat the current string
            const { str, num } = stack.pop();
            currentStr = str + currentStr.repeat(num);
        } else if (char >= '0' && char <= '9') {
            // Build the number
            currentNum += char;
        } else {
            // Build the current string with letters
            currentStr += char;
        }
    }
    
    return currentStr;
};

// ============================================
// Test Cases
// ============================================

console.log(decodeString("3[a]2[bc]"));           // "aaabcbc"
console.log(decodeString("3[a2[c]]"));            // "accaccacc"
console.log(decodeString("2[abc]3[cd]ef"));       // "abcabccdcdcdef"
console.log(decodeString("a2[c3[d]e]2[efg]"));    // "acddedcddedcefgefg"



// ============================================
// Explanation
// ============================================
//
// Algorithm Steps:
// 1. Use a stack to keep track of previous strings and their repeat counts
// 2. Traverse each character in the input string:
//    - If it's a digit, accumulate the number (handles multi-digit numbers)
//    - If it's '[', push current string and number onto stack, reset counters
//    - If it's ']', pop from stack and repeat current string by the count
//    - If it's a letter, append to current string
// 3. Return the final decoded string
//
// Time Complexity: O(n) where n is the length of decoded output
// Space Complexity: O(n) for the stack
//
// Example: "3[a2[c]]"
// Step 1: char='3', currentNum="3"
// Step 2: char='[', stack=[{str:"", num:3}], currentStr="", currentNum=""
// Step 3: char='a', currentStr="a"
// Step 4: char='2', currentNum="2"
// Step 5: char='[', stack=[{str:"", num:3}, {str:"a", num:2}], currentStr="", currentNum=""
// Step 6: char='c', currentStr="c"
// Step 7: char=']', pop {str:"a", num:2}, currentStr="a" + "c".repeat(2) = "acc"
// Step 8: char=']', pop {str:"", num:3}, currentStr="" + "acc".repeat(3) = "accaccacc"
