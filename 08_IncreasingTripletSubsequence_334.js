// ⭐ ============================================
// 📝 Increasing Triplet Subsequence
// Purpose: Find if an increasing triplet exists
// ⭐ ============================================
/*
Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

 

Example 1:

Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.

Example 2:

Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.

Example 3:

Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: One of the valid triplet is (1, 4, 5), because nums[1] == 1 < nums[4] == 4 < nums[5] == 6.
 

Constraints:

1 <= nums.length <= 5 * 105
-231 <= nums[i] <= 231 - 1
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
    let first = Infinity; //smallest number seen so far
    let second = Infinity; //Second smallest number seen so far

    for (let num of nums) {
        if (num <= first) {
            first = num;        //update smallest
        } else if ( num <= second) {
            second = num;       // Update second smallest
        } else {
            return true;    // Found  third element > both
        }
    }
    return false;
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

console.log("Test 1:", increasingTriplet([1,2,3,4,5])); // Expected: true
console.log("Test 2:", increasingTriplet([5,4,3,2,1])); // Expected: false
console.log("Test 3:", increasingTriplet([2,1,5,0,4,6])); // Expected: true

// ⭐ ============================================
//  Explanation
// ⭐ ============================================
//
// Algorithm: Two-variable tracking approach
// 1. Keep track of two variables: first (smallest) and second (second smallest)
// 2. Initialize both to Infinity
// 3. For each number in the array:
//    - If num <= first: update first to num
//    - Else if num <= second: update second to num (found an increasing pair)
//    - Else: return true (found a third element greater than both)
// 4. If loop completes without finding triplet, return false
//
// Time Complexity:  O(n) where n = nums.length (single pass)
// Space Complexity: O(1) - only using two variables
//
// Example: nums = [2,1,5,0,4,6]
// i=0: num=2, first=2, second=Infinity
// i=1: num=1, first=1, second=Infinity (1 < 2)
// i=2: num=5, first=1, second=5 (5 > 1)
// i=3: num=0, first=0, second=5 (0 < 1)
// i=4: num=4, first=0, second=4 (4 > 0 but 4 < 5)
// i=5: num=6, return true (6 > 4 and 6 > 0) ✅
