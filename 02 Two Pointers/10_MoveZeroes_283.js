// ============================================
// Move Zeroes
// Purpose: Move all zeros to end while maintaining order
// ⭐ ============================================
/*
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

 

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
 

Constraints:

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let insertPos = 0;

    //place non-zero elements at beginning
    for (let num of nums) {
        if(num !== 0) {
            nums[insertPos++] = num;
        }
    }

    //fill rest with zeros
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
};

// ============================================
// Test Cases
// ============================================

let test1 = [0,1,0,3,12];
moveZeroes(test1);
console.log("Test 1:");
console.log("Input:    ", [0,1,0,3,12]);
console.log("Output:   ", test1);
console.log("Expected: ", [1,3,12,0,0]);

let test2 = [0];
moveZeroes(test2);
console.log("\nTest 2:");
console.log("Input:    ", [0]);
console.log("Output:   ", test2);
console.log("Expected: ", [0]);



// ============================================
//  Explanation
// ============================================
//
// Algorithm: Two-pass approach with position tracking
// 1. First pass: Iterate through array and place all non-zero elements at the beginning
//    - Use insertPos pointer to track where to place next non-zero element
//    - For each non-zero number, place it at insertPos and increment insertPos
// 2. Second pass: Fill remaining positions with zeros
//    - While insertPos < nums.length, fill with 0
// 3. This maintains relative order of non-zero elements and moves zeros to end
//
// Time Complexity:  O(n) where n = nums.length (two passes through array)
// Space Complexity: O(1) constant extra space (only insertPos pointer used)
//
// Example: nums = [0,1,0,3,12]
// First pass:
//   num=0: skip (is zero)
//   num=1: nums[0]=1, insertPos=1
//   num=0: skip (is zero)
//   num=3: nums[1]=3, insertPos=2
//   num=12: nums[2]=12, insertPos=3
// After first pass: [1,3,12,3,12]
// Second pass:
//   nums[3]=0, nums[4]=0
// Result: [1,3,12,0,0]