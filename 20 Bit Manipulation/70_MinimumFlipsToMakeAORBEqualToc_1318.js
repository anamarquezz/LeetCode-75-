// ============================================
// Minimum Flips to Make a OR b Equal to c
// Purpose: Count bit flips needed using bit manipulation
// ============================================
/*
Given 3 positive numbers a, b and c. Return the minimum flips required in some 
bits of a and b to make (a OR b == c). (bitwise OR operation).

Flip operation consists of changing any single bit 1 to 0 or changing the bit 0 to 1 
in their binary representation.

Example 1:
Input: a = 2, b = 6, c = 5
Output: 3
Explanation: After flips a = 1, b = 4, c = 5 such that (a OR b == c)

Example 2:
Input: a = 4, b = 2, c = 7
Output: 1

Example 3:
Input: a = 1, b = 2, c = 3
Output: 0

Constraints:
1 <= a <= 10^9
1 <= b <= 10^9
1 <= c <= 10^9
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function(a, b, c) {
    let flips = 0;
    
    while (a > 0 || b > 0 || c > 0) {
        // Get the last bit of each number
        const bitA = a & 1;
        const bitB = b & 1;
        const bitC = c & 1;
        
        if (bitC === 1) {
            // Need (bitA OR bitB) = 1
            // If both are 0, we need 1 flip (either a or b)
            if (bitA === 0 && bitB === 0) {
                flips += 1;
            }
        } else {
            // Need (bitA OR bitB) = 0
            // Both must be 0, so count how many are 1
            flips += bitA + bitB;
        }
        
        // Right shift to process next bit
        a >>= 1;
        b >>= 1;
        c >>= 1;
    }
    
    return flips;
};

// ============================================
// Alternative Solution (Using XOR)
// ============================================

var minFlipsAlt = function(a, b, c) {
    // (a | b) XOR c gives bits that need to change
    // But when c bit is 0 and both a,b bits are 1, we need 2 flips
    const orAB = a | b;
    const xorResult = orAB ^ c;
    
    // Count bits where both a and b are 1 but c is 0 (need extra flip)
    const extraFlips = a & b & xorResult;
    
    // Total flips = bits to change + extra flips for double 1s
    return countOnes(xorResult) + countOnes(extraFlips);
};

function countOnes(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

// ============================================
// Test Cases
// ============================================

console.log('Test 1: a=2, b=6, c=5', minFlips(2, 6, 5)); // Expected: 3
console.log('Test 2: a=4, b=2, c=7', minFlips(4, 2, 7)); // Expected: 1
console.log('Test 3: a=1, b=2, c=3', minFlips(1, 2, 3)); // Expected: 0

// ============================================
// Explanation
// ============================================
// Algorithm: Bit Manipulation
// 1. Process each bit position one at a time
// 2. For each position:
//    - If c bit is 1: Need at least one of a,b to be 1 (flip if both are 0)
//    - If c bit is 0: Need both a,b to be 0 (flip each 1 to 0)
// 3. Key insight: When c=0, if both a and b have 1, we need 2 flips
//
// Time Complexity:  O(max(log a, log b, log c)) ≈ O(30) for 10^9
// Space Complexity: O(1)