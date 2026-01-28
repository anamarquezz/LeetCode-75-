//  ============================================
//  Odd Even Linked List
// Purpose: Reorder nodes by odd/even indices in-place
//  ============================================
/*
Given the head of a singly linked list, group all the nodes with odd indices together followed
by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.
Note that the relative order inside both the even and odd groups should remain as it was.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.

Example 1:
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]

Example 2:
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]

Constraints:
The number of nodes in the linked list is in the range [0, 10^4].
-10^6 <= Node.val <= 10^6
*/

//  ============================================
//  Solution Function
//  ============================================

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if (!head || !head.next) return head;

  let odd = head;
  let even = head.next;
  const evenHead = even;

  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;
  return head;
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

function listToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

//  ============================================
//  Test Cases
//  ============================================

console.log("Test 1:", listToArray(oddEvenList(buildList([1,2,3,4,5])))); // Expected: [1,3,5,2,4]
console.log("Test 2:", listToArray(oddEvenList(buildList([2,1,3,5,6,4,7])))); // Expected: [2,3,6,7,1,5,4]
console.log("Test 3:", listToArray(oddEvenList(buildList([])))); // Expected: []

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Linked List Pointers
// 1. Maintain two chains: odd (1st, 3rd, 5th...) and even (2nd, 4th, 6th...).
// 2. Rewire pointers in-place so odd.next jumps to the next odd node,
//    and even.next jumps to the next even node.
// 3. After traversal, connect the tail of the odd chain to the head of the even chain.
//
// Why it works:
// - Nodes are visited in original order, so relative order inside odd/even groups is preserved.
// - All pointer moves are local and don't allocate new nodes.
//
// Time Complexity:  O(n) - each node visited once
// Space Complexity: O(1) - no extra data structures