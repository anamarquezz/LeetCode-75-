//  ============================================
//  Removing Stars From a String
// Purpose: Remove stars using a stack
//  ============================================
/*
You are given a string s, which contains stars *.

In one operation, you can:
- Choose a star in s.
- Remove the closest non-star character to its left, as well as remove the star itself.

Return the string after all stars have been removed.

Note:
The input will be generated such that the operation is always possible.
It can be shown that the resulting string will always be unique.

Example 1:
Input: s = "leet**cod*e"
Output: "lecoe"
Explanation: Performing the removals from left to right:
- The closest character to the 1st star is 't' in "leet**cod*e". s becomes "lee*cod*e".
- The closest character to the 2nd star is 'e' in "lee*cod*e". s becomes "lecod*e".
- The closest character to the 3rd star is 'd' in "lecod*e". s becomes "lecoe".
There are no more stars, so we return "lecoe".

Example 2:
Input: s = "erase*****"
Output: ""
Explanation: The entire string is removed, so we return an empty string.

Constraints:
1 <= s.length <= 10^5
s consists of lowercase English letters and stars *.
The operation above can be performed on s.
*/

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
  const stack = [];

  for (const ch of s) {
    if (ch === "*") {
      stack.pop();
    } else {
      stack.push(ch);
    }
  }

  return stack.join("");
};

//  ============================================
//  Test Cases
//  ============================================

console.log('Test 1: "leet**cod*e"', removeStars("leet**cod*e")); // Expected: "lecoe"
console.log('Test 2: "erase*****"', removeStars("erase*****")); // Expected: ""
console.log('Test 3: "a*b*c"', removeStars("a*b*c")); // Expected: ""

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Stack
// 1. Scan characters left to right
// 2. Push letters onto a stack
// 3. On '*', pop the last letter
// 4. Join the stack for the final string
//
// Time Complexity:  O(n)
// Space Complexity: O(n)