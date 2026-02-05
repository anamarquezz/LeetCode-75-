/**
 * 714. Best Time to Buy and Sell Stock with Transaction Fee
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 * 
 * You are given an array prices where prices[i] is the price of a given stock 
 * on the ith day, and an integer fee representing a transaction fee.
 * 
 * Find the maximum profit you can achieve. You may complete as many transactions 
 * as you like, but you need to pay the transaction fee for each transaction.
 * 
 * Note:
 * - You may not engage in multiple transactions simultaneously 
 *   (i.e., you must sell the stock before you buy again).
 * - The transaction fee is only charged once for each stock purchase and sale.
 * 
 * @example
 * Input: prices = [1,3,2,8,4,9], fee = 2
 * Output: 8
 * Explanation: The maximum profit can be achieved by:
 * - Buying at prices[0] = 1
 * - Selling at prices[3] = 8
 * - Buying at prices[4] = 4
 * - Selling at prices[5] = 9
 * The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
 * 
 * @example
 * Input: prices = [1,3,7,5,10,3], fee = 3
 * Output: 6
 * 
 * Constraints:
 * - 1 <= prices.length <= 5 * 10^4
 * - 1 <= prices[i] < 5 * 10^4
 * - 0 <= fee < 5 * 10^4
 */

/**
 * Dynamic Programming Approach (State Machine)
 * 
 * We track two states for each day:
 * - hold: Maximum profit when holding a stock
 * - cash: Maximum profit when not holding a stock (cash in hand)
 * 
 * Transitions:
 * - hold[i] = max(hold[i-1], cash[i-1] - prices[i])
 *   Either keep holding, or buy today
 * - cash[i] = max(cash[i-1], hold[i-1] + prices[i] - fee)
 *   Either stay in cash, or sell today (pay fee)
 * 
 * Time Complexity: O(n) - Single pass through prices
 * Space Complexity: O(1) - Only storing 2 variables
 * 
 * @param {number[]} prices - Stock prices for each day
 * @param {number} fee - Transaction fee
 * @return {number} - Maximum profit
 */
var maxProfit = function(prices, fee) {
    const n = prices.length;
    
    // Initial states
    // hold: We bought the stock on day 0
    // cash: We don't have any stock
    let hold = -prices[0];
    let cash = 0;
    
    for (let i = 1; i < n; i++) {
        // Calculate new states
        const newHold = Math.max(hold, cash - prices[i]);
        const newCash = Math.max(cash, hold + prices[i] - fee);
        
        hold = newHold;
        cash = newCash;
    }
    
    // Maximum profit is when we don't hold any stock
    return cash;
};

/**
 * Dynamic Programming Approach (2D Array for clarity)
 * 
 * Using explicit 2D array to show the state transitions clearly.
 * dp[i][0] = max profit on day i without holding stock
 * dp[i][1] = max profit on day i while holding stock
 * 
 * Time Complexity: O(n) - Single pass through prices
 * Space Complexity: O(n) - 2D DP table (can be optimized to O(1))
 * 
 * @param {number[]} prices - Stock prices for each day
 * @param {number} fee - Transaction fee
 * @return {number} - Maximum profit
 */
var maxProfitExplicit = function(prices, fee) {
    const n = prices.length;
    
    // dp[i][0] = not holding stock, dp[i][1] = holding stock
    const dp = Array(n).fill(null).map(() => Array(2).fill(0));
    
    // Base case: Day 0
    dp[0][0] = 0;           // Not holding - no profit
    dp[0][1] = -prices[0];  // Holding - we bought at day 0
    
    for (let i = 1; i < n; i++) {
        // Not holding: either stayed without stock, or sold today
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
        // Holding: either kept holding, or bought today
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }
    
    // Return max profit without holding stock
    return dp[n - 1][0];
};
