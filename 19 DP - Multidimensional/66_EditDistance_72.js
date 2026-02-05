/**
 * 72. Edit Distance
 * https://leetcode.com/problems/edit-distance/
 * 
 * Given two strings word1 and word2, return the minimum number of operations 
 * required to convert word1 to word2.
 * 
 * You have the following three operations permitted on a word:
 * - Insert a character
 * - Delete a character
 * - Replace a character
 * 
 * @example
 * Input: word1 = "horse", word2 = "ros"
 * Output: 3
 * Explanation:
 * horse -> rorse (replace 'h' with 'r')
 * rorse -> rose (remove 'r')
 * rose -> ros (remove 'e')
 * 
 * @example
 * Input: word1 = "intention", word2 = "execution"
 * Output: 5
 * Explanation:
 * intention -> inention (remove 't')
 * inention -> enention (replace 'i' with 'e')
 * enention -> exention (replace 'n' with 'x')
 * exention -> exection (replace 'n' with 'c')
 * exection -> execution (insert 'u')
 * 
 * Constraints:
 * - 0 <= word1.length, word2.length <= 500
 * - word1 and word2 consist of lowercase English letters
 */

/**
 * Dynamic Programming Approach (2D)
 * 
 * We use a 2D DP table where dp[i][j] represents the minimum number of 
 * operations to convert word1[0...i-1] to word2[0...j-1].
 * 
 * Key Insight:
 * - If word1[i-1] === word2[j-1]: No operation needed
 *   dp[i][j] = dp[i-1][j-1]
 * - If word1[i-1] !== word2[j-1]: Take minimum of three operations
 *   - Insert: dp[i][j-1] + 1 (insert word2[j-1] into word1)
 *   - Delete: dp[i-1][j] + 1 (delete word1[i-1] from word1)
 *   - Replace: dp[i-1][j-1] + 1 (replace word1[i-1] with word2[j-1])
 * 
 * Base Cases:
 * - dp[i][0] = i (delete all characters from word1)
 * - dp[0][j] = j (insert all characters from word2)
 * 
 * Time Complexity: O(m * n) - Where m and n are lengths of word1 and word2
 * Space Complexity: O(m * n) - 2D DP table
 * 
 * @param {string} word1 - Source string
 * @param {string} word2 - Target string
 * @return {number} - Minimum number of operations
 */
var minDistance = function(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    
    // Create a 2D DP table with extra row and column for base cases
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Base case: Converting empty string to word2[0...j-1] requires j insertions
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    // Base case: Converting word1[0...i-1] to empty string requires i deletions
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // Characters match - no operation needed
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Take minimum of insert, delete, or replace
                dp[i][j] = 1 + Math.min(
                    dp[i][j - 1],     // Insert
                    dp[i - 1][j],     // Delete
                    dp[i - 1][j - 1]  // Replace
                );
            }
        }
    }
    
    return dp[m][n];
};

/**
 * Dynamic Programming Approach (Space Optimized - 1D)
 * 
 * Since each row only depends on the current and previous row,
 * we can optimize space by using two 1D arrays.
 * 
 * Time Complexity: O(m * n) - Where m and n are lengths of word1 and word2
 * Space Complexity: O(n) - Only two rows stored
 * 
 * @param {string} word1 - Source string
 * @param {string} word2 - Target string
 * @return {number} - Minimum number of operations
 */
var minDistanceOptimized = function(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    
    // Initialize previous row: converting empty string to word2[0...j-1]
    let prev = Array(n + 1).fill(0).map((_, j) => j);
    let curr = Array(n + 1).fill(0);
    
    for (let i = 1; i <= m; i++) {
        // Base case: converting word1[0...i-1] to empty string
        curr[0] = i;
        
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(
                    curr[j - 1],   // Insert
                    prev[j],       // Delete
                    prev[j - 1]    // Replace
                );
            }
        }
        // Swap rows
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
};
