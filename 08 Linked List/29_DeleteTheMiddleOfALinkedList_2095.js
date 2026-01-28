//  ============================================
//  Delete the Middle Node of a Linked List
// Purpose: Remove the middle node using two pointers
//  ============================================
/*
You are given the head of a linked list. Delete the middle node, and return the head of the
modified linked list.

The middle node of a linked list of size n is the floor(n / 2)th node from the start using
0-based indexing.

Example 1:
Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]
Explanation: For n = 7, node 3 with value 7 is removed.

Example 2:
Input: head = [1,2,3,4]
Output: [1,2,4]
Explanation: For n = 4, node 2 with value 3 is removed.

Example 3:
Input: head = [2,1]
Output: [2]
Explanation: For n = 2, node 1 with value 1 is removed.

Constraints:
The number of nodes in the list is in the range [1, 10^5].
1 <= Node.val <= 10^5
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
var deleteMiddle = function(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;
  let prev = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = slow.next;
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

console.log("Test 1:", listToArray(deleteMiddle(buildList([1,3,4,7,1,2,6])))); // Expected: [1,3,4,1,2,6]
console.log("Test 2:", listToArray(deleteMiddle(buildList([1,2,3,4])))); // Expected: [1,2,4]
console.log("Test 3:", listToArray(deleteMiddle(buildList([2,1])))); // Expected: [2]

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Two Pointers (Linked List)
// 1. Move fast by 2 and slow by 1; when fast reaches the end, slow is at the middle.
// 2. Keep a prev pointer one step behind slow so we can relink around the middle.
// 3. Skip the middle node by setting prev.next = slow.next and return head.
//
// Why it works:
// - Each fast step covers two nodes while slow covers one, so slow lands at index floor(n/2).
// - prev always trails slow, giving direct access to the node before the middle.
//
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - constant pointers
