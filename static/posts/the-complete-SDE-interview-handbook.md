---
title: 'The Complete SDE Interview Handbook'
description: 'Comprehensive handbook includes 40 carefully curated LeetCode problems that consistently appear in SDE I & II interviews, complete algorithm pattern breakdowns, time complexity cheat sheets, common edge cases, and proven interview strategies. Each problem comes with clean, readable solutions and detailed explanations to help you understand not just the "how" but the "why" behind each approach.'
date: '2025-07-20'
tags: ['interview', 'algorithms']
published: true
featured: true
author: 'Jatinder (Jay) Bhola'
---

## **ALGORITHM PATTERNS SUMMARY**

### **Two Pointers**

- Valid Palindrome, 3Sum
- Use when: Sorted array, finding pairs, palindromes

### **Sliding Window**

- Longest Substring Without Repeating Characters
- Use when: Contiguous subarrays, substring problems

### **Fast & Slow Pointers**

- Linked List Cycle, Middle of Linked List
- Use when: Cycle detection, finding middle

### **Binary Search**

- Binary Search, First Bad Version
- Use when: Sorted array, search space reduction

### **BFS/DFS**

- Number of Islands, Clone Graph, Course Schedule
- Use when: Tree/graph traversal, shortest path

### **Dynamic Programming**

- Climbing Stairs, Coin Change, Maximum Subarray
- Use when: Overlapping subproblems, optimization

### **Backtracking**

- Generate combinations, permutations
- Use when: Exploring all possibilities

### **Stack**

- Valid Parentheses, Min Stack, Evaluate RPN
- Use when: LIFO order, nested structures

### **Hash Table**

- Two Sum, Valid Anagram, Group Anagrams
- Use when: Fast lookups, counting, mapping

### **Greedy**

- Best Time to Buy Stock, Longest Palindrome
- Use when: Local optimal leads to global optimal

---

## **TIME COMPLEXITY CHEAT SHEET**

| **Pattern** | **Time** | **Space** | **Example** |
| --- | --- | --- | --- |
| Two Pointers | O(n) | O(1) | Valid Palindrome |
| Sliding Window | O(n) | O(k) | Longest Substring |
| Binary Search | O(log n) | O(1) | Search Array |
| BFS/DFS | O(V + E) | O(V) | Number of Islands |
| Dynamic Programming | O(n²) | O(n) | Coin Change |
| Sorting | O(n log n) | O(1) | 3Sum |

---

## **COMMON EDGE CASES**

### **Arrays**

- Empty array: `[]`
- Single element: `[1]`
- All same elements: `[1,1,1]`
- Negative numbers: `[-1,-2,-3]`

### **Strings**

- Empty string: `""`
- Single character: `"a"`
- All same characters: `"aaa"`
- Special characters: `"a!@#"`

### **Trees**

- Empty tree: `null`
- Single node: `root only`
- Linear tree: `all left or all right`
- Complete/balanced tree

### **Linked Lists**

- Empty list: `null`
- Single node: `head only`
- Cycle: `last node points to previous`
- Even/odd length lists

---

## **INTERVIEW TIPS**

### **Problem-Solving Process**

1. **Clarify requirements** (2-3 min)
    - Ask about edge cases
    - Confirm input/output format
    - Understand constraints
2. **Discuss approach** (3-5 min)
    - Start with brute force
    - Identify pattern
    - Optimize solution
    - Analyze complexity
3. **Code solution** (15-20 min)
    - Write clean, readable code
    - Handle edge cases
    - Use good variable names
    - Add comments for complex logic
4. **Test and verify** (5 min)
    - Walk through examples
    - Check edge cases
    - Verify time/space complexity

### **Communication Tips**

- Think out loud
- Explain your approach before coding
- Ask clarifying questions
- Don't be silent while coding
- Explain trade-offs
- Off-by-one errors in loops

---

## 1. Two Sum

**Description:** Find two numbers in array that add up to target
**Tags:** Array, Hash Table

```jsx
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}

```

## 2. Valid Parentheses

**Description:** Check if string has valid parentheses pairs
**Tags:** Stack, String

```jsx
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };

    for (let char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}

```

---

## 3. Best Time to Buy and Sell Stock

**Description:** Find max profit from buying and selling stock once
**Tags:** Array, Dynamic Programming

```jsx
function maxProfit(prices) {
    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    return maxProfit;
}

```

