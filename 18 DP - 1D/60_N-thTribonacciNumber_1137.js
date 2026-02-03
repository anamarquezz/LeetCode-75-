/**
 * 1137. N-th Tribonacci Number
 * https://leetcode.com/problems/n-th-tribonacci-number/
 * 
 * The Tribonacci sequence Tn is defined as follows:
 * T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.
 * 
 * Given n, return the value of Tn.
 * 
 * @example
 * Input: n = 4
 * Output: 4
 * Explanation:
 * T_3 = 0 + 1 + 1 = 2
 * T_4 = 1 + 1 + 2 = 4
 * 
 * @example
 * Input: n = 25
 * Output: 1389537
 * 
 * Constraints:
 * - 0 <= n <= 37
 * - The answer is guaranteed to fit within a 32-bit integer (answer <= 2^31 - 1)
 */

/**
 * Dynamic Programming Approach (Space Optimized)
 * 
 * Instead of storing all values, we only keep track of the last 3 numbers
 * since Tn only depends on Tn-1, Tn-2, and Tn-3.
 * 
 * Time Complexity: O(n) - Single pass through n iterations
 * Space Complexity: O(1) - Only storing 3 variables
 * 
 * @param {number} n - The index of the Tribonacci number to find
 * @return {number} - The n-th Tribonacci number
 */
var tribonacci = function(n) {
    // Base cases
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    
    // Initialize the first three values
    let t0 = 0;
    let t1 = 1;
    let t2 = 1;
    
    // Calculate Tribonacci iteratively
    for (let i = 3; i <= n; i++) {
        const t3 = t0 + t1 + t2;
        // Shift values for next iteration
        t0 = t1;
        t1 = t2;
        t2 = t3;
    }
    
    return t2;
};