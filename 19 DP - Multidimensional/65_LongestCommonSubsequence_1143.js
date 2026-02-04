/**
 * 1143. Longest Common Subsequence
 * https://leetcode.com/problems/longest-common-subsequence/
 * 
 * Given two strings text1 and text2, return the length of their longest 
 * common subsequence. If there is no common subsequence, return 0.
 * 
 * A subsequence of a string is a new string generated from the original 
 * string with some characters (can be none) deleted without changing the 
 * relative order of the remaining characters.
 * 
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 * 
 * @example
 * Input: text1 = "abcde", text2 = "ace"
 * Output: 3
 * Explanation: The longest common subsequence is "ace" and its length is 3.
 * 
 * @example
 * Input: text1 = "abc", text2 = "abc"
 * Output: 3
 * Explanation: The longest common subsequence is "abc" and its length is 3.
 * 
 * @example
 * Input: text1 = "abc", text2 = "def"
 * Output: 0
 * Explanation: There is no such common subsequence, so the result is 0.
 * 
 * Constraints:
 * - 1 <= text1.length, text2.length <= 1000
 * - text1 and text2 consist of only lowercase English characters
 */

/**
 * Dynamic Programming Approach (2D)
 * 
 * We use a 2D DP table where dp[i][j] represents the length of the longest
 * common subsequence of text1[0...i-1] and text2[0...j-1].
 * 
 * Key Insight:
 * - If text1[i-1] === text2[j-1]: Characters match, extend LCS by 1
 *   dp[i][j] = dp[i-1][j-1] + 1
 * - If text1[i-1] !== text2[j-1]: Take the best without one of the characters
 *   dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 * 
 * Base Cases:
 * - dp[0][j] = 0 (empty text1)
 * - dp[i][0] = 0 (empty text2)
 * 
 * Time Complexity: O(m * n) - Where m and n are lengths of text1 and text2
 * Space Complexity: O(m * n) - 2D DP table
 * 
 * @param {string} text1 - First string
 * @param {string} text2 - Second string
 * @return {number} - Length of longest common subsequence
 */
var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    // Create a 2D DP table with extra row and column for base cases
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // Characters match - extend the LCS
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // Characters don't match - take the best from excluding one character
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
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
 * Time Complexity: O(m * n) - Where m and n are lengths of text1 and text2
 * Space Complexity: O(n) - Only two rows stored
 * 
 * @param {string} text1 - First string
 * @param {string} text2 - Second string
 * @return {number} - Length of longest common subsequence
 */
var longestCommonSubsequenceOptimized = function(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    // Use two rows for space optimization
    let prev = Array(n + 1).fill(0);
    let curr = Array(n + 1).fill(0);
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        // Swap rows
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
};