## 4. Valid Palindrome

**Description:** Check if string is palindrome ignoring non-alphanumeric
**Tags:** Two Pointers, String

```jsx
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0, right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}

```

---

## 5. Invert Binary Tree

**Description:** Invert a binary tree (swap left and right children)
**Tags:** Tree, Depth-First Search, Breadth-First Search

```jsx
function invertTree(root) {
    if (!root) return null;

    const left = invertTree(root.left);
    const right = invertTree(root.right);

    root.left = right;
    root.right = left;

    return root;
}

```

## 6. Valid Anagram

**Description:** Check if two strings are anagrams
**Tags:** Hash Table, String, Sorting

```jsx
function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const count = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
}

```

---

## 7. Binary Search

**Description:** Search target value in sorted array
**Tags:** Array, Binary Search

```jsx
function search(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

```

## 8. Flood Fill

**Description:** Change color of connected pixels in 2D image
**Tags:** Array, Depth-First Search, Breadth-First Search

```jsx
function floodFill(image, sr, sc, color) {
    const originalColor = image[sr][sc];
    if (originalColor === color) return image;

    function dfs(r, c) {
        if (r < 0 || r >= image.length || c < 0 ||
            c >= image[0].length || image[r][c] !== originalColor) {
            return;
        }

        image[r][c] = color;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    dfs(sr, sc);
    return image;
}

```

---

## 9. Lowest Common Ancestor of BST

**Description:** Find LCA of two nodes in binary search tree
**Tags:** Tree, Depth-First Search, Binary Search Tree

```jsx
function lowestCommonAncestor(root, p, q) {
    while (root) {
        if (root.val > p.val && root.val > q.val) {
            root = root.left;
        } else if (root.val < p.val && root.val < q.val) {
            root = root.right;
        } else {
            return root;
        }
    }
}

```

## 10. Balanced Binary Tree

**Description:** Check if binary tree is height-balanced
**Tags:** Tree, Depth-First Search, Binary Tree

```jsx
function isBalanced(root) {
    function checkHeight(node) {
        if (!node) return 0;

        const left = checkHeight(node.left);
        const right = checkHeight(node.right);

        if (left === -1 || right === -1 ||
            Math.abs(left - right) > 1) {
            return -1;
        }

        return Math.max(left, right) + 1;
    }

    return checkHeight(root) !== -1;
}

```

---

## 11. Linked List Cycle

**Description:** Detect if linked list has a cycle
**Tags:** Hash Table, Linked List, Two Pointers

```jsx
function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}

```

## 12. Implement Queue using Stacks

**Description:** Implement queue using only two stacks
**Tags:** Stack, Design, Queue

```jsx
class MyQueue {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }

    push(x) {
        this.inStack.push(x);
    }

    pop() {
        this.peek();
        return this.outStack.pop();
    }

    peek() {
        if (this.outStack.length === 0) {
            while (this.inStack.length > 0) {
                this.outStack.push(this.inStack.pop());
            }
        }
        return this.outStack[this.outStack.length - 1];
    }

    empty() {
        return this.inStack.length === 0 && this.outStack.length === 0;
    }
}

```

---

## 13. First Bad Version

**Description:** Find first bad version using binary search
**Tags:** Binary Search, Interactive

```jsx
function firstBadVersion(n) {
    let left = 1, right = n;

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

```

## 14. Ransom Note

**Description:** Check if ransom note can be constructed from magazine
**Tags:** Hash Table, String, Counting

```jsx
function canConstruct(ransomNote, magazine) {
    const count = {};

    for (let char of magazine) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let char of ransomNote) {
        if (!count[char]) return false;
        count[char]--;
    }

    return true;
}

```

---

## 15. Climbing Stairs

**Description:** Count distinct ways to climb n stairs (1 or 2 steps)
**Tags:** Math, Dynamic Programming, Memoization

```jsx
function climbStairs(n) {
    if (n <= 2) return n;

    let prev2 = 1, prev1 = 2;

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

```

## 16. Longest Palindrome

**Description:** Find length of longest palindrome from string characters
**Tags:** Hash Table, String, Greedy

```jsx
function longestPalindrome(s) {
    const count = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    let length = 0;
    let hasOdd = false;

    for (let freq of Object.values(count)) {
        length += Math.floor(freq / 2) * 2;
        if (freq % 2 === 1) hasOdd = true;
    }

    return length + (hasOdd ? 1 : 0);
}

```

