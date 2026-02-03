/**
 * 216. Combination Sum III
 * https://leetcode.com/problems/combination-sum-iii/
 * 
 * Find all valid combinations of k numbers that sum up to n such that:
 * - Only numbers 1 through 9 are used
 * - Each number is used at most once
 * 
 * Return a list of all possible valid combinations. The list must not contain 
 * the same combination twice, and combinations may be returned in any order.
 * 
 * @example
 * Input: k = 3, n = 7
 * Output: [[1,2,4]]
 * Explanation: 1 + 2 + 4 = 7. There are no other valid combinations.
 * 
 * @example
 * Input: k = 3, n = 9
 * Output: [[1,2,6],[1,3,5],[2,3,4]]
 * Explanation: 1+2+6 = 9, 1+3+5 = 9, 2+3+4 = 9
 * 
 * @example
 * Input: k = 4, n = 1
 * Output: []
 * Explanation: Smallest sum with 4 numbers is 1+2+3+4 = 10 > 1, no valid combination.
 * 
 * Constraints:
 * - 2 <= k <= 9
 * - 1 <= n <= 60
 */

/**
 * Backtracking Approach
 * 
 * Generate combinations by choosing numbers 1-9 without repetition.
 * Use backtracking to explore all possibilities while pruning invalid paths.
 * 
 * Time Complexity: O(C(9,k) * k) - All combinations of k numbers from 9
 * Space Complexity: O(k) - Recursion depth and current combination storage
 * 
 * @param {number} k - Number of elements in each combination
 * @param {number} n - Target sum
 * @return {number[][]} - All valid combinations
 */
var combinationSum3 = function(k, n) {
    const result = [];
    
    /**
     * Backtrack to find valid combinations
     * @param {number} start - Starting number to consider (1-9)
     * @param {number} remaining - Remaining sum needed
     * @param {number[]} current - Current combination being built
     */
    const backtrack = (start, remaining, current) => {
        // Base case: found valid combination
        if (current.length === k && remaining === 0) {
            result.push([...current]);
            return;
        }
        
        // Pruning: too many numbers or negative remaining
        if (current.length >= k || remaining <= 0) {
            return;
        }
        
        // Try numbers from start to 9
        for (let num = start; num <= 9; num++) {
            // Pruning: if num is too large, no point continuing
            if (num > remaining) break;
            
            // Choose
            current.push(num);
            
            // Explore
            backtrack(num + 1, remaining - num, current);
            
            // Unchoose (backtrack)
            current.pop();
        }
    };
    
    backtrack(1, n, []);
    return result;
};