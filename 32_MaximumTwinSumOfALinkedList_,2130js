//  ============================================
//  Maximum Twin Sum of a Linked List
// Purpose: Use linked list reversal to compare twin pairs
//  ============================================
/*
In a linked list of size n, where n is even, the ith node (0-indexed) is the twin of the
(n-1-i)th node for 0 <= i <= (n / 2) - 1. The twin sum is the sum of a node and its twin.

Given the head of a linked list with even length, return the maximum twin sum.

Example 1:
Input: head = [5,4,2,1]
Output: 6

Example 2:
Input: head = [4,2,2,3]
Output: 7

Example 3:
Input: head = [1,100000]
Output: 100001

Constraints:
The number of nodes in the list is an even integer in the range [2, 10^5].
1 <= Node.val <= 10^5
*/

//  ============================================
//  Solution Function
//  ============================================

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
}

/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let secondHalf = reverseList(slow);
  let maxSum = 0;
  let firstHalf = head;

  while (secondHalf) {
    maxSum = Math.max(maxSum, firstHalf.val + secondHalf.val);
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }

  return maxSum;
};

//  ============================================
//  Test Helpers
//  ============================================

function buildList(values) {
  let dummy = new ListNode(0);
  let current = dummy;
  for (const val of values) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

//  ============================================
//  Test Cases
//  ============================================

console.log("Test 1:", pairSum(buildList([5,4,2,1]))); // Expected: 6
console.log("Test 2:", pairSum(buildList([4,2,2,3]))); // Expected: 7
console.log("Test 3:", pairSum(buildList([1,100000]))); // Expected: 100001

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Linked List + Reverse Second Half
// 1. Use fast/slow pointers to find the start of the second half.
// 2. Reverse the second half in-place so twin nodes align in order.
// 3. Walk both halves together and track the maximum sum of paired nodes.
//
// Why it works:
// - Reversing the second half brings node (n-1-i) next to node i in traversal order.
// - Each pair is evaluated exactly once.
//
// Time Complexity:  O(n) - find middle, reverse, and scan
// Space Complexity: O(1) - in-place reversal