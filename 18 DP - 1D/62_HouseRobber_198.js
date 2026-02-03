/**
 * 198. House Robber
 * https://leetcode.com/problems/house-robber/
 * 
 * You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed. The only constraint 
 * stopping you from robbing each of them is that adjacent houses have 
 * security systems connected - it will automatically contact the police 
 * if two adjacent houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house, 
 * return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * @example
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Explanation: Rob house 1 (money = 1) and house 3 (money = 3). Total = 4.
 * 
 * @example
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * Explanation: Rob house 1 (money = 2), house 3 (money = 9), house 5 (money = 1). Total = 12.
 * 
 * Constraints:
 * - 1 <= nums.length <= 100
 * - 0 <= nums[i] <= 400
 */

/**
 * Dynamic Programming Approach (Space Optimized)
 * 
 * For each house, we have two choices:
 * 1. Rob it: Add current value to max from 2 houses back (can't rob adjacent)
 * 2. Skip it: Take the max from previous house
 * 
 * State: dp[i] = max money robbing houses 0 to i
 * Transition: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 * 
 * Time Complexity: O(n) - Single pass through the array
 * Space Complexity: O(1) - Only storing 2 variables
 * 
 * @param {number[]} nums - Money in each house
 * @return {number} - Maximum money that can be robbed
 */
var rob = function(nums) {
    const n = nums.length;
    
    if (n === 1) return nums[0];
    
    // prev2 = max money robbing up to house i-2
    // prev1 = max money robbing up to house i-1
    let prev2 = 0;
    let prev1 = nums[0];
    
    for (let i = 1; i < n; i++) {
        // Either skip current house (prev1) or rob it (prev2 + nums[i])
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
};