// ============================================
// Removing Stars From a String
// Purpose: Remove characters paired with stars
// ⭐ ============================================
/*
You are given a string s, which contains stars *.

In one operation, you can:
- Choose a star in s.
- Remove the closest non-star character to its left, as well as remove the star itself.
Return the string after all stars have been removed.

Example 1:
Input: s = "leet**cod*e"
Output: "lecoe"
Explanation: Performing the removals from left to right:
- The closest character to the 1st star is 't' in "leet**cod*e". s becomes "lee*cod*e".
- The closest character to the 2nd star is 'e' in "lee*cod*e". s becomes "lecod*e".
- The closest character to the 3rd star is 'd' in "lecod*e". s becomes "lecoe".

Example 2:
Input: s = "erase*****"
Output: ""
Explanation: The entire string is removed, so we return an empty string.

Constraints:
1 <= s.length <= 105
s consists of lowercase English letters and stars *.
The operation above can be performed on s.
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
  const stack = [];

  for (const ch of s) {
    // Step 1: If we encounter a star, pop the last character from stack
    if (ch === "*") {
      stack.pop();
    } else {
      // Step 2: Otherwise, push the character onto the stack
      stack.push(ch);
    }
  }

  // Step 3: Convert stack to string and return
  return stack.join("");
};

// ============================================
// Test Cases
// ============================================

console.log('Test 1: "leet**cod*e"', removeStars("leet**cod*e")); // Expected: "lecoe"
console.log('Test 2: "erase*****"', removeStars("erase*****")); // Expected: ""
console.log('Test 3: "a*b*c"', removeStars("a*b*c")); // Expected: ""

// ============================================
// Explanation
// ============================================
// Algorithm: Stack
// 1. Use a stack to build the result string character by character
// 2. When encountering a regular character, push it to the stack
// 3. When encountering a star, pop the most recent character from the stack
// 4. This effectively removes the closest character to the left of each star
// 5. Return the remaining characters as a joined string
//
// Time Complexity:  O(n) - single pass through the string
// Space Complexity: O(n) - stack storage for remaining characters
//
// Example: s = "leet**cod*e"
// 'l': stack = ['l']
// 'e': stack = ['l', 'e']
// 'e': stack = ['l', 'e', 'e']
// 't': stack = ['l', 'e', 'e', 't']
// '*': stack = ['l', 'e', 'e'] (pop 't')
// '*': stack = ['l', 'e'] (pop 'e')
// 'c': stack = ['l', 'e', 'c']
// 'o': stack = ['l', 'e', 'c', 'o']
// 'd': stack = ['l', 'e', 'c', 'o', 'd']
// '*': stack = ['l', 'e', 'c', 'o'] (pop 'd')
// 'e': stack = ['l', 'e', 'c', 'o', 'e']
// Result: "lecoe"