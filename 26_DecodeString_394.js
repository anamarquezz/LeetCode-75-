//  ============================================
//  Decode String
// Purpose: Decode nested repeats using stacks
//  ============================================
/*
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets
is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square
brackets are well-formed, etc. Furthermore, you may assume that the original data does not
contain any digits and that digits are only for those repeat numbers, k.

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

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  const countStack = [];
  const stringStack = [];
  let currentNum = 0;
  let currentStr = "";

  for (const ch of s) {
    if (ch >= "0" && ch <= "9") {
      currentNum = currentNum * 10 + Number(ch);
    } else if (ch === "[") {
      countStack.push(currentNum);
      stringStack.push(currentStr);
      currentNum = 0;
      currentStr = "";
    } else if (ch === "]") {
      const repeatCount = countStack.pop();
      const prevStr = stringStack.pop();
      currentStr = prevStr + currentStr.repeat(repeatCount);
    } else {
      currentStr += ch;
    }
  }

  return currentStr;
};

//  ============================================
//  Test Cases
//  ============================================

console.log('Test 1: "3[a]2[bc]"', decodeString("3[a]2[bc]")); // Expected: "aaabcbc"
console.log('Test 2: "3[a2[c]]"', decodeString("3[a2[c]]")); // Expected: "accaccacc"
console.log('Test 3: "2[abc]3[cd]ef"', decodeString("2[abc]3[cd]ef")); // Expected: "abcabccdcdcdef"

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Stack
// 1. Use two stacks: one for repeat counts, one for previous strings
// 2. On '[', push current state and reset current string/number
// 3. On ']', pop count and previous string, then expand
// 4. Append letters to current string otherwise
//
// Time Complexity:  O(n * k) - n chars, k total expansion length
// Space Complexity: O(n)