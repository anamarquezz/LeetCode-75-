// ============================================
// 215. Kth Largest Element in an Array
// Purpose: Find kth largest element using Heap/Priority Queue
// ============================================
/*
215. Kth Largest Element in an Array

Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Constraints:
- 1 <= k <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
*/

// ============================================
// Solution - Min Heap Approach
// ============================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    // Min heap to store k largest elements
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
    
    // Process all numbers
    for (const num of nums) {
        enqueue(num);
        
        // Keep only k largest elements
        if (heap.length > k) {
            dequeue();
        }
    }
    
    // The top of min heap is the kth largest
    return heap[0];
};

// ============================================
// Test Cases
// ============================================

// Test Case 1
console.log(findKthLargest([3,2,1,5,6,4], 2)); // Expected: 5

// Test Case 2
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // Expected: 4

// ============================================
// Complexity Analysis
// ============================================
/*
Time Complexity: O(n log k)
- We process n elements, each enqueue/dequeue operation is O(log k)
- Priority Queue maintains at most k elements

Space Complexity: O(k)
- Priority Queue stores at most k elements

Key Insight:
- Use a min priority queue of size k
- The smallest element in the queue is the kth largest overall
- By removing smaller elements as we go, we keep only the k largest
*/