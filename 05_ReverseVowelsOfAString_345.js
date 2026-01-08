// ⭐ ============================================
// 📝 Reverse Vowels of a String
// Purpose: Reverse only the vowels in a string
// ⭐ ============================================
/*
Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

 

Example 1:

Input: s = "IceCreAm"
Output: "AceCreIm"
Explanation: The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

Example 2:

Input: s = "leetcode"
Output: "leotcede"

 

Constraints:

1 <= s.length <= 3 * 105
s consist of printable ASCII characters.
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    const chars = s.split('');
    
    let left = 0, right = chars.length - 1;
    
    while (left < right) {
        // Find vowel from left
        while (left < right && !vowels.has(chars[left])) left++;
        
        // Find vowel from right
        while (left < right && !vowels.has(chars[right])) right--;
        
        // Swap them
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    return chars.join('');
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

console.log("Test 1: IceCreAm :: ", reverseVowels("IceCreAm")); // Expected: "AceCreIm"
console.log("Test 2: leetcode :: ", reverseVowels("leetcode")); // Expected: "leotcede"
console.log("Test 3: race :: ", reverseVowels("race")); // Expected: "race"

// ⭐ ============================================
//  Explanation
// ⭐ ============================================
//
// Algorithm: Two-pointer approach with Set
// 1. Create a Set of vowels (both uppercase and lowercase)
// 2. Convert string to character array for easy swapping
// 3. Initialize left pointer at start and right pointer at end
// 4. Find vowel from left side (skip consonants)
// 5. Find vowel from right side (skip consonants)
// 6. Swap the two vowels
// 7. Move pointers inward and repeat until left >= right
// 8. Join the character array back into a string
//
// Time Complexity:  O(n) where n = s.length (single pass with two pointers)
// Space Complexity: O(n) for the character array
//
// Example: s = "IceCreAm"
// Initial: left=0('I'), right=7('m')
// Find vowel from left: 'I' is vowel
// Find vowel from right: 'm' is not, 'A' is vowel at right=4
// Swap: "AceCreIm"
// Continue until pointers meet
// Result: "AceCreIm" ✅
