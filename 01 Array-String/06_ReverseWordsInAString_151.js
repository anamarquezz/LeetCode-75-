// ============================================
// Reverse Words in a String
// Purpose: Reverse the order of words in a string
// ⭐ ============================================
/*
Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

 

Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"

Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.

Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

 

Constraints:

1 <= s.length <= 104
s contains English letters (upper-case and lower-case), digits, and spaces ' '.
There is at least one word in s.
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", reverseWords("the sky is blue")); // Expected: "blue is sky the"
console.log("Test 2:", reverseWords("  hello world  ")); // Expected: "world hello"
console.log("Test 3:", reverseWords("a good   example")); // Expected: "example good a"

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Trim, Split, Reverse, Join approach
// 1. Trim leading and trailing spaces with trim()
// 2. Split the string using regex /\s+/ to handle multiple spaces between words
//    - \s+ matches one or more whitespace characters
//    - This ensures no empty strings in the result
// 3. Reverse the array of words using reverse()
// 4. Join the reversed array back into a string with single spaces
//
// Time Complexity:  O(n) where n = s.length
// Space Complexity: O(n) for the words array
//
// Example: s = "the sky is blue"
// Step 1: trim() -> "the sky is blue"
// Step 2: split(/\s+/) -> ["the", "sky", "is", "blue"]
// Step 3: reverse() -> ["blue", "is", "sky", "the"]
// Step 4: join(' ') -> "blue is sky the"