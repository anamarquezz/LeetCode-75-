/**
 * 875. Koko Eating Bananas
 * https://leetcode.com/problems/koko-eating-bananas/
 * 
 * Koko loves to eat bananas. There are n piles of bananas, the ith pile has 
 * piles[i] bananas. The guards have gone and will come back in h hours.
 * 
 * Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses 
 * some pile of bananas and eats k bananas from that pile. If the pile has less 
 * than k bananas, she eats all of them instead and will not eat any more bananas 
 * during this hour.
 * 
 * Koko likes to eat slowly but still wants to finish eating all the bananas 
 * before the guards return.
 * 
 * Return the minimum integer k such that she can eat all the bananas within h hours.
 * 
 * @example
 * Input: piles = [3,6,7,11], h = 8
 * Output: 4
 * 
 * @example
 * Input: piles = [30,11,23,4,20], h = 5
 * Output: 30
 * 
 * @example
 * Input: piles = [30,11,23,4,20], h = 6
 * Output: 23
 * 
 * Constraints:
 * - 1 <= piles.length <= 10^4
 * - piles.length <= h <= 10^9
 * - 1 <= piles[i] <= 10^9
 */

/**
 * Binary Search Approach
 * 
 * Strategy:
 * - Binary search on the answer (eating speed k)
 * - Minimum speed = 1, Maximum speed = max(piles)
 * - For each speed, check if Koko can finish within h hours
 * - Find the minimum valid speed
 * 
 * Time Complexity: O(n * log(max(piles))) - Binary search on speed, O(n) to verify each
 * Space Complexity: O(1) - Only using constant extra space
 * 
 * @param {number[]} piles - Array of banana pile sizes
 * @param {number} h - Hours available to eat all bananas
 * @return {number} - Minimum eating speed k
 */
var minEatingSpeed = function(piles, h) {
    /**
     * Helper function to calculate hours needed at speed k
     * @param {number} speed - Eating speed (bananas per hour)
     * @return {number} - Total hours needed
     */
    const hoursNeeded = (speed) => {
        let hours = 0;
        for (const pile of piles) {
            // Ceiling division: Math.ceil(pile / speed)
            hours += Math.ceil(pile / speed);
        }
        return hours;
    };
    
    // Binary search on eating speed
    let left = 1;
    let right = Math.max(...piles);
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (hoursNeeded(mid) <= h) {
            // Can finish in time, try slower speed
            right = mid;
        } else {
            // Too slow, need to eat faster
            left = mid + 1;
        }
    }
    
    return left;
};