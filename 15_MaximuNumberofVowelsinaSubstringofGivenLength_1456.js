// ⭐ ============================================
// 📝 Maximum Number of Vowels in a Substring of Given Length
// Purpose: Find the maximum number of vowels in any substring of length k
// ⭐ ============================================
/*
Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

Example 1:
Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.

Example 2:
Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.

Example 3:
Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.

Constraints:
1 <= s.length <= 10^5
s consists of lowercase English letters.
1 <= k <= s.length
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    const VOWEL = { a: 1, e: 1, i: 1, o: 1, u: 1 };
    
    let current = 0;
    
    // First window
    for (let i = 0; i < k; i++) {
        current += VOWEL[s[i]] || 0;
    }
    
    let max = current;
    if (max === k) return max;
    
    // Slide window
    for (let i = k; i < s.length; i++) {
        current += (VOWEL[s[i]] || 0) - (VOWEL[s[i - k]] || 0);
        if (current > max) {
            max = current;
            if (max === k) return max;
        }
    }
    
    return max;
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

console.log("Test 1: 'abciiidef', k=3", maxVowels("abciiidef", 3)); // Expected: 3
console.log("Test 2: 'aeiou', k=2", maxVowels("aeiou", 2)); // Expected: 2
console.log("Test 3: 'leetcode', k=3", maxVowels("leetcode", 3)); // Expected: 2
console.log("Test 4: 'bcdfg', k=2", maxVowels("bcdfg", 2)); // Expected: 0

// ⭐ ============================================
//  Explanation
// ⭐ ============================================
// 
// Algorithm: Sliding Window with Hash Map
// 1. Create a hash map of vowels for O(1) lookup
// 2. Count vowels in the first window of length k
// 3. Set max to this initial count
// 4. Slide the window one character at a time:
//    - Add the new character on the right (increment if vowel)
//    - Remove the character that left on the left (decrement if vowel)
// 5. Update max whenever current count exceeds it
// 6. Early exit optimization: if max equals k, all characters in window are vowels
//
// Time Complexity:  O(n) - single pass through the string
// Space Complexity: O(1) - hash map stores only 5 vowels
//
// Example: s = "abciiidef", k = 3
// Window "abc": vowels = 1
// Window "bci": vowels = 1
// Window "cii": vowels = 2
// Window "iii": vowels = 3 ✅ (maximum)
// Window "iid": vowels = 2
// Window "ide": vowels = 1
// Window "def": vowels = 1
// Maximum vowels in any substring of length 3 is 3
 
