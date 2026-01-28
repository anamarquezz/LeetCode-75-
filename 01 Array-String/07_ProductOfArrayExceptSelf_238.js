// ============================================
// Product of Array Except Self
// Purpose: Return array where each element is product of all others
// ⭐ ============================================
/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Explanation: 
answer[0] = 2*3*4 = 24
answer[1] = 1*3*4 = 12
answer[2] = 1*2*4 = 8
answer[3] = 1*2*3 = 6

Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

 

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const answer = new Array(n);

    // First pass: left products
    answer[0] = 1;
    for(let i = 1; i < n; i ++ ){
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // Second pass: right products
    let right = 1;
    for (let i = n - 1; i >= 0; i --){
        answer[i] *= right;
        right *= nums[i];
    }

    return answer;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", productExceptSelf([1,2,3,4])); // Expected: [24,12,8,6]
console.log("Test 2:", productExceptSelf([-1,1,0,-3,3])); // Expected: [0,0,9,0,0]
console.log("Test 3:", productExceptSelf([2,3,4,5])); // Expected: [60,40,30,24]

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Two-pass left and right product approach
// 1. Create answer array of same length
// 2. First pass (left to right):
//    - Store the product of all elements to the left of each index
//    - answer[0] = 1 (no elements to the left)
//    - answer[i] = answer[i-1] * nums[i-1]
// 3. Second pass (right to left):
//    - Multiply by the product of all elements to the right
//    - Keep track of running product from right side
//    - answer[i] *= right (combines left and right products)
//    - right *= nums[i] (update for next iteration)
//
// Time Complexity:  O(n) - Two passes through the array
// Space Complexity: O(1) - Only output array, not counting it
//
// Example: nums = [1,2,3,4]
// First pass (left products):
// answer[0] = 1
// answer[1] = 1 * 1 = 1
// answer[2] = 1 * 2 = 2
// answer[3] = 2 * 3 = 6
// After: [1, 1, 2, 6]
//
// Second pass (right products):
// i=3: answer[3] = 6 * 1 = 6, right = 1 * 4 = 4
// i=2: answer[2] = 2 * 4 = 8, right = 4 * 3 = 12
// i=1: answer[1] = 1 * 12 = 12, right = 12 * 2 = 24
// i=0: answer[0] = 1 * 24 = 24, right = 24 * 1 = 24
// Result: [24, 12, 8, 6] ✅