// ============================================
// Kth Largest Element in an Array
// Purpose: Find the kth largest using a min heap
// ⭐ ============================================
/*
Given an integer array nums and an integer k, return the kth largest element.
It is the kth largest in sorted order, not the kth distinct element.

Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Constraints:
1 <= k <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
*/

// ============================================
// Solution Function
// ============================================

var findKthLargest = function(nums, k) {
    const heap = [];

    const bubbleUp = (index) => {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (heap[parentIdx] <= heap[index]) break;
            [heap[parentIdx], heap[index]] = [heap[index], heap[parentIdx]];
            index = parentIdx;
        }
    };

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

    const enqueue = (val) => {
        heap.push(val);
        bubbleUp(heap.length - 1);
    };

    const dequeue = () => {
        if (heap.length === 0) return undefined;
        if (heap.length === 1) return heap.pop();
        const top = heap[0];
        heap[0] = heap.pop();
        bubbleDown(0);
        return top;
    };

    for (const num of nums) {
        enqueue(num);
        if (heap.length > k) dequeue();
    }

    return heap[0];
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", findKthLargest([3,2,1,5,6,4], 2)); // Expected: 5
console.log("Test 2:", findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // Expected: 4

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Min heap of size k
// 1. Push each number into a min heap.
// 2. If heap size exceeds k, remove the smallest.
// 3. Heap top is the kth largest.
//
// Time Complexity:  O(n log k)
// Space Complexity: O(k)