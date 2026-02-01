// ============================================
// 2336. Smallest Number in Infinite Set
// Purpose: Design a data structure to manage an infinite set with Heap
// ============================================
/*
2336. Smallest Number in Infinite Set

You have a set which contains all positive integers [1, 2, 3, 4, 5, ...].

Implement the SmallestInfiniteSet class:
- SmallestInfiniteSet() Initializes the SmallestInfiniteSet object to contain all positive integers.
- int popSmallest() Removes and returns the smallest integer contained in the infinite set.
- void addBack(int num) Adds a positive integer num back into the infinite set,
  if it is not already in the infinite set.

Example 1:
Input
["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
[[], [2], [], [], [], [1], [], [], []]
Output
[null, null, 1, 2, 3, null, 1, 4, 5]

Explanation
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);    // 2 is already in the set, so no change is made.
smallestInfiniteSet.popSmallest(); // return 1, since 1 is the smallest number, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 2, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 3, and remove it from the set.
smallestInfiniteSet.addBack(1);    // 1 is added back to the set.
smallestInfiniteSet.popSmallest(); // return 1, since 1 was added back to the set and
                                   // is the smallest number, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 4, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 5, and remove it from the set.

Constraints:
- 1 <= num <= 1000
- At most 1000 calls will be made in total to popSmallest and addBack.
*/

// ============================================
// Solution - Min Heap + Set Approach
// ============================================

var SmallestInfiniteSet = function() {
    this.currentSmallest = 1;  // Track the smallest number not yet popped from the "infinite" part
    this.heap = [];            // Min heap for numbers added back
    this.addedBackSet = new Set();   // Set to check if a number is in the heap
    
    // Helper: bubble up element at index
    this.bubbleUp = (index) => {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[index]) break;
            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
            index = parentIdx;
        }
    };
    
    // Helper: bubble down element at index
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
    
    // Helper: add element to heap
    this.enqueue = (val) => {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    };
    
    // Helper: remove and return minimum element
    this.dequeue = () => {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    };
};

/**
 * @return {number}
 */
SmallestInfiniteSet.prototype.popSmallest = function() {
    // If there are numbers added back that are smaller than currentSmallest
    if (this.heap.length > 0 && this.heap[0] < this.currentSmallest) {
        const smallest = this.dequeue();
        this.addedBackSet.delete(smallest);
        return smallest;
    }
    
    // Otherwise, return and increment currentSmallest
    return this.currentSmallest++;
};

/**
 * @param {number} num
 * @return {void}
 */
SmallestInfiniteSet.prototype.addBack = function(num) {
    // Only add back if it's smaller than currentSmallest and not already added
    if (num < this.currentSmallest && !this.addedBackSet.has(num)) {
        this.enqueue(num);
        this.addedBackSet.add(num);
    }
};

// ============================================
// Test Cases
// ============================================

const smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);    // 2 is already in the set
console.log(smallestInfiniteSet.popSmallest()); // 1
console.log(smallestInfiniteSet.popSmallest()); // 2
console.log(smallestInfiniteSet.popSmallest()); // 3
smallestInfiniteSet.addBack(1);    // 1 is added back
console.log(smallestInfiniteSet.popSmallest()); // 1
console.log(smallestInfiniteSet.popSmallest()); // 4
console.log(smallestInfiniteSet.popSmallest()); // 5

// ============================================
// Complexity Analysis
// ============================================
/*
Time Complexity:
- popSmallest: O(log n) where n is the number of elements added back
- addBack: O(log n) for priority queue insertion

Space Complexity: O(n)
- Priority queue and set store added back numbers

Key Insight:
- Track the "boundary" of the infinite set with currentSmallest
- Numbers >= currentSmallest are automatically in the set
- Use a priority queue to efficiently track numbers added back below the boundary
- Use a set for O(1) duplicate checking
*/
