/**
 * 62. Unique Paths
 * https://leetcode.com/problems/unique-paths/
 * 
 * There is a robot on an m x n grid. The robot is initially located at the 
 * top-left corner (i.e., grid[0][0]). The robot tries to move to the 
 * bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move 
 * either down or right at any point in time.
 * 
 * Given the two integers m and n, return the number of possible unique paths 
 * that the robot can take to reach the bottom-right corner.
 * 
 * @example
 * Input: m = 3, n = 7
 * Output: 28
 * 
 * @example
 * Input: m = 3, n = 2
 * Output: 3
 * Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
 * 1. Right -> Down -> Down
 * 2. Down -> Down -> Right
 * 3. Down -> Right -> Down
 * 
 * Constraints:
 * - 1 <= m, n <= 100
 * - The answer will be less than or equal to 2 * 10^9
 */

/**
 * Dynamic Programming Approach (2D)
 * 
 * We use a 2D DP table where dp[i][j] represents the number of unique paths
 * to reach cell (i, j) from the starting position (0, 0).
 * 
 * Key Insight:
 * - To reach any cell (i, j), we can only come from top (i-1, j) or left (i, j-1)
 * - So dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * 
 * Base Cases:
 * - First row: All cells have only 1 way to reach (keep going right)
 * - First column: All cells have only 1 way to reach (keep going down)
 * 
 * Time Complexity: O(m * n) - Fill the entire DP table
 * Space Complexity: O(m * n) - 2D DP table
 * 
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @return {number} - Number of unique paths
 */
var uniquePaths = function(m, n) {
    // Create a 2D DP table
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    
    // Base case: First row - only one way to reach each cell (go right)
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    
    // Base case: First column - only one way to reach each cell (go down)
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    
    // Fill the DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // Number of paths = paths from top + paths from left
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
};

/**
 * Dynamic Programming Approach (Space Optimized - 1D)
 * 
 * Since each row only depends on the current and previous row,
 * we can optimize space by using a single 1D array.
 * 
 * Time Complexity: O(m * n) - Fill the entire DP table
 * Space Complexity: O(n) - Only one row stored
 * 
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @return {number} - Number of unique paths
 */
var uniquePathsOptimized = function(m, n) {
    // Initialize with 1s (representing the first row)
    const dp = Array(n).fill(1);
    
    // Process each subsequent row
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // dp[j] = paths from top (previous dp[j]) + paths from left (dp[j-1])
            dp[j] = dp[j] + dp[j - 1];
        }
    }
    
    return dp[n - 1];
};
