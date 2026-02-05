// ============================================
// Single Number
// Purpose: Find unique element using XOR bit manipulation
// ============================================
/*
Given a non-empty array of integers nums, every element appears twice except 
for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only 
constant extra space.

Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1

Constraints:
1 <= nums.length <= 3 * 10^4
-3 * 10^4 <= nums[i] <= 3 * 10^4
Each element in the array appears twice except for one element which appears only once.
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let result = 0;
    
    for (const num of nums) {
        // XOR all numbers together
        // a ^ a = 0 (same numbers cancel out)
        // a ^ 0 = a (XOR with 0 keeps the number)
        result ^= num;
    }
    
    return result;
};

// ============================================
// Alternative Solution (Using reduce)
// ============================================

var singleNumberAlt = function(nums) {
    return nums.reduce((acc, num) => acc ^ num, 0);
};

// ============================================
// Test Cases
// ============================================

console.log('Test 1: [2,2,1]', singleNumber([2, 2, 1])); // Expected: 1
console.log('Test 2: [4,1,2,1,2]', singleNumber([4, 1, 2, 1, 2])); // Expected: 4
console.log('Test 3: [1]', singleNumber([1])); // Expected: 1

// ============================================
// Explanation
// ============================================
// Algorithm: Bit Manipulation (XOR)
// 1. XOR has these properties:
//    - a ^ a = 0 (any number XOR itself is 0)
//    - a ^ 0 = a (any number XOR 0 is itself)
//    - XOR is commutative and associative
// 2. When we XOR all numbers:
//    - Pairs cancel out: (a ^ a) = 0
//    - The single number remains: 0 ^ single = single
// 3. Example: [4,1,2,1,2] -> 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4
//
// Time Complexity:  O(n)
// Space Complexity: O(1)
