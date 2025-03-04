import Tree from "./tree.js";

const testArray = [4, 7, 5, 2, 9, 1, 8, 3];
const BST = new Tree(testArray);
BST.prettyPrint();
// console.log(BST.find(6));
// BST.insert(6);
// console.log(BST.find(6));
// BST.prettyPrint();
// BST.deleteItem(4);
// BST.prettyPrint();

function printNodeValue(value){
    console.log(value);
}
BST.levelOrder(printNodeValue);