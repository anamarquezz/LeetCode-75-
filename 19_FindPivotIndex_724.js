//  ============================================
//  Find Pivot Index
// Purpose: Find the leftmost index where left and right sums are equal
//  ============================================
/*
Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

Example 1:
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11

Example 2:
Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.

Example 3:
Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0

Constraints:
1 <= nums.length <= 10^4
-1000 <= nums[i] <= 1000
*/

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  // Step 1: Calculate the total sum of the array
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }

  // Step 2: Start leftSum at 0
  let leftSum = 0;

  // Step 3: Iterate through each index to find pivot
  for (let i = 0; i < nums.length; i++) {
    // Step 4: Right sum is totalSum - leftSum - current value
    const rightSum = totalSum - leftSum - nums[i];

    // Step 5: If leftSum equals rightSum, return this index
    if (leftSum === rightSum) return i;

    // Step 6: Add current value to leftSum before moving on
    leftSum += nums[i];
  }

  // Step 7: No pivot found, return -1
  return -1;
};

//  ============================================
//  Test Cases
//  ============================================

console.log("Test 1: [1,7,3,6,5,6]", pivotIndex([1,7,3,6,5,6])); // Expected: 3
console.log("Test 2: [1,2,3]", pivotIndex([1,2,3])); // Expected: -1
console.log("Test 3: [2,1,-1]", pivotIndex([2,1,-1])); // Expected: 0

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Prefix Sum
// 1. Compute totalSum of the array
// 2. Keep a running leftSum
// 3. For each index, rightSum = totalSum - leftSum - nums[i]
// 4. If leftSum equals rightSum, current index is the pivot
// 5. Otherwise update leftSum and continue
//
// Time Complexity:  O(n) - single pass after total sum
// Space Complexity: O(1) - constant extra space