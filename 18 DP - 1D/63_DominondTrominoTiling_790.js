/**
 * 790. Domino and Tromino Tiling
 * https://leetcode.com/problems/domino-and-tromino-tiling/
 * 
 * You have two types of tiles: a 2 x 1 domino shape and a tromino shape. 
 * You may rotate these shapes.
 * 
 * Given an integer n, return the number of ways to tile a 2 x n board. 
 * Since the answer may be very large, return it modulo 10^9 + 7.
 * 
 * In a tiling, every square must be covered by a tile. Two tilings are different 
 * if and only if there are two 4-directionally adjacent cells on the board such 
 * that exactly one of the tilings has both squares occupied by a tile.
 * 
 * @example
 * Input: n = 3
 * Output: 5
 * Explanation: The five different ways to tile a 2x3 board.
 * 
 * @example
 * Input: n = 1
 * Output: 1
 * 
 * Constraints:
 * - 1 <= n <= 1000
 */

/**
 * Dynamic Programming Approach
 * 
 * Key insight: The recurrence relation is:
 * dp[n] = 2 * dp[n-1] + dp[n-3]
 * 
 * This can be derived by considering:
 * - Ways to complete a full 2xn board from 2x(n-1): dp[n-1] ways
 * - Ways to complete from 2x(n-2) with two horizontal dominoes: dp[n-2] ways  
 * - Ways involving trominoes create a pattern: 2*(dp[n-3] + dp[n-4] + ...)
 * 
 * Simplifying: dp[n] = 2*dp[n-1] + dp[n-3]
 * 
 * Time Complexity: O(n) - Single pass through n iterations
 * Space Complexity: O(1) - Only storing 3 variables
 * 
 * @param {number} n - Width of the 2 x n board
 * @return {number} - Number of ways to tile the board modulo 10^9 + 7
 */
var numTilings = function(n) {
    const MOD = 1e9 + 7;
    
    // Base cases
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 5;
    
    // dp values for n-3, n-2, n-1
    let dp3 = 1; // dp[1]
    let dp2 = 2; // dp[2]
    let dp1 = 5; // dp[3]
    
    for (let i = 4; i <= n; i++) {
        // dp[i] = 2 * dp[i-1] + dp[i-3]
        const current = (2 * dp1 + dp3) % MOD;
        dp3 = dp2;
        dp2 = dp1;
        dp1 = current;
    }
    
    return dp1;
};