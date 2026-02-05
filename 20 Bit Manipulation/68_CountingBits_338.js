// ============================================
// Counting Bits
// Purpose: Count 1's in binary representation using bit manipulation
// ============================================
/*
Given an integer n, return an array ans of length n + 1 such that for each i 
(0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Example 1:
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10

Example 2:
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101

Constraints:
0 <= n <= 10^5

Follow up:
- Can you do it in linear time O(n) and possibly in a single pass?
- Can you do it without using any built-in function?
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const ans = new Array(n + 1).fill(0);
    
    for (let i = 1; i <= n; i++) {
        // Key insight: i >> 1 removes the last bit, so ans[i >> 1] has the count
        // for all bits except the last one. (i & 1) adds 1 if last bit is 1.
        ans[i] = ans[i >> 1] + (i & 1);
    }
    
    return ans;
};

// ============================================
// Alternative Solution (Using i & (i-1))
// ============================================

var countBitsAlt = function(n) {
    const ans = new Array(n + 1).fill(0);
    
    for (let i = 1; i <= n; i++) {
        // i & (i-1) removes the rightmost 1-bit from i
        // So ans[i] = ans[i & (i-1)] + 1
        ans[i] = ans[i & (i - 1)] + 1;
    }
    
    return ans;
};

// ============================================
// Test Cases
// ============================================

console.log('Test 1: n = 2', countBits(2)); // Expected: [0,1,1]
console.log('Test 2: n = 5', countBits(5)); // Expected: [0,1,1,2,1,2]
console.log('Test 3: n = 0', countBits(0)); // Expected: [0]

// ============================================
// Explanation
// ============================================
// Algorithm: Bit Manipulation with DP
// 1. Use the relationship: popcount(i) = popcount(i >> 1) + (i & 1)
//    - i >> 1: Right shift removes the last bit
//    - i & 1: Checks if the last bit is 1
// 2. Alternative: popcount(i) = popcount(i & (i-1)) + 1
//    - i & (i-1) removes the rightmost set bit
//
// Time Complexity:  O(n)
// Space Complexity: O(n) for the output array