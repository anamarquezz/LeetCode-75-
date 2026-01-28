//  ============================================
//  Find the Difference of Two Arrays
// Purpose: Return distinct values unique to each array using sets
//  ============================================
/*
Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
Note that the integers in the lists may be returned in any order.

Example 1:
Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation:
For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3].
For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums1. Therefore, answer[1] = [4,6].

Example 2:
Input: nums1 = [1,2,3,3], nums2 = [1,1,2,2]
Output: [[3],[]]
Explanation:
For nums1, nums1[2] and nums1[3] are not present in nums2. Since nums1[2] == nums1[3], their value is only included once and answer[0] = [3].
Every integer in nums2 is present in nums1. Therefore, answer[1] = [].

Constraints:
1 <= nums1.length, nums2.length <= 1000
-1000 <= nums1[i], nums2[i] <= 1000
*/

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
  // Step 1: Build a set for nums1
  const set1 = new Set(nums1);
  // Step 2: Build a set for nums2
  const set2 = new Set(nums2);

  // Step 3: Collect values in set1 not in set2
  const onlyIn1 = [];
  for (const value of set1) {
    if (!set2.has(value)) onlyIn1.push(value);
  }

  // Step 4: Collect values in set2 not in set1
  const onlyIn2 = [];
  for (const value of set2) {
    if (!set1.has(value)) onlyIn2.push(value);
  }

  // Step 5: Return both lists
  return [onlyIn1, onlyIn2];
};

//  ============================================
//  Test Cases
//  ============================================

console.log("Test 1: [1,2,3] vs [2,4,6]", findDifference([1,2,3], [2,4,6])); // Expected: [[1,3],[4,6]]
console.log("Test 2: [1,2,3,3] vs [1,1,2,2]", findDifference([1,2,3,3], [1,1,2,2])); // Expected: [[3],[]]
console.log("Test 3: [0,-1,2] vs [2,3,0]", findDifference([0,-1,2], [2,3,0])); // Expected: [[-1],[3]]

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Hash Map / Set
// 1. Put nums1 values into a set (set1)
// 2. Put nums2 values into a set (set2)
// 3. Iterate set1 and collect values not in set2
// 4. Iterate set2 and collect values not in set1
// 5. Return the two result arrays
//
// Time Complexity:  O(n + m) - building and scanning both sets
// Space Complexity: O(n + m) - sets and output arrays