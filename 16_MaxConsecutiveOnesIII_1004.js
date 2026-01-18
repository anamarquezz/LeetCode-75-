// ⭐ ============================================
// 📝 Max Consecutive Ones III
// Purpose: Find maximum consecutive 1's after flipping at most k 0's
// ⭐ ============================================
/*
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Example 1:
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

Example 2:
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

Constraints:
1 <= nums.length <= 10^5
nums[i] is either 0 or 1.
0 <= k <= nums.length
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
    let start = 0;
    let maxOnes = 0;
    let zerosFlipped = 0;
    
    for (let end = 0; end < nums.length; end++) {
        // Count zeros in current window
        if (nums[end] === 0) 
            zerosFlipped++;
        
        // If zeros exceed k, shrink window from left
        while (zerosFlipped > k) {
            if (nums[start] === 0) 
                zerosFlipped--;
            start++;
        }
        
        // Update maximum window size
        maxOnes = Math.max(maxOnes, end - start + 1);
    }
    
    return maxOnes;
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

console.log("Test 1: [1,1,1,0,0,0,1,1,1,1,0], k=2", longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // Expected: 6
console.log("Test 2: [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k=3", longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)); // Expected: 10
console.log("Test 3: [0], k=1", longestOnes([0], 1)); // Expected: 1
console.log("Test 4: [1,1,1], k=0", longestOnes([1,1,1], 0)); // Expected: 3

// ⭐ ============================================
//  Explanation
// ⭐ ============================================
// 
// Algorithm: Sliding Window with Two Pointers
// 1. Use two pointers (start and end) to maintain a window
// 2. Expand the window by moving end pointer to the right
// 3. Count the number of zeros in the current window
// 4. If zeros exceed k, shrink the window from left by moving start pointer
// 5. Track the maximum window size seen
// 6. The maximum window size represents the longest consecutive 1's possible
//
// Time Complexity:  O(n) - each element is visited at most twice
// Space Complexity: O(1) - only using constant extra space
//
// Example: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
// Window [1,1,1]: zeros = 0, length = 3
// Window [1,1,1,0]: zeros = 1, length = 4
// Window [1,1,1,0,0]: zeros = 2, length = 5
// Window [1,1,1,0,0,0]: zeros = 3 > k, shrink
// Window [1,1,0,0,0,1]: zeros = 3 > k, shrink
// Window [1,0,0,0,1,1]: zeros = 3 > k, shrink
// Window [0,0,0,1,1,1]: zeros = 3 > k, shrink
// Window [0,0,1,1,1,1]: zeros = 2, length = 6 ✅ (maximum)
// Maximum consecutive 1's after flipping at most 2 zeros is 6