import Node from "./node.js";
import mergeSort from "./mergesort.js";
import pruneDuplicates from "./prune.js";
import balancedBinarySort from "./balancedbinarysort.js";

export default class Tree {
    constructor(array){
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        // Sort tree using mergesort.
        const sortedArray = mergeSort(array);
        // Remove duplicate values from sorted array.
        const prunedArray = pruneDuplicates(sortedArray);
        // Create BST from sorted and pruned array.
        return balancedBinarySort(prunedArray);
    }

    prettyPrint (node = this.root, prefix = '', isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    insert (value, node = this.root) {
        if (!node || node === null) return node = new Node(value);
        if (value > node.data) {
            node.right = this.insert (value, node.right)
        }
        if (value < node.data) {
            node.left = this.insert (value, node.left)
        }
        if (value === node.data){
            throw new Error ('Value aready exists in tree.')
        }
        return node;
    }

    deleteItem (value, node = this.root) {
        // Abort code if value does not exist in BST.
        if (this.find(value) === null) throw new Error ('Value does not exist.')
        let current = node;
        let parent = null;
        // Traverse the tree until the desired value is located.
        while (current !== null) {
            // Current node is equal to desired value, break loop.
            if (value === current.data) {
                break;
            // Value is less than current node, move to left branch.
            } else if (value < current.data) {
                parent = current;
                current = current.left;
            // Value is greater than current node, move to right branch
            } else {
                parent = current;
                current = current.right;
            }
        }
        
        //Node has no children
        if (current.left === null && current.right === null) {
            // Node is root.
            if (parent === null) {
                this.root = null;
            // Node is left child of parent node
            } else if (parent.left  === current) {
                parent.left = null;
            // Node is right child of parent node.
            } else {
                parent.right = null;
            }   
        //Node has one child.
        } else if (current.left === null || current.right === null) {
            //Set child to left or right depending on which is null.
            const child = current.left !== null ? current.left : current.right;
            // Node is root, Set child as new root.
            if (parent === null) {
                this.root = child;
            // Node is left child of parent node, set child as new left child of parent node
            } else if (parent.left === current) {
                parent.left = child;
            // Node is right child of parent node, set child as new right child of parent node.
            } else {
                parent.right = child;
            }
        } else {
            //Node has two children.
            let successor = current.right;
            let successorParent = current;
            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            current.data = successor.data;

            if (successorParent.left === successor) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }
        }
    }

    find (value, node = this.root) {
        // Escape parameter: Node is null, meaning the value doesn't exist in the BST.
        if (node === null) return null;
        // Second Escape parameter: Value if found in node.
        if (node.data === value) return node;
        // Recursive call if value is less than current node value.
        if (value < node.data) return this.find(value, node.left);
        // Recursive call if value is greater than current node value.
        if (value > node.data) return this.find(value, node.right);
    }

    levelOrder (callback) {
        // Abort if callback is not a function.
        if (typeof callback !== 'function') throw new Error('Callback is not a function.');
        // initialize array to store values.
        const res = [];
        //Run helper function to populate res.
        this.levelOrderQueue(this.root, 0, res);
        // Iterate through res to to run callback on all values.
        for (let i = 0; i < res.length; i++){
            if (res[i].length === 0) console.log('Level is empty.')
            res[i].forEach(node => {
                callback(node);
            });
        }
    }

    levelOrderQueue (node = this.root, level, res){
        // If node is null, abort.
        if (!node) return;
        // If current level is higher than current res array depth, push a new array
        if (res.length <= level) res.push([]);
        // Push current node into current levels array.
        res[level].push(node.data);
        // Recursively run for left and right nodes.
        this.levelOrderQueue(node.left, level + 1, res);
        this.levelOrderQueue(node.right, level + 1, res);
    }
}
