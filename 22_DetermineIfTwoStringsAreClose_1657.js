//  ============================================
//  Determine if Two Strings Are Close
// Purpose: Check if two strings are close using frequency and character sets
//  ============================================
/*
Two strings are considered close if you can attain one from the other using the following operations:

Operation 1: Swap any two existing characters.
For example, abcde -> aecdb
Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
You can use the operations on either string as many times as necessary.

Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

Example 1:
Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.
Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"

Example 2:
Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.

Example 3:
Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.
Apply Operation 1: "cabbba" -> "caabbb"
Apply Operation 2: "caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"

Constraints:
1 <= word1.length, word2.length <= 10^5
word1 and word2 contain only lowercase English letters.
*/

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function(word1, word2) {
  // Step 1: If lengths differ, they cannot be close
  if (word1.length !== word2.length) return false;

  // Step 2: Count character frequencies for both strings
  const count1 = new Map();
  const count2 = new Map();
  for (const ch of word1) count1.set(ch, (count1.get(ch) || 0) + 1);
  for (const ch of word2) count2.set(ch, (count2.get(ch) || 0) + 1);

  // Step 3: The set of characters used must match
  const chars1 = new Set(count1.keys());
  const chars2 = new Set(count2.keys());
  if (chars1.size !== chars2.size) return false;
  for (const ch of chars1) {
    if (!chars2.has(ch)) return false;
  }

  // Step 4: Compare sorted frequency lists
  const freqs1 = Array.from(count1.values()).sort((a, b) => a - b);
  const freqs2 = Array.from(count2.values()).sort((a, b) => a - b);
  for (let i = 0; i < freqs1.length; i++) {
    if (freqs1[i] !== freqs2[i]) return false;
  }

  // Step 5: All checks passed
  return true;
};

//  ============================================
//  Test Cases
//  ============================================

console.log('Test 1: "abc" vs "bca"', closeStrings("abc", "bca")); // Expected: true
console.log('Test 2: "a" vs "aa"', closeStrings("a", "aa")); // Expected: false
console.log('Test 3: "cabbba" vs "abbccc"', closeStrings("cabbba", "abbccc")); // Expected: true

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Hash Map / Set
// 1. If lengths differ, return false
// 2. Count frequencies of each character in both strings
// 3. Ensure both strings use the same set of characters
// 4. Sort both frequency lists and compare
// 5. If all match, the strings are close
//
// Time Complexity:  O(n log k) - counting plus sorting up to 26 chars
// Space Complexity: O(k) - maps and arrays for at most 26 letters