---

## 17. Reverse Linked List

**Description:** Reverse a singly linked list
**Tags:** Linked List, Recursion

```jsx
// Iterative
function reverseList(head) {
    let prev = null;
    let current = head;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

// Recursive
function reverseListRecursive(head) {
    if (!head || !head.next) return head;

    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return newHead;
}

```

## 18. Majority Element

**Description:** Find element that appears more than n/2 times
**Tags:** Array, Hash Table, Divide and Conquer, Sorting, Counting

```jsx
// Boyer-Moore Voting Algorithm
function majorityElement(nums) {
    let candidate = nums[0];
    let count = 1;

    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }

    return candidate;
}

```

---

## 19. Add Binary

**Description:** Add two binary strings and return sum as binary string
**Tags:** Math, String, Bit Manipulation, Simulation

```jsx
function addBinary(a, b) {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry) {
        const sum = carry +
                   (i >= 0 ? parseInt(a[i--]) : 0) +
                   (j >= 0 ? parseInt(b[j--]) : 0);

        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    return result;
}

```

## 20. Diameter of Binary Tree

**Description:** Find diameter (longest path between any two nodes)
**Tags:** Tree, Depth-First Search, Binary Tree

```jsx
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;

    function dfs(node) {
        if (!node) return 0;

        const left = dfs(node.left);
        const right = dfs(node.right);

        maxDiameter = Math.max(maxDiameter, left + right);

        return Math.max(left, right) + 1;
    }

    dfs(root);
    return maxDiameter;
}

```

---

## 21. Middle of Linked List

**Description:** Find middle node of linked list
**Tags:** Linked List, Two Pointers

```jsx
function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

```

## 22. Maximum Depth of Binary Tree

**Description:** Find maximum depth of binary tree
**Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

```jsx
// Recursive DFS
function maxDepth(root) {
    if (!root) return 0;

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// Iterative BFS
function maxDepthBFS(root) {
    if (!root) return 0;

    const queue = [[root, 1]];
    let maxDepth = 0;

    while (queue.length > 0) {
        const [node, depth] = queue.shift();
        maxDepth = Math.max(maxDepth, depth);

        if (node.left) queue.push([node.left, depth + 1]);
        if (node.right) queue.push([node.right, depth + 1]);
    }

    return maxDepth;
}

```

---

## 23. Contains Duplicate

**Description:** Check if array contains any duplicate values
**Tags:** Array, Hash Table, Sorting

```jsx
function containsDuplicate(nums) {
    const seen = new Set();

    for (let num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }

    return false;
}

// Alternative: One-liner
function containsDuplicateOneLiner(nums) {
    return new Set(nums).size !== nums.length;
}

```

## 24. Maximum Subarray

**Description:** Find contiguous subarray with largest sum
**Tags:** Array, Divide and Conquer, Dynamic Programming

```jsx
// Kadane's Algorithm
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

```

---

## 25. Insert Interval

**Description:** Insert new interval into sorted non-overlapping intervals
**Tags:** Array

```jsx
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;

    // Add all intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}

```

## 26. 01 Matrix

**Description:** Find distance to nearest 0 for each cell
**Tags:** Array, Dynamic Programming, Breadth-First Search, Matrix

```jsx
function updateMatrix(mat) {
    const rows = mat.length, cols = mat[0].length;
    const dist = Array(rows).fill().map(() => Array(cols).fill(Infinity));
    const queue = [];

    // Find all 0s and add to queue
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (mat[i][j] === 0) {
                dist[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (dist[newRow][newCol] > dist[row][col] + 1) {
                    dist[newRow][newCol] = dist[row][col] + 1;
                    queue.push([newRow, newCol]);
                }
            }
        }
    }

    return dist;
}

```

---

## 27. K Closest Points to Origin

**Description:** Find k closest points to origin (0,0)
**Tags:** Array, Math, Divide and Conquer, Geometry, Sorting, Heap

```jsx
function kClosest(points, k) {
    return points
        .map(point => ({
            point: point,
            distance: point[0] * point[0] + point[1] * point[1]
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, k)
        .map(item => item.point);
}

// Using Min Heap (more efficient for large datasets)
function kClosestHeap(points, k) {
    const heap = new MinHeap();

    for (const point of points) {
        const distance = point[0] * point[0] + point[1] * point[1];
        heap.insert([distance, point]);
    }

    const result = [];
    for (let i = 0; i < k; i++) {
        result.push(heap.extract()[1]);
    }

    return result;
}

```

