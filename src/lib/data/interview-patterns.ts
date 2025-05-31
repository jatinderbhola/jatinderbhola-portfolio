export interface Pattern {
    id: string;
    title: string;
    emoji: string;
    whenToUse: string[];
    codeSnippet: string;
    complexity: {
        time: string;
        space: string;
    };
    exampleProblems: string[];
}

export interface PatternDetail {
    title: string;
    problems: Array<{
        name: string;
        description: string;
    }>;
}

export interface CommunicationTip {
    title: string;
    duration: string;
    points: Array<{
        action: string;
        example: string;
    }>;
}

export interface PatternKeyword {
    keyword: string;
    pattern: string;
}

export const patterns: Pattern[] = [
    {
        id: 'two-pointers',
        title: 'Two Pointers',
        emoji: '🔄',
        whenToUse: [
            'Sorted arrays/linked lists',
            'Finding pairs with specific sum',
            'Removing duplicates',
            'Palindrome checking'
        ],
        codeSnippet: `let left = 0, right = arr.length - 1;
while (left < right) {
    // Process based on condition
    if (condition) {
        left++;
    } else {
        right--;
    }
}`,
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        exampleProblems: [
            'Two Sum (sorted array)',
            'Container With Most Water',
            'Valid Palindrome'
        ]
    },
    {
        id: 'sliding-window',
        title: 'Sliding Window',
        emoji: '🪟',
        whenToUse: [
            'Contiguous subarrays/substrings',
            'Finding longest/shortest with condition',
            'Fixed or variable window size'
        ],
        codeSnippet: `let left = 0;
for (let right = 0; right < arr.length; right++) {
    // Expand window
    window.add(arr[right]);
    
    // Contract if needed
    while (!isValid) {
        window.delete(arr[left]);
        left++;
    }
}`,
        complexity: {
            time: 'O(n)',
            space: 'O(k)'
        },
        exampleProblems: [
            'Longest Substring Without Repeating',
            'Maximum Sum Subarray of Size K',
            'Minimum Window Substring'
        ]
    },
    {
        id: 'fast-slow-pointers',
        title: 'Fast & Slow Pointers',
        emoji: '🐢🐰',
        whenToUse: [
            'Cycle detection in linked list',
            'Finding middle element',
            'Finding cycle start',
            'Happy number problem'
        ],
        codeSnippet: `let slow = head, fast = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
        // Cycle detected
        break;
    }
}`,
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        exampleProblems: [
            'Linked List Cycle',
            'Find Middle of Linked List',
            'Palindrome Linked List'
        ]
    },
    {
        id: 'tree-traversal',
        title: 'Tree Traversal (DFS/BFS)',
        emoji: '🌳',
        whenToUse: [
            'Tree/graph problems',
            'Level-order traversal (BFS)',
            'Path finding (DFS)',
            'Tree properties validation'
        ],
        codeSnippet: `// DFS Recursive
function dfs(node) {
    if (!node) return;
    process(node);
    dfs(node.left);
    dfs(node.right);
}

// BFS Iterative
const queue = [root];
while (queue.length > 0) {
    const node = queue.shift();
    process(node);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
}`,
        complexity: {
            time: 'O(n)',
            space: 'O(h) or O(n)'
        },
        exampleProblems: [
            'Binary Tree Level Order Traversal',
            'Maximum Depth of Binary Tree',
            'Path Sum'
        ]
    },
    {
        id: 'binary-search',
        title: 'Binary Search',
        emoji: '🔍',
        whenToUse: [
            'Sorted array/search space',
            'Finding specific value',
            'Finding first/last occurrence',
            'Optimization problems'
        ],
        codeSnippet: `let left = 0, right = arr.length - 1;
while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}`,
        complexity: {
            time: 'O(log n)',
            space: 'O(1)'
        },
        exampleProblems: [
            'Search in Rotated Sorted Array',
            'Find Peak Element',
            'Search a 2D Matrix'
        ]
    },
    {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        emoji: '💎',
        whenToUse: [
            'Optimization problems',
            'Overlapping subproblems',
            'Decision making at each step',
            'Count ways to do something'
        ],
        codeSnippet: `// Bottom-up approach
const dp = new Array(n + 1).fill(0);
dp[0] = baseCase;

for (let i = 1; i <= n; i++) {
    // Build from smaller subproblems
    dp[i] = f(dp[i-1], dp[i-2], ...);
}

return dp[n];`,
        complexity: {
            time: 'O(n)',
            space: 'O(n) or O(1)'
        },
        exampleProblems: [
            'Climbing Stairs',
            'House Robber',
            'Longest Common Subsequence'
        ]
    },
    {
        id: 'backtracking',
        title: 'Backtracking',
        emoji: '🔙',
        whenToUse: [
            'Generate all combinations/permutations',
            'Constraint satisfaction',
            'Decision tree exploration',
            'Puzzle solving'
        ],
        codeSnippet: `function backtrack(path, choices) {
    if (isSolution(path)) {
        results.push([...path]);
        return;
    }
    
    for (let choice of choices) {
        if (isValid(choice)) {
            path.push(choice);
            backtrack(path, choices);
            path.pop(); // backtrack
        }
    }
}`,
        complexity: {
            time: 'O(n!)',
            space: 'O(n)'
        },
        exampleProblems: [
            'Subsets',
            'Permutations',
            'N-Queens'
        ]
    },
    {
        id: 'hashmap-hashset',
        title: 'HashMap/HashSet',
        emoji: '📊',
        whenToUse: [
            'Counting frequencies',
            'Finding duplicates',
            'Grouping elements',
            'O(1) lookup needed'
        ],
        codeSnippet: `// Frequency counting
const freq = {};
for (let item of arr) {
    freq[item] = (freq[item] || 0) + 1;
}

// Two Sum pattern
const seen = new Map();
for (let i = 0; i < arr.length; i++) {
    if (seen.has(target - arr[i])) {
        return [seen.get(target - arr[i]), i];
    }
    seen.set(arr[i], i);
}`,
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        exampleProblems: [
            'Two Sum',
            'Group Anagrams',
            'Valid Anagram'
        ]
    }
];

