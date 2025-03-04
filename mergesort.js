export default function mergeSort(array){
    const arrayCopy = array.slice();
    if (arrayCopy.length < 2) return arrayCopy;
    const midPoint = Math.floor(arrayCopy.length / 2);
    const left = arrayCopy.splice(0, midPoint);
    return merge(mergeSort(left), mergeSort(arrayCopy));
}

function merge(left, right){
    let returnArray = [];
    while(left.length && right.length) {
        if(left[0] < right[0]){
            returnArray.push(left.shift());
        } else {
            returnArray.push(right.shift());
        }
    }
    return [...returnArray, ...left, ...right]
}