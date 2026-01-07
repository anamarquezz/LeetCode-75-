

// ⭐ ============================================
// 📝 Greatest Common Divisor of Strings
// Purpose: Find the largest string that divides both input strings
// ⭐ ============================================
/*
For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t 
(i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

Example 1:
Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"

Example 2:
Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"

Example 3:
Input: str1 = "LEET", str2 = "CODE"
Output: ""

Example 4:
Input: str1 = "AAAAAB", str2 = "AAA"
Output: ""

Constraints:
1 <= str1.length, str2.length <= 1000
str1 and str2 consist of English uppercase letters.
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
    if(str1 + str2 !== str2 + str1){
        return ""
    }

    const gcd = (a, b) => {
        while(b !== 0){
            let t = b;
            b = a % b;
            a = t
        }
        return a
    }

    const length = gcd(str1.length, str2.length);
    return str1.substring(0, length);
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

console.log("Test 1:", gcdOfStrings("ABCABC", "ABC")); // Expected: "ABC"
console.log("Test 2:", gcdOfStrings("ABABAB", "ABAB")); // Expected: "AB"
console.log("Test 3:", gcdOfStrings("LEET", "CODE")); // Expected: ""
console.log("Test 4:", gcdOfStrings("AAAAAB", "AAA")); // Expected: ""

// ⭐ ============================================
//  Explanation
// ⭐ ============================================
//
// Algorithm: GCD approach with string validation
// 1. First check if str1 + str2 equals str2 + str1
//    - This determines if a common divisor even exists
//    - If they're not equal, return empty string
// 2. Find the GCD of the two string lengths using Euclidean algorithm
// 3. Return the substring of str1 from index 0 to gcdLength
//
// Time Complexity:  O(n + m) for string concatenation check
// Space Complexity: O(n + m) for the concatenated strings
//
// Example: str1 = "ABCABC", str2 = "ABC"
// Check: "ABCABCABC" === "ABCABCABC" ✓ (true)
// GCD(6, 3) = 3
// Result: str1.substring(0, 3) = "ABC" ✅