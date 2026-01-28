// ============================================
// Max Number of K-Sum Pairs
// Purpose: Find maximum pairs that sum to k
// ⭐ ============================================
/*
You are given an integer array nums and an integer k.

In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.

Return the maximum number of operations you can perform on the array.

 

Example 1:

Input: nums = [1,2,3,4], k = 5
Output: 2
Explanation: Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.
Example 2:

Input: nums = [3,1,3,4,3], k = 6
Output: 1
Explanation: Starting with nums = [3,1,3,4,3]:
- Remove the first two 3's, then nums = [1,4,3]
There are no more pairs that sum up to 6, hence a total of 1 operation.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
1 <= k <= 109
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function(nums, k) {
    // how many of each number are available for pairing
    const availableCounts = new Map();
    let totalOperations = 0;

    for (let currentNumber of nums) {
        // Calculate what number we need to pair with currentNumber to sum to k
        const neededNumber = k - currentNumber;

        // Check if we have any of the needed number available
        const availableNeeded = availableCounts.get(neededNumber) || 0;
        if (availableNeeded > 0) {
            // Found a match! Create a pair
            totalOperations++;

            // Use up one instance of the needed number
            availableCounts.set(neededNumber, availableNeeded - 1);
        } else {
            // No match yet, add current number to available pool
            const currentAvailable = availableCounts.get(currentNumber) || 0;
            availableCounts.set(currentNumber, currentAvailable + 1);
        }
    }

    return totalOperations;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1: [1,2,3,4], k=5", maxOperations([1,2,3,4], 5)); // Expected: 2
console.log("Test 2: [3,1,3,4,3], k=6", maxOperations([3,1,3,4,3], 6)); // Expected: 1
console.log("Test 3: [2,2,2,3], k=4", maxOperations([2,2,2,3], 4)); // Expected: 1
console.log("Test 4: [1,1,1,1], k=2", maxOperations([1,1,1,1], 2)); // Expected: 2

// ============================================
//  Explanation
// ============================================
// 
// Algorithm: Hash Map approach with single pass
// 1. Create a Map to track available numbers for pairing
// 2. Iterate through each number in nums
// 3. For each number, calculate the complement needed to sum to k
// 4. If complement is available, we found a pair - increment operation count and remove from map
// 5. If complement not available, add current number to available pool
// 6. Return total number of operations performed
//
// Time Complexity:  O(n) - single pass through the array
// Space Complexity: O(n) - Map can store at most n/2 unique numbers
//
// Example: nums = [1,2,3,4], k = 5
// currentNumber=1: neededNumber=4, not available → add 1 to map
// currentNumber=2: neededNumber=3, not available → add 2 to map
// currentNumber=3: neededNumber=2, available! → totalOperations=1, remove 2
// currentNumber=4: neededNumber=1, available! → totalOperations=2, remove 1
// Return 2

