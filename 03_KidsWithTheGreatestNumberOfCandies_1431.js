// ⭐ ============================================
// 📝 Kids With the Greatest Number of Candies
// Purpose: Find which kids will have greatest candies after getting extras
// ⭐ ============================================
/*
There are n kids with candies. You are given an integer array candies, where each candies[i] represents the number of candies the ith kid has, and an integer extraCandies, denoting the number of extra candies that you have.

Return a boolean array result of length n, where result[i] is true if, after giving the ith kid all the extraCandies, they will have the greatest number of candies among all the kids, or false otherwise.

Note that multiple kids can have the greatest number of candies.

Example 1:
Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true]

Example 2:
Input: candies = [4,2,1,1,2], extraCandies = 1
Output: [true,false,false,false,false]

Example 3:
Input: candies = [12,1,12], extraCandies = 10
Output: [true,false,true]

Constraints:
n == candies.length
2 <= n <= 100
1 <= candies[i] <= 100
1 <= extraCandies <= 50
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
    const maxCandies = Math.max(...candies);
    return candies.map(candy => candy + extraCandies >= maxCandies);
};

// ⭐ ============================================
// 🧪 Test Cases
// ⭐ ============================================

console.log("Test 1:", kidsWithCandies([2,3,5,1,3], 3)); // Expected: [true,true,true,false,true]
console.log("Test 2:", kidsWithCandies([4,2,1,1,2], 1)); // Expected: [true,false,false,false,false]
console.log("Test 3:", kidsWithCandies([12,1,12], 10)); // Expected: [true,false,true]

// ⭐ ============================================
//  Explanation
// ⭐ ============================================
//
// Algorithm: Find max and compare
// 1. Find the maximum number of candies any kid currently has
// 2. For each kid, check if their candies + extraCandies >= maxCandies
// 3. Return array of booleans indicating if each kid will have max candies
//
// Time Complexity:  O(n) - one pass to find max, one to map
// Space Complexity: O(n) for output array
//
// Example: candies = [2,3,5,1,3], extraCandies = 3
// Max = 5
// Kid 0: 2 + 3 = 5 >= 5 ✓ true
// Kid 1: 3 + 3 = 6 >= 5 ✓ true
// Kid 2: 5 + 3 = 8 >= 5 ✓ true
// Kid 3: 1 + 3 = 4 >= 5 ✗ false
// Kid 4: 3 + 3 = 6 >= 5 ✓ true
// Result: [true,true,true,false,true] ✅