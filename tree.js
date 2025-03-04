import Node from "./node.js";
import mergeSort from "./mergesort.js";
import pruneDuplicates from "./prune.js";
import balancedBinarySort from "./balancedbinarysort.js";

export default class Tree {
    constructor(array){
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const sortedArray = mergeSort(array);
        const prunedArray = pruneDuplicates(sortedArray);
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
        if (this.find(value) === null) throw new Error ('Value does not exist.')
        let current = node;
        let parent = null;
        while (current !== null) {
            if (value === current.data) {
                break;
            } else if (value < current.data) {
                parent = current;
                current = current.left;
            } else {
                parent = current;
                current = current.right;
            }
        }

        if (current.left === null && current.right === null) {
            //Node has no children
            if (parent === null) {
                this.root = null;
            } else if (parent.left  === current) {
                parent.left = null;
            } else {
                parent.right = null;
            }   
        } else if (current.left === null || current.right === null) {
            //Node has one child.
            const child = current.left !== null ? current.left : current.right;
            if (parent === null) {
                this.root = child;
            } else if (parent.left === current) {
                parent.left = child;
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
        if (node === null) return null;
        if (node.data === value) return node;
        if (value < node.data) return this.find(value, node.left);
        if (value > node.data) return this.find(value, node.right);
    }

    levelOrder (callback) {
    }
}
