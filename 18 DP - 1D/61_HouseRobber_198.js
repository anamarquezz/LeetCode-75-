// ============================================
// House Robber
// Purpose: Maximize robbery without adjacent hits
// ⭐ ============================================
/*
You are a professional robber planning to rob houses along a street.
Adjacent houses have security systems connected, so you cannot rob two adjacent houses.

Given an integer array nums, return the maximum amount of money you can rob.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob houses 1 and 3 -> 1 + 3 = 4.

Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob houses 1, 3, 5 -> 2 + 9 + 1 = 12.

Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 400
*/

// ============================================
// Solution Function
// ============================================

var rob = function(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];

    let prev2 = 0;
    let prev1 = nums[0];

    for (let i = 1; i < n; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", rob([1, 2, 3, 1])); // Expected: 4
console.log("Test 2:", rob([2, 7, 9, 3, 1])); // Expected: 12

// ============================================
//  Explanation
// ============================================
//
// Algorithm: DP with rolling max
// 1. At each house, choose max of:
//    - Skip: previous max (prev1)
//    - Rob: prev2 + nums[i]
// 2. Roll the two values forward.
//
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// Example: nums = [1,2,3,1]
// i=1 -> max(1,0+2)=2
// i=2 -> max(2,1+3)=4
// i=3 -> max(4,2+1)=4