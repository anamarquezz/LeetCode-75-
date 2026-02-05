// ============================================
// N-th Tribonacci Number
// Purpose: Compute the n-th Tribonacci value
// ⭐ ============================================
/*
The Tribonacci sequence Tn is defined as:
T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given n, return the value of Tn.

Example 1:
Input: n = 4
Output: 4
Explanation:
T3 = 0 + 1 + 1 = 2
T4 = 1 + 1 + 2 = 4

Example 2:
Input: n = 25
Output: 1389537

Constraints:
0 <= n <= 37
The answer fits within a 32-bit integer.
*/

// ============================================
// Solution Function
// ============================================

var tribonacci = function(n) {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;

    let t0 = 0;
    let t1 = 1;
    let t2 = 1;

    for (let i = 3; i <= n; i++) {
        const t3 = t0 + t1 + t2;
        t0 = t1;
        t1 = t2;
        t2 = t3;
    }

    return t2;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", tribonacci(4));  // Expected: 4
console.log("Test 2:", tribonacci(25)); // Expected: 1389537
console.log("Test 3:", tribonacci(0));  // Expected: 0

// ============================================
//  Explanation
// ============================================
//
// Algorithm: DP with rolling values
// 1. Handle base cases for n = 0, 1, 2.
// 2. Track the last three values (t0, t1, t2).
// 3. Iteratively compute the next value as t0 + t1 + t2.
// 4. Shift the window and continue until n.
//
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// Example: n = 4
// i=3: t3 = 0 + 1 + 1 = 2
// i=4: t3 = 1 + 1 + 2 = 4