// ============================================
// Trionic Array I
// Purpose: Detect increasing-decreasing-increasing pattern
// ⭐ ============================================
/*
An array is trionic if there exist indices 0 < p < q < n - 1 such that:
- nums[0..p] is strictly increasing
- nums[p..q] is strictly decreasing
- nums[q..n-1] is strictly increasing

Example 1:
Input: nums = [1,3,5,4,2,6]
Output: true

Example 2:
Input: nums = [2,1,3]
Output: false

Constraints:
3 <= n <= 100
-1000 <= nums[i] <= 1000
*/

// ============================================
// Solution Function
// ============================================

var isTrionic = function(nums) {
    const n = nums.length;
    if (n < 5) return false;

    let i = 0;

    while (i < n - 1 && nums[i] < nums[i + 1]) i++;
    const p = i;
    if (p === 0 || p >= n - 2) return false;

    while (i < n - 1 && nums[i] > nums[i + 1]) i++;
    const q = i;
    if (q === p || q >= n - 1) return false;

    while (i < n - 1 && nums[i] < nums[i + 1]) i++;
    return i === n - 1;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", isTrionic([1,3,5,4,2,6])); // Expected: true
console.log("Test 2:", isTrionic([2,1,3])); // Expected: false
console.log("Test 3:", isTrionic([1,2,3,2,1,2])); // Expected: true

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Three-phase scan
// 1. Walk up strictly increasing.
// 2. Walk down strictly decreasing.
// 3. Walk up strictly increasing again.
// 4. Valid if we end at last index.
//
// Time Complexity:  O(n)
// Space Complexity: O(1)