/**
 * 2300. Successful Pairs of Spells and Potions
 * https://leetcode.com/problems/successful-pairs-of-spells-and-potions/
 * 
 * You are given two positive integer arrays spells and potions, of length n and m 
 * respectively, where spells[i] represents the strength of the ith spell and 
 * potions[j] represents the strength of the jth potion.
 * 
 * You are also given an integer success. A spell and potion pair is considered 
 * successful if the product of their strengths is at least success.
 * 
 * Return an integer array pairs of length n where pairs[i] is the number of 
 * potions that will form a successful pair with the ith spell.
 * 
 * @example
 * Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
 * Output: [4,0,3]
 * Explanation:
 * - 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
 * - 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
 * - 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
 * 
 * @example
 * Input: spells = [3,1,2], potions = [8,5,8], success = 16
 * Output: [2,0,2]
 * 
 * Constraints:
 * - n == spells.length
 * - m == potions.length
 * - 1 <= n, m <= 10^5
 * - 1 <= spells[i], potions[i] <= 10^5
 * - 1 <= success <= 10^10
 */

/**
 * Binary Search Approach
 * 
 * Strategy:
 * 1. Sort the potions array
 * 2. For each spell, binary search to find the minimum potion needed for success
 * 3. All potions from that index to the end form successful pairs
 * 
 * Time Complexity: O(m log m + n log m) - Sort potions + binary search for each spell
 * Space Complexity: O(1) - Only using constant extra space (excluding output)
 * 
 * @param {number[]} spells - Array of spell strengths
 * @param {number[]} potions - Array of potion strengths
 * @param {number} success - Minimum product required for success
 * @return {number[]} - Number of successful pairs for each spell
 */
var successfulPairs = function(spells, potions, success) {
    // Sort potions in ascending order
    potions.sort((a, b) => a - b);
    
    const m = potions.length;
    const result = [];
    
    for (const spell of spells) {
        // Find minimum potion strength needed: potion >= success / spell
        const minPotion = Math.ceil(success / spell);
        
        // Binary search for the first potion >= minPotion
        let left = 0;
        let right = m;
        
        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            
            if (potions[mid] >= minPotion) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        // All potions from index 'left' to end are successful
        result.push(m - left);
    }
    
    return result;
};
