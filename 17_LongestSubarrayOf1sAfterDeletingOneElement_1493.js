// ============================================
// Longest Subarray of 1's After Deleting One Element
// Purpose: Find longest subarray of 1's after deleting one element
// ============================================
/*
Given a binary array nums, you should delete one element from it.

Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.

Example 1:
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.

Example 2:
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].

Example 3:
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.

Constraints:
1 <= nums.length <= 10^5
nums[i] is either 0 or 1.
*/

// ============================================
// Solution Function
// ============================================
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
    let left = 0;
    let zeros = 0;
    let best = 0;

    for(let right = 0; right < nums.length; right++) {
        if (nums[right] === 0)
            zeros++;

        while(zeros > 1) {
            if(nums[left] === 0)
                zeros--;
            left++;
        }
        best = Math.max(best, right - left);
    }
    return best;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1: [1,1,0,1]", longestSubarray([1,1,0,1])); // Expected: 3
console.log("Test 2: [0,1,1,1,0,1,1,0,1]", longestSubarray([0,1,1,1,0,1,1,0,1])); // Expected: 5
console.log("Test 3: [1,1,1]", longestSubarray([1,1,1])); // Expected: 2
console.log("Test 4: [0,0]", longestSubarray([0,0])); // Expected: 0

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Sliding Window approach
// 1. Use two pointers (left and right) to maintain a window
// 2. Count zeros in the current window
// 3. Expand the window by moving right pointer
// 4. If zeros exceed 1, shrink window from left until zeros <= 1
// 5. Track the maximum window size where we have at most 1 zero
// 6. The window size minus 1 is the longest subarray of 1's (removing the one zero)
//
// Time Complexity:  O(n) - each element is visited at most twice
// Space Complexity: O(1) - only using constant extra space
//
// Example: nums = [1,1,0,1]
// left=0, right=0: num=1, zeros=0, best=1
// left=0, right=1: num=1, zeros=0, best=2
// left=0, right=2: num=0, zeros=1, best=3
// left=0, right=3: num=1, zeros=1, best=4
// Return best - 1 = 3 (delete the zero)