## 28. Longest Substring Without Repeating Characters

**Description:** Find length of longest substring without repeating characters
**Tags:** Hash Table, String, Sliding Window

```jsx
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

```

---

## 29. 3Sum

**Description:** Find all unique triplets that sum to zero
**Tags:** Array, Two Pointers, Sorting

```jsx
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

```

## 30. Binary Tree Level Order Traversal

**Description:** Return level order traversal of binary tree
**Tags:** Tree, Breadth-First Search, Binary Tree

```jsx
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}

```

---

## 31. Clone Graph

**Description:** Clone undirected connected graph
**Tags:** Hash Table, Depth-First Search, Breadth-First Search, Graph

```jsx
function cloneGraph(node) {
    if (!node) return null;

    const visited = new Map();

    function dfs(node) {
        if (visited.has(node)) {
            return visited.get(node);
        }

        const clone = new Node(node.val);
        visited.set(node, clone);

        for (const neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

```

## 32. Evaluate Reverse Polish Notation

**Description:** Evaluate arithmetic expression in postfix notation
**Tags:** Array, Math, Stack

```jsx
function evalRPN(tokens) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };

    for (const token of tokens) {
        if (token in operators) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    }

    return stack[0];
}

```

---

## 33. Course Schedule

**Description:** Check if all courses can be finished given prerequisites
**Tags:** Depth-First Search, Breadth-First Search, Graph, Topological Sort

```jsx
function canFinish(numCourses, prerequisites) {
    const graph = Array(numCourses).fill().map(() => []);
    const inDegree = Array(numCourses).fill(0);

    // Build graph and calculate in-degrees
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    // Kahn's algorithm for topological sort
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let completed = 0;
    while (queue.length > 0) {
        const course = queue.shift();
        completed++;

        for (const nextCourse of graph[course]) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }

    return completed === numCourses;
}

```

## 34. Implement Trie (Prefix Tree)

**Description:** Implement trie data structure for string operations
**Tags:** Hash Table, String, Design, Trie

```jsx
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }
}

```

---

## 35. Coin Change

**Description:** Find minimum coins needed to make amount
**Tags:** Array, Dynamic Programming, Breadth-First Search

```jsx
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

```

## 36. Product of Array Except Self

**Description:** Return array where each element is product of all others
**Tags:** Array, Prefix Sum

```jsx
function productExceptSelf(nums) {
    const result = Array(nums.length);

    // Forward pass: left products
    result[0] = 1;
    for (let i = 1; i < nums.length; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Backward pass: multiply by right products
    let rightProduct = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}

```

---

## 37. Min Stack

**Description:** Stack supporting push, pop, top, and getMin in O(1)
**Tags:** Stack, Design

```jsx
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }

    pop() {
        const popped = this.stack.pop();
        if (popped === this.getMin()) {
            this.minStack.pop();
        }
        return popped;
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

```

## 38. Validate Binary Search Tree

**Description:** Check if binary tree is valid BST
**Tags:** Tree, Depth-First Search, Binary Search Tree, Binary Tree

```jsx
function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;

        if (node.val <= min || node.val >= max) {
            return false;
        }

        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }

    return validate(root, -Infinity, Infinity);
}

```

---

## 39. Number of Islands

**Description:** Count number of islands in 2D binary grid
**Tags:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

```jsx
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }

        grid[r][c] = '0'; // Mark as visited

        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }

    return count;
}

```

## 40. Rotting Oranges

**Description:** Find time for all oranges to rot (BFS simulation)
**Tags:** Array, Breadth-First Search, Matrix

```jsx
function orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;

    // Find all rotten oranges and count fresh ones
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    if (freshCount === 0) return 0;

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let minutes = 0;

    while (queue.length > 0 && freshCount > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift();

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                    grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    queue.push([nr, nc]);
                    freshCount--;
                }
            }
        }
        minutes++;
    }

    return freshCount === 0 ? minutes : -1;
}

```
---

**Tags:** #LeetCode #TechnicalInterview #SoftwareEngineer #CodingInterview #AlgorithmsAndDataStructures
