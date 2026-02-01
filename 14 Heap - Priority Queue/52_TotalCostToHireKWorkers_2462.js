// ============================================
// 2462. Total Cost to Hire K Workers
// Purpose: Find minimum total cost using Two Heaps
// ============================================
/*
2462. Total Cost to Hire K Workers

You are given a 0-indexed integer array costs where costs[i] is the cost of hiring the ith worker.

You are also given two integers k and candidates. We want to hire exactly k workers
according to the following rules:

- You will run k sessions and hire exactly one worker in each session.
- In each hiring session, choose the worker with the lowest cost from either
  the first candidates workers or the last candidates workers.
  Break the tie by the smallest index.
- If there are fewer than candidates workers remaining, choose the worker
  with the lowest cost among them. Break the tie by the smallest index.
- A worker can only be chosen once.

Return the total cost to hire exactly k workers.

Example 1:
Input: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
Output: 11
Explanation: We hire 3 workers in total. The total cost is initially 0.
- In the first hiring round we choose the worker from [17,12,10,2,7,2,11,20,8].
  The lowest cost is 2, and we break the tie by the smallest index, which is 3.
  The total cost = 0 + 2 = 2.
- In the second hiring round we choose the worker from [17,12,10,7,2,11,20,8].
  The lowest cost is 2 (index 4). The total cost = 2 + 2 = 4.
- In the third hiring round we choose the worker from [17,12,10,7,11,20,8].
  The lowest cost is 7 (index 3). The total cost = 4 + 7 = 11.
The total hiring cost is 11.

Example 2:
Input: costs = [1,2,4,1], k = 3, candidates = 3
Output: 4
Explanation: We hire 3 workers in total. The total cost is initially 0.
- In the first hiring round we choose the worker from [1,2,4,1].
  The lowest cost is 1, and we break the tie by the smallest index, which is 0.
  The total cost = 0 + 1 = 1.
- In the second hiring round we choose the worker from [2,4,1].
  The lowest cost is 1 (index 2). The total cost = 1 + 1 = 2.
- In the third hiring round there are less than three candidates.
  We choose the worker from [2,4]. The lowest cost is 2 (index 0).
  The total cost = 2 + 2 = 4.
The total hiring cost is 4.

Constraints:
- 1 <= costs.length <= 10^5
- 1 <= costs[i] <= 10^5
- 1 <= k, candidates <= costs.length
*/

// ============================================
// Solution - Two Min Heaps Approach
// ============================================

/**
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
var totalCost = function(costs, k, candidates) {
    const n = costs.length;
    
    // Custom comparator: first by cost, then by index for tie-breaking
    const compare = (a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];  // Compare cost
        return a[1] - b[1];  // Compare index for tie-breaking
    };
    
    // Create heap helpers for a given heap array
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
    
    const leftHeap = createHeapOps();   // Heap for first candidates
    const rightHeap = createHeapOps();  // Heap for last candidates
    
    let left = 0;  // Next index to add from the left
    let right = n - 1;  // Next index to add from the right
    
    // Initialize left heap with first 'candidates' workers
    while (left < candidates && left <= right) {
        leftHeap.enqueue([costs[left], left]);
        left++;
    }
    
    // Initialize right heap with last 'candidates' workers
    // Make sure we don't overlap with left heap
    while (right >= n - candidates && right >= left) {
        rightHeap.enqueue([costs[right], right]);
        right--;
    }
    
    let totalCostVal = 0;
    
    for (let i = 0; i < k; i++) {
        // Get minimums from both heaps
        const leftMin = leftHeap.size() > 0 ? leftHeap.peek() : [Infinity, Infinity];
        const rightMin = rightHeap.size() > 0 ? rightHeap.peek() : [Infinity, Infinity];
        
        // Choose the smaller cost (tie-break by smaller index)
        // Left heap workers have smaller indices by construction
        if (leftMin[0] <= rightMin[0]) {
            // Hire from left
            const [cost, idx] = leftHeap.dequeue();
            totalCostVal += cost;
            
            // Add next worker from left if available
            if (left <= right) {
                leftHeap.enqueue([costs[left], left]);
                left++;
            }
        } else {
            // Hire from right
            const [cost, idx] = rightHeap.dequeue();
            totalCostVal += cost;
            
            // Add next worker from right if available
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

// Test Case 1
console.log(totalCost([17,12,10,2,7,2,11,20,8], 3, 4)); // Expected: 11

// Test Case 2
console.log(totalCost([1,2,4,1], 3, 3)); // Expected: 4

// ============================================
// Complexity Analysis
// ============================================
/*
Time Complexity: O((k + candidates) * log(candidates))
- Initial priority queue construction: O(candidates * log(candidates))
- k hiring rounds, each with O(log(candidates)) operations
- Total: O((k + candidates) * log(candidates))

Space Complexity: O(candidates)
- Two priority queues store at most 2 * candidates elements

Key Insight:
1. Use two min priority queues: one for the first 'candidates' workers (left),
   one for the last 'candidates' workers (right)
2. In each round, compare the minimums from both priority queues
3. Hire the worker with the lowest cost (prefer left for ties)
4. When a worker is hired, add the next available worker from that side
5. Pointers track which workers can be added next
*/