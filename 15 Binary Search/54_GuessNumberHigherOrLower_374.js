/**
 * 374. Guess Number Higher or Lower
 * https://leetcode.com/problems/guess-number-higher-or-lower/
 * 
 * We are playing the Guess Game. The game is as follows:
 * I pick a number from 1 to n. You have to guess which number I picked.
 * 
 * Every time you guess wrong, I will tell you whether the number I picked 
 * is higher or lower than your guess.
 * 
 * You call a pre-defined API int guess(int num), which returns:
 *   -1: Your guess is higher than the number I picked (num > pick)
 *    1: Your guess is lower than the number I picked (num < pick)
 *    0: Your guess is equal to the number I picked (num == pick)
 * 
 * Return the number that I picked.
 * 
 * @example
 * Input: n = 10, pick = 6
 * Output: 6
 * 
 * @example
 * Input: n = 1, pick = 1
 * Output: 1
 * 
 * @example
 * Input: n = 2, pick = 1
 * Output: 1
 * 
 * Constraints:
 * - 1 <= n <= 2^31 - 1
 * - 1 <= pick <= n
 */

/**
 * Forward declaration of guess API.
 * @param {number} num - Your guess
 * @return {number} -1 if num > pick, 1 if num < pick, 0 if num == pick
 */
// var guess = function(num) {}

/**
 * Binary Search Approach
 * 
 * Time Complexity: O(log n) - We divide search space in half each iteration
 * Space Complexity: O(1) - Only using constant extra space
 * 
 * @param {number} n - The upper bound of the range [1, n]
 * @return {number} - The picked number
 */
var guessNumber = function(n) {
    let left = 1;
    let right = n;
    
    while (left <= right) {
        // Calculate mid avoiding integer overflow
        const mid = Math.floor(left + (right - left) / 2);
        const result = guess(mid);
        
        if (result === 0) {
            // Found the number!
            return mid;
        } else if (result === -1) {
            // Guess is too high, search lower half
            right = mid - 1;
        } else {
            // Guess is too low, search upper half
            left = mid + 1;
        }
    }
    
    return -1; // Should never reach here if input is valid
};