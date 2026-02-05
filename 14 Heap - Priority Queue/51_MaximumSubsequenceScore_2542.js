// ============================================
// Maximum Subsequence Score
// Purpose: Maximize sum(nums1) * min(nums2)
// ⭐ ============================================
/*
You are given nums1, nums2, and k. Choose k indices to maximize:
(sum of chosen nums1) * (minimum of chosen nums2).

Example 1:
Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12

Example 2:
Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
Output: 30

Constraints:
1 <= n <= 10^5
0 <= nums1[i], nums2[i] <= 10^5
1 <= k <= n
*/

// ============================================
// Solution Function
// ============================================

var maxScore = function(nums1, nums2, k) {
    const n = nums1.length;
    const pairs = [];
    for (let i = 0; i < n; i++) pairs.push([nums1[i], nums2[i]]);
    pairs.sort((a, b) => b[1] - a[1]);

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

            if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
            if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
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

    let sum = 0;
    let maxScoreVal = 0;

    for (const [num1, num2] of pairs) {
        enqueue(num1);
        sum += num1;
        if (heap.length > k) sum -= dequeue();
        if (heap.length === k) maxScoreVal = Math.max(maxScoreVal, sum * num2);
    }

    return maxScoreVal;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", maxScore([1,3,3,2], [2,1,3,4], 3)); // Expected: 12
console.log("Test 2:", maxScore([4,2,3,1,1], [7,5,10,9,6], 1)); // Expected: 30

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Sort by nums2 desc + min heap for nums1
// 1. Sort pairs by nums2 descending, so current nums2 is the minimum.
// 2. Keep a min heap of the largest k nums1 values.
// 3. Compute score when heap size is k.
//
// Time Complexity:  O(n log n)
// Space Complexity: O(k)
