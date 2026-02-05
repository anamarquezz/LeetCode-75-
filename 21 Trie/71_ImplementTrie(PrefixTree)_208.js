// ============================================
// Implement Trie (Prefix Tree)
// Purpose: Build a Trie data structure for efficient string operations
// ============================================
/*
A trie (pronounced as "try") or prefix tree is a tree data structure used to 
efficiently store and retrieve keys in a dataset of strings. There are various 
applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
- Trie() Initializes the trie object.
- void insert(String word) Inserts the string word into the trie.
- boolean search(String word) Returns true if the string word is in the trie 
  (i.e., was inserted before), and false otherwise.
- boolean startsWith(String prefix) Returns true if there is a previously 
  inserted string word that has the prefix prefix, and false otherwise.

Example 1:
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

Constraints:
1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.
*/

// ============================================
// Solution - Trie Node Class
// ============================================

class TrieNode {
    constructor() {
        this.children = {};  // Map of character -> TrieNode
        this.isEndOfWord = false;  // Marks if this node is end of a valid word
    }
}

// ============================================
// Solution - Trie Class
// ============================================

var Trie = function() {
    this.root = new TrieNode();
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.root;
    
    for (const char of word) {
        // If character doesn't exist, create a new node
        if (!node.children[char]) {
            node.children[char] = new TrieNode();
        }
        // Move to the child node
        node = node.children[char];
    }
    
    // Mark the end of the word
    node.isEndOfWord = true;
};

/**
 * Returns true if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.root;
    
    for (const char of word) {
        // If character doesn't exist, word is not in trie
        if (!node.children[char]) {
            return false;
        }
        node = node.children[char];
    }
    
    // Return true only if it's a complete word
    return node.isEndOfWord;
};

/**
 * Returns true if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let node = this.root;
    
    for (const char of prefix) {
        // If character doesn't exist, no word with this prefix
        if (!node.children[char]) {
            return false;
        }
        node = node.children[char];
    }
    
    // If we reached here, prefix exists in trie
    return true;
};

// ============================================
// Test Cases
// ============================================

const trie = new Trie();
trie.insert("apple");
console.log('search("apple"):', trie.search("apple")); // Expected: true
console.log('search("app"):', trie.search("app")); // Expected: false
console.log('startsWith("app"):', trie.startsWith("app")); // Expected: true
trie.insert("app");
console.log('search("app") after insert:', trie.search("app")); // Expected: true

// ============================================
// Explanation
// ============================================
// Algorithm: Trie (Prefix Tree)
// 1. Each node contains:
//    - children: Map/Object of character -> child TrieNode
//    - isEndOfWord: Boolean marking if a valid word ends here
// 2. Insert: Traverse/create nodes for each character, mark end
// 3. Search: Traverse nodes for each character, check isEndOfWord
// 4. StartsWith: Same as search but don't check isEndOfWord
//
// Time Complexity:
//   - Insert: O(m) where m is word length
//   - Search: O(m) where m is word length
//   - StartsWith: O(m) where m is prefix length
// Space Complexity: O(n * m) where n is number of words, m is average length
