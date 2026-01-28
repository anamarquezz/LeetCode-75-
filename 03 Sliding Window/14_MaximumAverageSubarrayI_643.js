// ============================================
// Maximum Average Subarray I
// Purpose: Find the maximum average of a contiguous subarray of length k
// ⭐ ============================================
/*
You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

Example 1:
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

Example 2:
Input: nums = [5], k = 1
Output: 5.00000

Constraints:
n == nums.length
1 <= k <= n <= 10^5
-10^4 <= nums[i] <= 10^4
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let currentSum = 0;

    // Initialize first window sum
    for (let i = 0; i < k; i++) {
        currentSum += nums[i];        
    }

    let maxSum = currentSum;

    // Slide window from k to end
    for (let i = k; i < nums.length; i++) {
        // Slide: remove leftmost, add rightmost
        currentSum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum / k;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1: [1,12,-5,-6,50,3], k=4", findMaxAverage([1,12,-5,-6,50,3], 4)); // Expected: 12.75
console.log("Test 2: [5], k=1", findMaxAverage([5], 1)); // Expected: 5
console.log("Test 3: [0,4,0,3,2], k=1", findMaxAverage([0,4,0,3,2], 1)); // Expected: 4
console.log("Test 4: [1,2,3,4,5], k=2", findMaxAverage([1,2,3,4,5], 2)); // Expected: 4.5

// ============================================
//  Explanation
// ============================================
// 
// Algorithm: Sliding Window approach
// 1. Initialize the sum of the first window (first k elements)
// 2. Set maxSum to this initial window sum
// 3. Slide the window by removing the leftmost element and adding the rightmost element
// 4. Update maxSum whenever current window sum is greater
// 5. Return maxSum divided by k to get the average
//
// Time Complexity:  O(n) - single pass through the array
// Space Complexity: O(1) - only using constant extra space
//
// Example: nums = [1,12,-5,-6,50,3], k = 4
// Window [1,12,-5,-6]: sum = 2, avg = 0.5
// Window [12,-5,-6,50]: sum = 51, avg = 12.75
// Window [-5,-6,50,3]: sum = 42, avg = 10.5
// Maximum average is 12.75