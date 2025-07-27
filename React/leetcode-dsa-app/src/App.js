import React, { useState } from 'react';
import { ChevronLeft, Code, List, BookOpen } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DSAApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [activeTab, setActiveTab] = useState('templates');

  const dsaPatterns = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting',
    'Greedy', 'Depth-First Search', 'Binary Search', 'Database', 'Matrix', 'Tree',
    'Breadth-First Search', 'Bit Manipulation', 'Two Pointers', 'Prefix Sum',
    'Heap (Priority Queue)', 'Graph', 'Stack', 'Sliding Window', 'Backtracking',
    'Union Find', 'Linked List', 'Monotonic Stack', 'Queue'
  ];

  const patternData = {
    'Array': {
      templates: [
        {
          name: 'Two Pointers Technique',
          code: `def two_pointers(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        # Process current pair
        if condition:
            left += 1
        else:
            right -= 1`
        },
        {
          name: 'Kadane\'s Algorithm',
          code: `def max_subarray(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`
        }
      ],
      problems: [
        { name: 'Two Sum', difficulty: 'Easy', solved: true },
        { name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', solved: true },
        { name: 'Maximum Subarray', difficulty: 'Medium', solved: false },
        { name: 'Product of Array Except Self', difficulty: 'Medium', solved: true },
        { name: 'Maximum Product Subarray', difficulty: 'Medium', solved: false }
      ]
    },
    'String': {
      templates: [
        {
          name: 'Sliding Window for Strings',
          code: `def sliding_window_string(s, target):
    left = 0
    window = {}
    result = []
    
    for right in range(len(s)):
        # Expand window
        char = s[right]
        window[char] = window.get(char, 0) + 1
        
        # Contract window when needed
        while window_condition_met:
            # Update result
            left += 1`
        },
        {
          name: 'Palindrome Check',
          code: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`
        }
      ],
      problems: [
        { name: 'Valid Anagram', difficulty: 'Easy', solved: true },
        { name: 'Valid Palindrome', difficulty: 'Easy', solved: true },
        { name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', solved: false },
        { name: 'Group Anagrams', difficulty: 'Medium', solved: true },
        { name: 'Longest Palindromic Substring', difficulty: 'Medium', solved: false }
      ]
    },
    'Dynamic Programming': {
      templates: [
        {
          name: '1D DP Template',
          code: `def dp_1d(n):
    dp = [0] * (n + 1)
    dp[0] = base_case
    
    for i in range(1, n + 1):
        dp[i] = transition_function(dp[i-1])
    
    return dp[n]`
        },
        {
          name: '2D DP Template',
          code: `def dp_2d(m, n):
    dp = [[0] * n for _ in range(m)]
    
    # Initialize base cases
    for i in range(m):
        dp[i][0] = base_case
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = transition_function(dp[i-1][j], dp[i][j-1])
    
    return dp[m-1][n-1]`
        }
      ],
      problems: [
        { name: 'Climbing Stairs', difficulty: 'Easy', solved: true },
        { name: 'House Robber', difficulty: 'Medium', solved: true },
        { name: 'Coin Change', difficulty: 'Medium', solved: false },
        { name: 'Longest Increasing Subsequence', difficulty: 'Medium', solved: false },
        { name: 'Edit Distance', difficulty: 'Hard', solved: false }
      ]
    },
    'Tree': {
      templates: [
        {
          name: 'Binary Tree Traversal',
          code: `if not root:
    return []
left = self.traversal(root.left)
right = self.traversal(root.right)

# 144. Binary Tree Preorder Traversal
return [root.val] + left + right

# 94. Binary Tree Inorder Traversal
return left + [root.val] + right

# 145. Binary Tree Postorder Traversal
return left + right + [root.val]`
        },
        {
          name: 'N-ary Tree Traversal',
          code: `if not root:
    return []
res = []
for child in root.children:
    res.extend(self.preorder(child))

# 589. N-ary Tree Preorder Traversal
return [root.val] + res

# 590. N-ary Tree Postorder Traversal
return res + [root.val]`
        }
      ],
      problems: [
        { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', solved: true },
        { name: 'Same Tree', difficulty: 'Easy', solved: true },
        { name: 'Invert Binary Tree', difficulty: 'Easy', solved: true },
        { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', solved: false },
        { name: 'Validate Binary Search Tree', difficulty: 'Medium', solved: false }
      ]
    }
  };

  // Add default data for patterns not explicitly defined
  dsaPatterns.forEach(pattern => {
    if (!patternData[pattern]) {
      patternData[pattern] = {
        templates: [
          {
            name: `${pattern} Template`,
            code: `# ${pattern} template - Add your implementation here
def solve_problem():
    # TODO: Implement ${pattern} solution
    pass`
          }
        ],
        problems: [
          { name: `Sample ${pattern} Problem 1`, difficulty: 'Easy', solved: false },
          { name: `Sample ${pattern} Problem 2`, difficulty: 'Medium', solved: false },
          { name: `Sample ${pattern} Problem 3`, difficulty: 'Hard', solved: false }
        ]
      };
    }
  });

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern);
    setCurrentView('pattern');
    setActiveTab('templates');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderHome = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">DSA Patterns & Solutions</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dsaPatterns.map((pattern, index) => (
          <button
            key={index}
            onClick={() => handlePatternClick(pattern)}
            className="bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center leading-tight">{pattern}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPattern = () => {
    const data = patternData[selectedPattern];
    
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{selectedPattern}</h1>
        </div>

        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'templates'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Templates
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'problems'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <List className="w-4 h-4 mr-2" />
            Problems
          </button>
        </div>

        {activeTab === 'templates' && (
          <div className="space-y-6">
            {data.templates.map((template, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                </div>
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, borderRadius: '0 0 0.5rem 0.5rem' }}
                >
                  {template.code.trim()}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Popular Problems</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {data.problems.map((problem, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${problem.solved ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="font-medium text-gray-800">{problem.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'home' && renderHome()}
      {currentView === 'pattern' && renderPattern()}
    </div>
  );
};

export default DSAApp;