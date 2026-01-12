// ⭐ ============================================
// 📝 String Compression
// Purpose: Compress array of characters in-place
// ⭐ ============================================
/*
Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

Note: The characters in the array beyond the returned length do not matter and should be ignored.

 

Example 1:

Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
Example 2:

Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.
Example 3:

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
 

Constraints:

1 <= chars.length <= 2000
chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let write = 0;
    let i = 0;

    while (i < chars.length) {
        let start = i;
        while (i < chars.length && chars[i] === chars[start])
            i++;
        chars[write++] = chars[start];

        const count = i - start;
        if (count > 1) {
            const countStr = count.toString();
            for (let digit of countStr) {
                chars[write++] = digit;
            }
        }
    
    }
    return write;
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

let test1 = ["a","a","b","b","c","c","c"];
let result1 = compress(test1);
console.log("Test 1:");
console.log("Input:    ", ["a","a","b","b","c","c","c"]);
console.log("Output:   ", test1.slice(0, result1));
console.log("Expected: ", ["a","2","b","2","c","3"]);

let test2 = ["a"];
let result2 = compress(test2);
console.log("\nTest 2:");
console.log("Input:    ", ["a"]);
console.log("Output:   ", test2.slice(0, result2));
console.log("Expected: ", ["a"]);

let test3 = ["a","b","b","b","b","b","b","b","b","b","b","b","b"];
let result3 = compress(test3);
console.log("\nTest 3:");
console.log("Input:    ", ["a","b","b","b","b","b","b","b","b","b","b","b","b"]);
console.log("Output:   ", test3.slice(0, result3));
console.log("Expected: ", ["a","b","1","2"]);

// ⭐ ============================================
//  Explanation
// ⭐ ============================================
//
// Algorithm: Two-pointer approach with character grouping
// 1. Use 'write' pointer to track where to write compressed characters
// 2. Use 'i' pointer to iterate through array
// 3. For each group of consecutive same characters:
//    - Store the character at write position
//    - Calculate count (i - start)
//    - If count > 1, convert to string and write each digit
// 4. Return the new compressed length
//
// Time Complexity:  O(n) where n = chars.length (single pass through array)
// Space Complexity: O(1) constant extra space (only two pointers used)
//
// Example: chars = ["a","a","b","b","c","c","c"]
// i=0, start=0: skip "aa" -> write="a" at index 0, count=2, write "2" at index 1
// i=2, start=2: skip "bb" -> write="b" at index 2, count=2, write "2" at index 3
// i=4, start=4: skip "ccc" -> write="c" at index 4, count=3, write "3" at index 5
// Result: ["a","2","b","2","c","3"], return 6 ✅