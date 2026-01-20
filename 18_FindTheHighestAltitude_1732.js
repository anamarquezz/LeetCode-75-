// ============================================
// Find the Highest Altitude
// Purpose: Find the highest altitude reached during the trip
// ============================================
/*
There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.

You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i and i + 1 for all (0 <= i < n). Return the highest altitude of a point.

Example 1:
Input: gain = [-5,1,5,0,-7]
Output: 1
Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.

Example 2:
Input: gain = [-4,-3,-2,-1,4,3,2]
Output: 0
Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.

Constraints:
n == gain.length
1 <= n <= 100
-100 <= gain[i] <= 100
*/

// ============================================
// Solution Function
// ============================================
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    let altitude = 0;
    let maxAltitude = 0;
    
    for (let i = 0; i < gain.length; i++) {
        altitude += gain[i];
        maxAltitude = Math.max(maxAltitude, altitude);
    }
    
    return maxAltitude;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1: [-5,1,5,0,-7]", largestAltitude([-5,1,5,0,-7])); // Expected: 1
console.log("Test 2: [-4,-3,-2,-1,4,3,2]", largestAltitude([-4,-3,-2,-1,4,3,2])); // Expected: 0
console.log("Test 3: [5,1,5,0,-7]", largestAltitude([5,1,5,0,-7])); // Expected: 11
console.log("Test 4: [-2,-3,-2]", largestAltitude([-2,-3,-2])); // Expected: 0

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Single pass with running sum
// 1. Start with altitude = 0 (starting point) and maxAltitude = 0
// 2. Iterate through each gain value
// 3. Add gain to current altitude to get new altitude
// 4. Track the maximum altitude seen so far
// 5. Return the maximum altitude
//
// Time Complexity:  O(n) where n = gain.length (single pass)
// Space Complexity: O(1) - only using two variables
//
// Example: gain = [-5,1,5,0,-7]
// Start: altitude = 0, maxAltitude = 0
// i=0: altitude = 0 + (-5) = -5, maxAltitude = 0
// i=1: altitude = -5 + 1 = -4, maxAltitude = 0
// i=2: altitude = -4 + 5 = 1, maxAltitude = 1
// i=3: altitude = 1 + 0 = 1, maxAltitude = 1
// i=4: altitude = 1 + (-7) = -6, maxAltitude = 1
// Return 1