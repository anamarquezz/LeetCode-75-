// ============================================
// Is Subsequence
// Purpose: Check if string s is a subsequence of string t
// ⭐ ============================================
/*
Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

 

Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false
 

Constraints:

0 <= s.length <= 100
0 <= t.length <= 104
s and t consist only of lowercase English letters.
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let sIndex = 0;

    for (let i = 0; i < t.length && sIndex < s.length; i++){
        if (t[i] === s[sIndex]){
            sIndex++;
        }
    }
    return sIndex === s.length;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1: abc, ahbgdc ", isSubsequence("abc", "ahbgdc")); // Expected: true
console.log("Test 2: axc, ahbgdc ", isSubsequence("axc", "ahbgdc")); // Expected: false
console.log("Test 3: '', ahbgdc ", isSubsequence("", "ahbgdc")); // Expected: true
console.log("Test 4: aec, abcde ", isSubsequence("aec", "abcde")); // Expected: false

// ============================================
//  Explanation
// ============================================
// 
// Algorithm: Two-pointer iteration approach
// 1. Initialize sIndex to 0 to track position in string s
// 2. Loop through each character in string t
// 3. If current character in t matches character at sIndex in s, increment sIndex
// 4. Continue until we've checked all characters in t or found all characters of s
// 5. Return true if sIndex equals s.length (all characters of s found)
//
// Time Complexity:  O(t.length) - we iterate through string t once
// Space Complexity: O(1) - only using a single pointer variable
//
// Example: s = "abc", t = "ahbgdc"
// i=0, t[0]='a': 'a' === s[0]='a' → sIndex=1
// i=1, t[1]='h': 'h' !== s[1]='b' → sIndex=1
// i=2, t[2]='b': 'b' === s[1]='b' → sIndex=2
// i=3, t[3]='g': 'g' !== s[2]='c' → sIndex=2
// i=4, t[4]='d': 'd' !== s[2]='c' → sIndex=2
// i=5, t[5]='c': 'c' === s[2]='c' → sIndex=3
// sIndex === s.length → return true
