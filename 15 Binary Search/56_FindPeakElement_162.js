/**
 * 162. Find Peak Element
 * https://leetcode.com/problems/find-peak-element/
 * 
 * A peak element is an element that is strictly greater than its neighbors.
 * 
 * Given a 0-indexed integer array nums, find a peak element, and return its index.
 * If the array contains multiple peaks, return the index to any of the peaks.
 * 
 * You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is 
 * always considered to be strictly greater than a neighbor that is outside the array.
 * 
 * You must write an algorithm that runs in O(log n) time.
 * 
 * @example
 * Input: nums = [1,2,3,1]
 * Output: 2
 * Explanation: 3 is a peak element and your function should return index 2.
 * 
 * @example
 * Input: nums = [1,2,1,3,5,6,4]
 * Output: 5
 * Explanation: Your function can return either index 1 (peak 2) or index 5 (peak 6).
 * 
 * Constraints:
 * - 1 <= nums.length <= 1000
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - nums[i] != nums[i + 1] for all valid i
 */

/**
 * Binary Search Approach
 * 
 * Key insight: Since nums[-1] = nums[n] = -∞, a peak must always exist.
 * If nums[mid] < nums[mid + 1], there's a peak on the right side.
 * If nums[mid] > nums[mid + 1], there's a peak on the left side (including mid).
 * 
 * Time Complexity: O(log n) - Binary search halves the search space each iteration
 * Space Complexity: O(1) - Only using constant extra space
 * 
 * @param {number[]} nums - Array of integers
 * @return {number} - Index of any peak element
 */
var findPeakElement = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (nums[mid] < nums[mid + 1]) {
            // Peak is on the right side (ascending slope)
            left = mid + 1;
        } else {
            // Peak is on the left side or at mid (descending slope)
            right = mid;
        }
    }
    
    // left == right, pointing to a peak
    return left;
};