// ⭐ ============================================
// 📝 Merge Strings Alternately
// Purpose: Merge two strings in alternating order
// ⭐ ============================================
/*
You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.

 

Example 1:

Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r
Example 2:

Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.
word1:  a   b 
word2:    p   q   r   s
merged: a p b q   r   s
Example 3:

Input: word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: Notice that as word1 is longer, "cd" is appended to the end.
word1:  a   b   c   d
word2:    p   q 
merged: a p b q c   d
 

Constraints:

1 <= word1.length, word2.length <= 100
word1 and word2 consist of lowercase English letters.
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

var mergeAlternately = function(word1, word2) {
    let combinedWords = "";
    const maxLength = Math.max(word1.length, word2.length);

    for( let i = 0; i < maxLength; i++){
        if( i < word1.length)
            combinedWords += word1[i];

        if( i< word2.length)
            combinedWords += word2[i];
    }
    return combinedWords;            
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

console.log("Test 1:", mergeAlternately("abc", "pqr")); // Expected: "apbqcr"
console.log("Test 2:", mergeAlternately("ab", "pqrs")); // Expected: "apbqrs"
console.log("Test 3:", mergeAlternately("abcd", "pq")); // Expected: "apbqcd"


// ⭐ ============================================
//  Explanation
// ⭐ ============================================
// 
// Algorithm: Two-pointer iteration approach
// 1. Find the maximum length between word1 and word2
// 2. Loop through each index up to maxLength
// 3. At each iteration, add character from word1 (if available)
// 4. Then add character from word2 (if available)
// 5. This naturally merges strings alternately and handles different lengths
//
// Time Complexity:  O(n + m) where n = word1.length, m = word2.length
// Space Complexity: O(n + m) for the output string
//
// Example: word1 = "abc", word2 = "pqr"
// i=0: combinedWords = "a" + "p" = "ap"
// i=1: combinedWords = "ap" + "b" + "q" = "apbq"
// i=2: combinedWords = "apbq" + "c" + "r" = "apbqcr" ✅
