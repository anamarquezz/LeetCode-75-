// ============================================
// Domino and Tromino Tiling
// Purpose: Count tilings of a 2 x n board
// ⭐ ============================================
/*
You have two types of tiles: a 2 x 1 domino and a tromino (can rotate).
Given n, return the number of ways to tile a 2 x n board modulo 10^9 + 7.

Example 1:
Input: n = 3
Output: 5

Example 2:
Input: n = 1
Output: 1

Constraints:
1 <= n <= 1000
*/

// ============================================
// Solution Function
// ============================================

var numTilings = function(n) {
    const MOD = 1e9 + 7;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 5;

    let dp3 = 1;
    let dp2 = 2;
    let dp1 = 5;

    for (let i = 4; i <= n; i++) {
        const current = (2 * dp1 + dp3) % MOD;
        dp3 = dp2;
        dp2 = dp1;
        dp1 = current;
    }

    return dp1;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", numTilings(3)); // Expected: 5
console.log("Test 2:", numTilings(1)); // Expected: 1
console.log("Test 3:", numTilings(4)); // Expected: 11

// ============================================
//  Explanation
// ============================================
//
// Algorithm: DP with recurrence
// dp[n] = 2 * dp[n-1] + dp[n-3]
// Base: dp[1]=1, dp[2]=2, dp[3]=5
//
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// Example: n = 4
// dp[4] = 2*dp[3] + dp[1] = 2*5 + 1 = 11