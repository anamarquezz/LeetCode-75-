// ============================================
// Combination Sum III
// Purpose: Find all k-number combos summing to n
// ⭐ ============================================
/*
Find all valid combinations of k numbers that sum to n such that:
- Only numbers 1 through 9 are used
- Each number is used at most once

Example 1:
Input: k = 3, n = 7
Output: [[1,2,4]]

Example 2:
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]

Example 3:
Input: k = 4, n = 1
Output: []

Constraints:
2 <= k <= 9
1 <= n <= 60
*/

// ============================================
// Solution Function
// ============================================

var combinationSum3 = function(k, n) {
    const result = [];

    const backtrack = (start, remaining, current) => {
        if (current.length === k && remaining === 0) {
            result.push([...current]);
            return;
        }

        if (current.length >= k || remaining <= 0) {
            return;
        }

        for (let num = start; num <= 9; num++) {
            if (num > remaining) break;
            current.push(num);
            backtrack(num + 1, remaining - num, current);
            current.pop();
        }
    };

    backtrack(1, n, []);
    return result;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", combinationSum3(3, 7)); // Expected: [[1,2,4]]
console.log("Test 2:", combinationSum3(3, 9)); // Expected: [[1,2,6],[1,3,5],[2,3,4]]
console.log("Test 3:", combinationSum3(4, 1)); // Expected: []

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Backtracking with pruning
// 1. Build combinations in increasing order to avoid duplicates.
// 2. Track remaining sum and remaining slots.
// 3. Stop early if remaining < 0 or length exceeds k.
//
// Time Complexity:  O(C(9,k) * k)
// Space Complexity: O(k)