export const patternDetails: PatternDetail[] = [
    {
        title: 'Two Pointers Pattern',
        problems: [
            { name: 'Two Sum II (Sorted Array)', description: 'Find two numbers that add up to target' },
            { name: '3Sum', description: 'Find all unique triplets that sum to zero' },
            { name: 'Container With Most Water', description: 'Find max area between two lines' },
            { name: 'Trapping Rain Water', description: 'Calculate water trapped between bars' },
            { name: 'Remove Duplicates from Sorted Array', description: 'In-place duplicate removal' }
        ]
    },
    {
        title: 'Sliding Window Pattern',
        problems: [
            { name: 'Longest Substring Without Repeating Characters', description: 'Find longest unique substring' },
            { name: 'Minimum Window Substring', description: 'Find smallest window containing all chars' },
            { name: 'Longest Repeating Character Replacement', description: 'Max length with k replacements' },
            { name: 'Permutation in String', description: 'Check if s2 contains permutation of s1' },
            { name: 'Fruit Into Baskets', description: 'Max fruits with 2 types (subarray with 2 distinct)' }
        ]
    }
];

export const communicationTips: CommunicationTip[] = [
    {
        title: 'Clarify the Problem',
        duration: '2-3 minutes',
        points: [
            {
                action: 'Repeat the problem',
                example: '"So if I understand correctly, we need to..."'
            },
            {
                action: 'Ask about constraints',
                example: '"What\'s the size of the input? Can there be duplicates?"'
            },
            {
                action: 'Clarify edge cases',
                example: '"What should I return if the array is empty?"'
            },
            {
                action: 'Confirm examples',
                example: '"Let me trace through this example to make sure I understand"'
            }
        ]
    },
    {
        title: 'Discuss Approach',
        duration: '5-7 minutes',
        points: [
            {
                action: 'Start with brute force',
                example: '"The naive approach would be... with O(n²) time"'
            },
            {
                action: 'Identify the pattern',
                example: '"This looks like a two-pointer problem because..."'
            },
            {
                action: 'Optimize',
                example: '"We can improve this by using a hashmap to..."'
            },
            {
                action: 'Analyze complexity',
                example: '"This would give us O(n) time and O(1) space"'
            }
        ]
    }
];

export const patternKeywords: PatternKeyword[] = [
    { keyword: '"Find pair/triplet that sum to X"', pattern: 'Two/Three Pointers' },
    { keyword: '"Longest/shortest subarray/substring with condition"', pattern: 'Sliding Window' },
    { keyword: '"Sorted array" + "find element"', pattern: 'Binary Search' },
    { keyword: '"Generate all combinations/permutations"', pattern: 'Backtracking' },
    { keyword: '"Maximum/minimum cost/path/sum"', pattern: 'Dynamic Programming' },
    { keyword: '"Tree/graph traversal by levels"', pattern: 'BFS' },
    { keyword: '"Find path/validate tree property"', pattern: 'DFS' },
    { keyword: '"K-th largest/smallest/frequent"', pattern: 'Heap/Priority Queue' },
    { keyword: '"Detect cycle in linked list"', pattern: 'Fast & Slow Pointers' },
    { keyword: '"Group by property/find duplicates"', pattern: 'HashMap/HashSet' }
]; 