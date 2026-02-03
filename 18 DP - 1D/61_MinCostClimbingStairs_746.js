/**
 * 746. Min Cost Climbing Stairs
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 * 
 * You are given an integer array cost where cost[i] is the cost of ith step 
 * on a staircase. Once you pay the cost, you can either climb one or two steps.
 * 
 * You can either start from the step with index 0, or the step with index 1.
 * 
 * Return the minimum cost to reach the top of the floor.
 * 
 * @example
 * Input: cost = [10,15,20]
 * Output: 15
 * Explanation: Start at index 1, pay 15 and climb two steps to reach the top.
 * 
 * @example
 * Input: cost = [1,100,1,1,1,100,1,1,100,1]
 * Output: 6
 * Explanation: Start at index 0, pay 1 and climb optimally to minimize cost.
 * 
 * Constraints:
 * - 2 <= cost.length <= 1000
 * - 0 <= cost[i] <= 999
 */

/**
 * Dynamic Programming Approach (Space Optimized)
 * 
 * State: dp[i] = minimum cost to reach step i
 * Transition: dp[i] = cost[i] + min(dp[i-1], dp[i-2])
 * 
 * Since we only need the last 2 values, we optimize space to O(1).
 * 
 * Time Complexity: O(n) - Single pass through the array
 * Space Complexity: O(1) - Only storing 2 variables
 * 
 * @param {number[]} cost - Cost array for each step
 * @return {number} - Minimum cost to reach the top
 */
var minCostClimbingStairs = function(cost) {
    const n = cost.length;
    
    // prev2 = min cost to reach step i-2
    // prev1 = min cost to reach step i-1
    let prev2 = cost[0];
    let prev1 = cost[1];
    
    // Calculate min cost for each step from index 2
    for (let i = 2; i < n; i++) {
        const current = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = current;
    }
    
    // Can reach top from either of the last two steps
    return Math.min(prev1, prev2);
};