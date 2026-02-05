// ============================================
// Guess Number Higher or Lower
// Purpose: Find the picked number via binary search
// ⭐ ============================================
/*
I pick a number from 1 to n. You have to guess which number I picked.
You call a pre-defined API guess(num), which returns:
-1 if num > pick, 1 if num < pick, 0 if num == pick.

Return the number that I picked.

Example 1:
Input: n = 10, pick = 6
Output: 6

Example 2:
Input: n = 1, pick = 1
Output: 1

Constraints:
1 <= n <= 2^31 - 1
1 <= pick <= n
*/

// ============================================
// Solution Function
// ============================================

// var guess = function(num) {} // Provided by LeetCode

var guessNumber = function(n) {
    let left = 1;
    let right = n;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const result = guess(mid);

        if (result === 0) return mid;
        if (result === -1) right = mid - 1;
        else left = mid + 1;
    }

    return -1;
};

// ============================================
// Test Cases
// ============================================

const pick = 6;
var guess = function(num) {
    if (num > pick) return -1;
    if (num < pick) return 1;
    return 0;
};

console.log("Test 1:", guessNumber(10)); // Expected: 6

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Binary search
// 1. Search in [1, n].
// 2. Use guess(mid) to decide the side.
// 3. Continue until result is 0.
//
// Time Complexity:  O(log n)
// Space Complexity: O(1)