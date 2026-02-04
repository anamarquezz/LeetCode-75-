// ============================================
// Koko Eating Bananas
// Purpose: Find minimum eating speed
// ⭐ ============================================
/*
Koko can choose an eating speed k. Each hour she eats k bananas from one pile.
If the pile has fewer than k bananas, she eats the entire pile.

Return the minimum k such that Koko can finish within h hours.

Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:
Input: piles = [30,11,23,4,20], h = 5
Output: 30

Constraints:
1 <= piles.length <= 10^4
piles.length <= h <= 10^9
1 <= piles[i] <= 10^9
*/

// ============================================
// Solution Function
// ============================================

var minEatingSpeed = function(piles, h) {
    const hoursNeeded = (speed) => {
        let hours = 0;
        for (const pile of piles) {
            hours += Math.ceil(pile / speed);
        }
        return hours;
    };

    let left = 1;
    let right = Math.max(...piles);

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (hoursNeeded(mid) <= h) right = mid;
        else left = mid + 1;
    }

    return left;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", minEatingSpeed([3,6,7,11], 8)); // Expected: 4
console.log("Test 2:", minEatingSpeed([30,11,23,4,20], 5)); // Expected: 30
console.log("Test 3:", minEatingSpeed([30,11,23,4,20], 6)); // Expected: 23

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Binary search on speed
// 1. Speed k is between 1 and max(piles).
// 2. Check if a candidate speed finishes within h hours.
// 3. Narrow down to the minimum valid speed.
//
// Time Complexity:  O(n log(max(piles)))
// Space Complexity: O(1)