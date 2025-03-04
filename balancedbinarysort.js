import Node from "./node.js";

export default function balancedBinarySort (array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    if (array.length === 1) return array;
    const middleIndex = Math.floor((start + end) / 2);
    const root = new Node(array[middleIndex]);
    root.left = balancedBinarySort (array, start, middleIndex - 1);
    root.right = balancedBinarySort (array, middleIndex + 1, end);
    return root
}