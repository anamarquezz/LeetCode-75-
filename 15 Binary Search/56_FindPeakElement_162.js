// ============================================
// Find Peak Element
// Purpose: Find any peak in O(log n)
// ⭐ ============================================
/*
A peak element is strictly greater than its neighbors.
Given an array nums, return the index of any peak.
Assume nums[-1] = nums[n] = -Infinity.

Example 1:
Input: nums = [1,2,3,1]
Output: 2

Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5 (or 1)

Constraints:
1 <= nums.length <= 1000
nums[i] != nums[i + 1]
*/

// ============================================
// Solution Function
// ============================================

var findPeakElement = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] < nums[mid + 1]) left = mid + 1;
        else right = mid;
    }

    return left;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", findPeakElement([1, 2, 3, 1])); // Expected: 2
console.log("Test 2:", findPeakElement([1, 2, 1, 3, 5, 6, 4])); // Expected: 1 or 5

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Binary search on slope
// 1. If nums[mid] < nums[mid + 1], peak is to the right.
// 2. Otherwise, peak is at mid or to the left.
// 3. Converge to a peak index.
//
// Time Complexity:  O(log n)
// Space Complexity: O(1)