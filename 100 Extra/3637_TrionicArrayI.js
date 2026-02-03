/**
 * 3637. Trionic Array I
 * https://leetcode.com/problems/trionic-array-i/
 * 
 * You are given an integer array nums of length n.
 * 
 * An array is trionic if there exist indices 0 < p < q < n − 1 such that:
 * - nums[0...p] is strictly increasing
 * - nums[p...q] is strictly decreasing
 * - nums[q...n − 1] is strictly increasing
 * 
 * Return true if nums is trionic, otherwise return false.
 * 
 * @example
 * Input: nums = [1,3,5,4,2,6]
 * Output: true
 * Explanation: Pick p = 2, q = 4:
 * - nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5)
 * - nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2)
 * - nums[4...5] = [2, 6] is strictly increasing (2 < 6)
 * 
 * @example
 * Input: nums = [2,1,3]
 * Output: false
 * Explanation: There is no way to pick p and q to form the required three segments.
 * 
 * Constraints:
 * - 3 <= n <= 100
 * - -1000 <= nums[i] <= 1000
 */

/**
 * State Machine / Linear Scan Approach
 * 
 * Track three phases:
 * 1. Increasing phase (must have at least 2 elements, ending at p)
 * 2. Decreasing phase (must have at least 2 elements, ending at q)
 * 3. Increasing phase again (must have at least 2 elements)
 * 
 * Time Complexity: O(n) - Single pass through the array
 * Space Complexity: O(1) - Only using constant extra space
 * 
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if array is trionic
 */
var isTrionic = function(nums) {
    const n = nums.length;
    if (n < 5) return false; // Need at least 5 elements for valid p and q
    
    let i = 0;
    
    // Phase 1: Strictly increasing (0 to p, need at least 2 elements)
    while (i < n - 1 && nums[i] < nums[i + 1]) {
        i++;
    }
    
    // p must be > 0 (at least 2 elements in first increasing part)
    const p = i;
    if (p === 0 || p >= n - 2) return false;
    
    // Phase 2: Strictly decreasing (p to q, need at least 2 elements)
    while (i < n - 1 && nums[i] > nums[i + 1]) {
        i++;
    }
    
    // q must be > p and < n-1 (at least 2 elements in decreasing part)
    const q = i;
    if (q === p || q >= n - 1) return false;
    
    // Phase 3: Strictly increasing (q to n-1, need at least 2 elements)
    while (i < n - 1 && nums[i] < nums[i + 1]) {
        i++;
    }
    
    // Must reach the end of array
    return i === n - 1;
};