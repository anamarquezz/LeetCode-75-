// ============================================
// Divide Array Into Subarrays With Minimum Cost I
// Purpose: Minimize sum of first elements of 3 subarrays
// ⭐ ============================================
/*
The cost of an array is its first element.
Divide nums into 3 disjoint contiguous subarrays and minimize the total cost.

Example 1:
Input: nums = [1,2,3,12]
Output: 6

Example 2:
Input: nums = [5,4,3]
Output: 12

Example 3:
Input: nums = [10,3,1,1]
Output: 12

Constraints:
3 <= n <= 50
1 <= nums[i] <= 50
*/

// ============================================
// Solution Function
// ============================================

var minimumCost = function(nums) {
    const firstElement = nums[0];
    let min1 = Infinity;
    let min2 = Infinity;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < min1) {
            min2 = min1;
            min1 = nums[i];
        } else if (nums[i] < min2) {
            min2 = nums[i];
        }
    }

    return firstElement + min1 + min2;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", minimumCost([1, 2, 3, 12])); // Expected: 6
console.log("Test 2:", minimumCost([5, 4, 3]));     // Expected: 12
console.log("Test 3:", minimumCost([10, 3, 1, 1])); // Expected: 12

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Pick smallest two after index 0
// 1. nums[0] is always included (first subarray starts at 0).
// 2. Choose the two smallest values among nums[1..].
// 3. Sum nums[0] + min1 + min2.
//
// Time Complexity:  O(n)
// Space Complexity: O(1)