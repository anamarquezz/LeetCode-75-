// ============================================
// Search in a Binary Search Tree
// Purpose: Find and return a subtree with target value using BST properties
// ============================================
/*
700. Search in a Binary Search Tree

You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree
rooted with that node. If such a node does not exist, return null.

Example 1:
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]

Example 2:
Input: root = [4,2,7,1,3], val = 5
Output: []

Constraints:
- The number of nodes in the tree is in the range [1, 5000].
- 1 <= Node.val <= 10^7
- root is a binary search tree.
- 1 <= val <= 10^7
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
    // Base case: empty tree or target value not found
    if (root === null) {
        return null;
    }
    
    // Found the target value, return the subtree rooted at this node
    if (root.val === val) {
        return root;
    }
    
    // Use BST property to navigate
    if (val < root.val) {
        // Target is smaller, search in left subtree
        return searchBST(root.left, val);
    } else {
        // Target is larger, search in right subtree
        return searchBST(root.right, val);
    }
};

// ============================================
// Alternative Solution (Iterative)
// ============================================

/**
 * Iterative approach using while loop
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBSTIterative = function(root, val) {
    let current = root;
    
    while (current !== null) {
        if (current.val === val) {
            return current;
        } else if (val < current.val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    
    return null;
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

console.log("Test 1 - Search for existing node (left subtree):");
let tree1 = buildTree([4, 2, 7, 1, 3]);
let result1 = searchBST(tree1, 2);
console.log("Result:", treeToArray(result1)); // Expected: [2,1,3]

console.log("\nTest 2 - Search for non-existent node:");
let tree2 = buildTree([4, 2, 7, 1, 3]);
let result2 = searchBST(tree2, 5);
console.log("Result:", treeToArray(result2)); // Expected: []

console.log("\nTest 3 - Search for root node:");
let tree3 = buildTree([4, 2, 7, 1, 3]);
let result3 = searchBST(tree3, 4);
console.log("Result:", treeToArray(result3)); // Expected: [4,2,7,1,3]

console.log("\nTest 4 - Search for node in right subtree:");
let tree4 = buildTree([4, 2, 7, 1, 3]);
let result4 = searchBST(tree4, 7);
console.log("Result:", treeToArray(result4)); // Expected: [7]

console.log("\nTest 5 - Search for leaf node:");
let tree5 = buildTree([4, 2, 7, 1, 3]);
let result5 = searchBST(tree5, 1);
console.log("Result:", treeToArray(result5)); // Expected: [1]

console.log("\nTest 6 - Iterative approach - search for existing node:");
let tree6 = buildTree([4, 2, 7, 1, 3]);
let result6 = searchBSTIterative(tree6, 2);
console.log("Result:", treeToArray(result6)); // Expected: [2,1,3]

console.log("\nTest 7 - Iterative approach - search for non-existent node:");
let tree7 = buildTree([4, 2, 7, 1, 3]);
let result7 = searchBSTIterative(tree7, 5);
console.log("Result:", treeToArray(result7)); // Expected: []

// ============================================
// Explanation
// ============================================
//
// Time Complexity: O(h) where h is the height of the tree
// - In balanced BST: O(log n)
// - In skewed BST: O(n)
//
// Space Complexity:
// - Recursive: O(h) for call stack
// - Iterative: O(1)
//
// Algorithm:
// 1. Start from the root node
// 2. Compare the target value with current node's value
// 3. If equal, return the current node (and its subtree)
// 4. If target < current.val, search left subtree (BST property)
// 5. If target > current.val, search right subtree (BST property)
// 6. If we reach null, node doesn't exist, return null
//
// Key insights:
// - BST property allows us to eliminate half of the tree at each step
// - We don't need to visit all nodes like in regular binary tree
// - Both recursive and iterative solutions have similar time complexity
// - Iterative solution is more space-efficient (no recursion stack)
// - We return the entire subtree rooted at the found node, not just the value

