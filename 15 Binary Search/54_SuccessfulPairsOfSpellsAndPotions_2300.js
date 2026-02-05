// ============================================
// Successful Pairs of Spells and Potions
// Purpose: Count successful pairs using binary search
// ⭐ ============================================
/*
You are given two arrays spells and potions. A pair is successful if
spell * potion >= success.

Return an array where pairs[i] is the number of potions that can pair with spells[i].

Example 1:
Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]

Example 2:
Input: spells = [3,1,2], potions = [8,5,8], success = 16
Output: [2,0,2]

Constraints:
1 <= n, m <= 10^5
1 <= spells[i], potions[i] <= 10^5
1 <= success <= 10^10
*/

// ============================================
// Solution Function
// ============================================

var successfulPairs = function(spells, potions, success) {
    potions.sort((a, b) => a - b);
    const m = potions.length;
    const result = [];

    for (const spell of spells) {
        const minPotion = Math.ceil(success / spell);
        let left = 0;
        let right = m;

        while (left < right) {
            const mid = Math.floor(left + (right - left) / 2);
            if (potions[mid] >= minPotion) right = mid;
            else left = mid + 1;
        }

        result.push(m - left);
    }

    return result;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", successfulPairs([5,1,3], [1,2,3,4,5], 7)); // Expected: [4,0,3]
console.log("Test 2:", successfulPairs([3,1,2], [8,5,8], 16)); // Expected: [2,0,2]

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Sort + binary search
// 1. Sort potions.
// 2. For each spell, find first potion with potion >= success / spell.
// 3. Count from that index to the end.
//
// Time Complexity:  O(m log m + n log m)
// Space Complexity: O(1) excluding output
