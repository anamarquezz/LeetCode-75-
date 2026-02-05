// ============================================
// Search Suggestions System
// Purpose: Build autocomplete suggestions using Trie
// ============================================
/*
You are given an array of strings products and a string searchWord.

Design a system that suggests at most three product names from products after 
each character of searchWord is typed. Suggested products should have common 
prefix with searchWord. If there are more than three products with a common 
prefix return the three lexicographically minimum products.

Return a list of lists of the suggested products after each character of 
searchWord is typed.

Example 1:
Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
After typing mou, mous and mouse the system suggests ["mouse","mousepad"].

Example 2:
Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]

Example 3:
Input: products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
Output: [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]

Constraints:
1 <= products.length <= 1000
1 <= products[i].length <= 3000
1 <= sum(products[i].length) <= 2 * 10^4
All the strings of products are unique.
products[i] consists of lowercase English letters.
1 <= searchWord.length <= 1000
searchWord consists of lowercase English letters.
*/

// ============================================
// Solution - Trie Node Class
// ============================================

class TrieNode {
    constructor() {
        this.children = {};
        this.suggestions = []; // Store up to 3 lexicographically smallest words
    }
}

// ============================================
// Solution Function
// ============================================

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {
    // Sort products lexicographically first
    products.sort();
    
    // Build Trie
    const root = new TrieNode();
    
    for (const product of products) {
        let node = root;
        
        for (const char of product) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
            
            // Add product to suggestions (keep only top 3)
            if (node.suggestions.length < 3) {
                node.suggestions.push(product);
            }
        }
    }
    
    // Search for suggestions for each prefix of searchWord
    const result = [];
    let node = root;
    
    for (const char of searchWord) {
        if (node && node.children[char]) {
            node = node.children[char];
            result.push(node.suggestions);
        } else {
            // No more matches, push empty arrays for remaining characters
            node = null;
            result.push([]);
        }
    }
    
    return result;
};

// ============================================
// Alternative Solution (Binary Search - No Trie)
// ============================================

var suggestedProductsBinarySearch = function(products, searchWord) {
    products.sort();
    const result = [];
    let prefix = '';
    
    for (const char of searchWord) {
        prefix += char;
        const suggestions = [];
        
        // Binary search for the first product with this prefix
        let left = 0, right = products.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (products[mid] < prefix) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // Collect up to 3 products starting from the found position
        for (let i = left; i < Math.min(left + 3, products.length); i++) {
            if (products[i].startsWith(prefix)) {
                suggestions.push(products[i]);
            }
        }
        
        result.push(suggestions);
    }
    
    return result;
};

// ============================================
// Test Cases
// ============================================

console.log('Test 1:', suggestedProducts(
    ["mobile","mouse","moneypot","monitor","mousepad"], 
    "mouse"
));
// Expected: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]

console.log('Test 2:', suggestedProducts(["havana"], "havana"));
// Expected: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]

console.log('Test 3:', suggestedProducts(
    ["bags","baggage","banner","box","cloths"], 
    "bags"
));
// Expected: [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]

// ============================================
// Explanation
// ============================================
// Algorithm: Trie with Pre-stored Suggestions
// 1. Sort products lexicographically first
// 2. Build Trie: For each product, traverse/create nodes
//    - At each node, store up to 3 suggestions (already sorted)
// 3. Search: For each character in searchWord:
//    - Traverse to the corresponding node
//    - Return the pre-stored suggestions at that node
// 4. If path doesn't exist, return empty arrays for remaining chars
//
// Time Complexity:
//   - Building Trie: O(n * m) where n = products count, m = avg product length
//   - Sorting: O(n log n * m) for string comparison
//   - Query: O(k) where k = searchWord length
// Space Complexity: O(n * m) for the Trie structure
