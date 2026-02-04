// ============================================
// Min Cost Climbing Stairs
// Purpose: Find minimum cost to reach the top
// ⭐ ============================================
/*
You are given an integer array cost where cost[i] is the cost of ith step.
Once you pay the cost, you can climb one or two steps.
You can start from step 0 or step 1.

Return the minimum cost to reach the top.

Example 1:
Input: cost = [10,15,20]
Output: 15
Explanation: Start at index 1, pay 15, climb two steps.

Example 2:
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6

Constraints:
2 <= cost.length <= 1000
0 <= cost[i] <= 999
*/

// ============================================
// Solution Function
// ============================================

var minCostClimbingStairs = function(cost) {
    const n = cost.length;
    let prev2 = cost[0];
    let prev1 = cost[1];

    for (let i = 2; i < n; i++) {
        const current = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = current;
    }

    return Math.min(prev1, prev2);
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", minCostClimbingStairs([10, 15, 20])); // Expected: 15
console.log("Test 2:", minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])); // Expected: 6

// ============================================
//  Explanation
// ============================================
//
// Algorithm: DP with rolling values
// 1. dp[i] = cost[i] + min(dp[i-1], dp[i-2]).
// 2. Only the last two dp values are needed, so use prev1/prev2.
// 3. The answer is min(dp[n-1], dp[n-2]) since you can finish from either.
//
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// Example: cost = [10, 15, 20]
// dp[0]=10, dp[1]=15, dp[2]=20+min(15,10)=30 -> min(15,30)=15