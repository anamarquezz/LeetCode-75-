// ============================================
// Can Place Flowers
// Purpose: Determine if n flowers can be planted
// ⭐ ============================================
/*
You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

 

Example 1:

Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
Example 2:

Input: flowerbed = [1,0,0,0,1], n = 2
Output: false
 

Constraints:

1 <= flowerbed.length <= 2 * 104
flowerbed[i] is 0 or 1.
There are no two adjacent flowers in flowerbed.
0 <= n <= flowerbed.length
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {  
    for(let f = 0; f < flowerbed.length && n > 0; f++){
        if(flowerbed[f] === 0 && flowerbed[f-1] !== 1 && flowerbed[f+1] !== 1) {
            flowerbed[f] = 1; //plant flower
            n--;
        }
    }
    return n === 0;
}

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", canPlaceFlowers([1,0,0,0,1], 1)); // Expected: true
console.log("Test 2:", canPlaceFlowers([1,0,0,0,1], 2)); // Expected: false
console.log("Test 3:", canPlaceFlowers([0,0,1,0,0], 1)); // Expected: true

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Single-pass greedy approach
// 1. Iterate through each plot in the flowerbed
// 2. Check if current plot is empty (0) AND left neighbor is not flower AND right neighbor is not flower
// 3. If conditions are met, plant a flower (set to 1) and decrement n
// 4. Continue until n reaches 0 or end of flowerbed
// 5. Return true if n === 0 (all flowers planted), false otherwise
//
// Time Complexity:  O(n) where n = flowerbed.length
// Space Complexity: O(1) - modifies input array in place
//
// Example: flowerbed = [1,0,0,0,1], n = 1
// f=0: flowerbed[0]=1 (already planted, skip)
// f=1: flowerbed[1]=0, left=1, right=0 (can't plant, adjacent to flower)
// f=2: flowerbed[2]=0, left=0, right=0 (plant here!) flowerbed=[1,0,1,0,1], n=0
// Result: n === 0 = true
