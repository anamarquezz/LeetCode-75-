//  ============================================
//  Reverse Linked List
// Purpose: Reverse a list in-place using pointers
//  ============================================
/*
Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
The number of nodes in the list is in the range [0, 5000].
-5000 <= Node.val <= 5000
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
var reverseList = function(head) {
  let prev = null;
  let current = head;

  while (current) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  return prev;
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

console.log("Test 1:", listToArray(reverseList(buildList([1,2,3,4,5])))); // Expected: [5,4,3,2,1]
console.log("Test 2:", listToArray(reverseList(buildList([1,2])))); // Expected: [2,1]
console.log("Test 3:", listToArray(reverseList(buildList([])))); // Expected: []

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Iterative Pointer Reversal
// 1. Walk the list with a current pointer.
// 2. For each node, save next, point current.next to prev, then advance both pointers.
// 3. When current is null, prev is the new head of the reversed list.
//
// Why it works:
// - Each link is reversed exactly once while preserving access to the remainder via nextNode.
// - The invariant is that prev always points to the reversed prefix.
//
// Time Complexity:  O(n) - one pass
// Space Complexity: O(1) - constant pointers

