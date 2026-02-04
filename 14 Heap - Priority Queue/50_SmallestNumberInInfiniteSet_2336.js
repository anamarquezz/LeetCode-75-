// ============================================
// Smallest Number in Infinite Set
// Purpose: Support popSmallest and addBack
// ⭐ ============================================
/*
You have an infinite set of all positive integers [1, 2, 3, ...].
Implement:
- popSmallest(): remove and return the smallest number.
- addBack(num): add num back if missing.

Example:
Input:
["SmallestInfiniteSet","addBack","popSmallest","popSmallest","popSmallest","addBack","popSmallest","popSmallest","popSmallest"]
[[],[2],[],[],[],[1],[],[],[]]
Output:
[null,null,1,2,3,null,1,4,5]

Constraints:
1 <= num <= 1000
At most 1000 calls total.
*/

// ============================================
// Solution Function
// ============================================

var SmallestInfiniteSet = function() {
    this.currentSmallest = 1;
    this.heap = [];
    this.addedBackSet = new Set();

    this.bubbleUp = (index) => {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[index]) break;
            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
            index = parentIdx;
        }
    };

    this.bubbleDown = (index) => {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) break;

            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    };

    this.enqueue = (val) => {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    };

    this.dequeue = () => {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    };
};

SmallestInfiniteSet.prototype.popSmallest = function() {
    if (this.heap.length > 0 && this.heap[0] < this.currentSmallest) {
        const smallest = this.dequeue();
        this.addedBackSet.delete(smallest);
        return smallest;
    }
    return this.currentSmallest++;
};

SmallestInfiniteSet.prototype.addBack = function(num) {
    if (num < this.currentSmallest && !this.addedBackSet.has(num)) {
        this.enqueue(num);
        this.addedBackSet.add(num);
    }
};

// ============================================
// Test Cases
// ============================================

const smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);
console.log("Test 1:", smallestInfiniteSet.popSmallest()); // Expected: 1
console.log("Test 2:", smallestInfiniteSet.popSmallest()); // Expected: 2
console.log("Test 3:", smallestInfiniteSet.popSmallest()); // Expected: 3
smallestInfiniteSet.addBack(1);
console.log("Test 4:", smallestInfiniteSet.popSmallest()); // Expected: 1

// ============================================
//  Explanation
// ============================================
//
// Algorithm: Boundary + min heap
// 1. currentSmallest tracks the next unseen number.
// 2. Numbers added back are stored in a min heap.
// 3. popSmallest returns the heap top if smaller than currentSmallest.
//
// Time Complexity:  O(log n) for heap ops
// Space Complexity: O(n)
