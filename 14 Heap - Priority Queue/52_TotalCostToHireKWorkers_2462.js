// ============================================
// Total Cost to Hire K Workers
// Purpose: Pick minimum cost using two heaps
// ⭐ ============================================
/*
You are given costs and must hire k workers. In each round, choose the lowest
cost from the first candidates or last candidates workers.

Example 1:
Input: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
Output: 11

Example 2:
Input: costs = [1,2,4,1], k = 3, candidates = 3
Output: 4

Constraints:
1 <= costs.length <= 10^5
1 <= costs[i] <= 10^5
1 <= k, candidates <= costs.length
*/

// ============================================
// Solution Function
// ============================================

var totalCost = function(costs, k, candidates) {
    const n = costs.length;

    const compare = (a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    };

    const createHeapOps = () => {
        const heap = [];

        const bubbleUp = (index) => {
            while (index > 0) {
                const parentIdx = Math.floor((index - 1) / 2);
                if (compare(heap[parentIdx], heap[index]) <= 0) break;
                [heap[parentIdx], heap[index]] = [heap[index], heap[parentIdx]];
                index = parentIdx;
            }
        };

        const bubbleDown = (index) => {
            while (true) {
                let smallest = index;
                const left = 2 * index + 1;
                const right = 2 * index + 2;

                if (left < heap.length && compare(heap[left], heap[smallest]) < 0) {
                    smallest = left;
                }
                if (right < heap.length && compare(heap[right], heap[smallest]) < 0) {
                    smallest = right;
                }
                if (smallest === index) break;

                [heap[smallest], heap[index]] = [heap[index], heap[smallest]];
                index = smallest;
            }
        };

        return {
            heap,
            enqueue: (val) => {
                heap.push(val);
                bubbleUp(heap.length - 1);
            },
            dequeue: () => {
                if (heap.length === 0) return undefined;
                if (heap.length === 1) return heap.pop();
                const top = heap[0];
                heap[0] = heap.pop();
                bubbleDown(0);
                return top;
            },
            peek: () => heap[0],
            size: () => heap.length
        };
    };

    const leftHeap = createHeapOps();
    const rightHeap = createHeapOps();
    let left = 0;
    let right = n - 1;

    while (left < candidates && left <= right) {
        leftHeap.enqueue([costs[left], left]);
        left++;
    }

    while (right >= n - candidates && right >= left) {
        rightHeap.enqueue([costs[right], right]);
        right--;
    }

    let totalCostVal = 0;

    for (let i = 0; i < k; i++) {
        const leftMin = leftHeap.size() > 0 ? leftHeap.peek() : [Infinity, Infinity];
        const rightMin = rightHeap.size() > 0 ? rightHeap.peek() : [Infinity, Infinity];

        if (leftMin[0] <= rightMin[0]) {
            const [cost] = leftHeap.dequeue();
            totalCostVal += cost;
            if (left <= right) {
                leftHeap.enqueue([costs[left], left]);
                left++;
            }
        } else {
            const [cost] = rightHeap.dequeue();
            totalCostVal += cost;
            if (left <= right) {
                rightHeap.enqueue([costs[right], right]);
                right--;
            }
        }
    }

    return totalCostVal;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1:", totalCost([17,12,10,2,7,2,11,20,8], 3, 4)); // Expected: 11
console.log("Test 2:", totalCost([1,2,4,1], 3, 3)); // Expected: 4

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Two min heaps
// 1. Maintain left candidates and right candidates in separate heaps.
// 2. Each round, take the smaller top (tie by index).
// 3. Refill from the side chosen.
//
// Time Complexity:  O((k + candidates) * log(candidates))
// Space Complexity: O(candidates)