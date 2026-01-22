//  ============================================
//  Unique Number of Occurrences
// Purpose: Check if each value's frequency is unique
//  ============================================
/*
Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.

Example 1:
Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.

Example 2:
Input: arr = [1,2]
Output: false

Example 3:
Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true

Constraints:
1 <= arr.length <= 1000
-1000 <= arr[i] <= 1000
*/

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
  // Step 1: Count occurrences with a map
  const counts = new Map();
  for (const value of arr) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  // Step 2: Track seen frequencies with a set
  const seen = new Set();

  // Step 3: If any frequency repeats, return false
  for (const freq of counts.values()) {
    if (seen.has(freq)) return false;
    seen.add(freq);
  }

  // Step 4: All frequencies are unique
  return true;
};

//  ============================================
//  Test Cases
//  ============================================

console.log("Test 1: [1,2,2,1,1,3]", uniqueOccurrences([1,2,2,1,1,3])); // Expected: true
console.log("Test 2: [1,2]", uniqueOccurrences([1,2])); // Expected: false
console.log("Test 3: [-3,0,1,-3,1,1,1,-3,10,0]", uniqueOccurrences([-3,0,1,-3,1,1,1,-3,10,0])); // Expected: true

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Hash Map / Set
// 1. Count each number's frequency using a map
// 2. Insert each frequency into a set
// 3. If a frequency already exists in the set, return false
// 4. Otherwise all frequencies are unique
//
// Time Complexity:  O(n) - one pass to count and one to check
// Space Complexity: O(n) - map and set storage