// ============================================
// Delete Node in a Binary Search Tree
// Purpose: Delete a node from BST maintaining BST property
// ============================================
/*
450. Delete Node in a BST

Given a root node reference of a BST and a key, delete the node with the given
key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:
1. Search for a node to remove.
2. If the node is found, delete the node.

Example 1:
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]

Example 2:
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]

Example 3:
Input: [], key = 0
Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 10^4].
- -10^5 <= Node.val <= 10^5
- Each node has a unique value.
- root is a valid binary search tree.
- -10^5 <= key <= 10^5
*/

// ============================================
// TreeNode Definition
// ============================================

function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// ============================================
// Solution Function
// ============================================

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    if (root === null) {
        return null;
    }
    
    // Traverse to find the node with the key
    if (key < root.val) {
        // Key is in left subtree
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        // Key is in right subtree
        root.right = deleteNode(root.right, key);
    } else {
        // Found the node to delete
        
        // Case 1: Node has no children (leaf node)
        if (root.left === null && root.right === null) {
            return null;
        }
        
        // Case 2: Node has only right child
        if (root.left === null) {
            return root.right;
        }
        
        // Case 3: Node has only left child
        if (root.right === null) {
            return root.left;
        }
        
        // Case 4: Node has both children
        // Find the minimum value in the right subtree (inorder successor)
        let minRight = root.right;
        while (minRight.left !== null) {
            minRight = minRight.left;
        }
        
        // Copy the value of inorder successor to current node
        root.val = minRight.val;
        
        // Delete the inorder successor
        root.right = deleteNode(root.right, minRight.val);
    }
    
    return root;
};

// ============================================
// Test Helpers
// ============================================

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

function treeToArray(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        if (node === null) {
            result.push(null);
        } else {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    
    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }
    
    return result;
}

// ============================================
// Test Cases
// ============================================

console.log("Test 1 - Delete node with two children:");
let tree1 = buildTree([5, 3, 6, 2, 4, null, 7]);
let result1 = deleteNode(tree1, 3);
console.log("Result:", treeToArray(result1)); // Expected: [5,4,6,2,null,null,7]

console.log("\nTest 2 - Delete node that doesn't exist:");
let tree2 = buildTree([5, 3, 6, 2, 4, null, 7]);
let result2 = deleteNode(tree2, 0);
console.log("Result:", treeToArray(result2)); // Expected: [5,3,6,2,4,null,7]

console.log("\nTest 3 - Delete from empty tree:");
let result3 = deleteNode(null, 0);
console.log("Result:", treeToArray(result3)); // Expected: []

console.log("\nTest 4 - Delete leaf node:");
let tree4 = buildTree([5, 3, 6, 2, 4, null, 7]);
let result4 = deleteNode(tree4, 2);
console.log("Result:", treeToArray(result4)); // Expected: [5,3,6,null,4,null,7]

console.log("\nTest 5 - Delete root node with two children:");
let tree5 = buildTree([5, 3, 6, 2, 4, null, 7]);
let result5 = deleteNode(tree5, 5);
console.log("Result:", treeToArray(result5)); // Expected: [6,3,7,2,4] or [5,3,7,2,4]

// ============================================
// Explanation
// ============================================
//
// Time Complexity: O(h) where h is the height of the tree
// - In worst case (skewed tree), h = n, so O(n)
// - In balanced tree, h = log(n), so O(log n)
//
// Space Complexity: O(h) for the recursion call stack
//
// Algorithm:
// 1. Recursively search for the node with the key
// 2. Once found, handle four cases:
//    - Leaf node: Simply return null
//    - Only right child: Return right subtree
//    - Only left child: Return left subtree
//    - Both children: Replace with inorder successor (min of right subtree)
//      and delete the successor
//
// The inorder successor approach maintains the BST property because:
// - Inorder successor is always greater than left subtree
// - Inorder successor is the smallest in the right subtree
// - It naturally fits into the deleted node's position
