// ============================================
// 2542. Maximum Subsequence Score
// Purpose: Find maximum score using Heap/Priority Queue
// ============================================
/*
2542. Maximum Subsequence Score

You are given two 0-indexed integer arrays nums1 and nums2 of equal length n
and a positive integer k. You must choose a subsequence of indices from nums1 of length k.

For chosen indices i0, i1, ..., ik-1, your score is defined as:
The sum of the selected elements from nums1 multiplied with the minimum of the selected elements from nums2.
It can be defined simply as: (nums1[i0] + nums1[i1] + ... + nums1[ik-1]) * min(nums2[i0], nums2[i1], ..., nums2[ik-1])

Return the maximum possible score.

A subsequence of indices of an array is a set that can be derived from the set {0, 1, ..., n-1}
by deleting some or no elements.

Example 1:
Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12
Explanation: 
The four possible subsequence scores are:
- We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
- We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6. 
- We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12. 
- We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
Therefore, we return the max score, which is 12.

Example 2:
Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
Output: 30
Explanation: 
Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible score.

Constraints:
- n == nums1.length == nums2.length
- 1 <= n <= 10^5
- 0 <= nums1[i], nums2[j] <= 10^5
- 1 <= k <= n
*/

// ============================================
// Solution - Sort + Min Heap Approach
// ============================================

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function(nums1, nums2, k) {
    const n = nums1.length;
    
    // Create pairs of (nums1[i], nums2[i]) and sort by nums2 in descending order
    // This way, as we iterate, each nums2[i] becomes the potential minimum
    const pairs = [];
    for (let i = 0; i < n; i++) {
        pairs.push([nums1[i], nums2[i]]);
    }
    
    // Sort by nums2 in descending order
    pairs.sort((a, b) => b[1] - a[1]);
    
    // Min heap to maintain k largest nums1 values
    const heap = [];
    
    // Helper: bubble up element at index
    const bubbleUp = (index) => {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (heap[parentIdx] <= heap[index]) break;
            [heap[parentIdx], heap[index]] = [heap[index], heap[parentIdx]];
            index = parentIdx;
        }
    };
    
    // Helper: bubble down element at index
    const bubbleDown = (index) => {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            
            if (left < heap.length && heap[left] < heap[smallest]) {
                smallest = left;
            }
            if (right < heap.length && heap[right] < heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) break;
            
            [heap[smallest], heap[index]] = [heap[index], heap[smallest]];
            index = smallest;
        }
    };
    
    // Helper: add element to heap
    const enqueue = (val) => {
        heap.push(val);
        bubbleUp(heap.length - 1);
    };
    
    // Helper: remove and return minimum element
    const dequeue = () => {
        if (heap.length === 0) return undefined;
        if (heap.length === 1) return heap.pop();
        
        const top = heap[0];
        heap[0] = heap.pop();
        bubbleDown(0);
        return top;
    };
    
    let sum = 0;  // Sum of k largest nums1 values
    let maxScoreVal = 0;
    
    for (const [num1, num2] of pairs) {
        // Add current nums1 value to heap and sum
        enqueue(num1);
        sum += num1;
        
        // If heap has more than k elements, remove the smallest
        if (heap.length > k) {
            sum -= dequeue();
        }
        
        // When we have exactly k elements, calculate score
        // num2 is the minimum because we sorted in descending order
        if (heap.length === k) {
            maxScoreVal = Math.max(maxScoreVal, sum * num2);
        }
    }
    
    return maxScoreVal;
};

// ============================================
// Test Cases
// ============================================

// Test Case 1
console.log(maxScore([1,3,3,2], [2,1,3,4], 3)); // Expected: 12

// Test Case 2
console.log(maxScore([4,2,3,1,1], [7,5,10,9,6], 1)); // Expected: 30

// ============================================
// Complexity Analysis
// ============================================
/*
Time Complexity: O(n log n)
- Sorting takes O(n log n)
- For each of n elements, we do priority queue operations which are O(log k)
- Total: O(n log n + n log k) = O(n log n)

Space Complexity: O(n)
- O(n) for storing pairs
- O(k) for the priority queue

Key Insight:
1. Sort pairs by nums2 in descending order
2. As we iterate, each nums2 value is guaranteed to be the minimum
   among all previously considered elements
3. Use a min priority queue to efficiently maintain k largest nums1 values
4. Score = sum(nums1) * min(nums2), so maximize sum while iterating through possible minimums
*/
