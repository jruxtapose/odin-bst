export default function pruneDuplicates(sortedArray){
    const arrayCopy = [...sortedArray];
    for (let i = 0; i < arrayCopy.length - 1; i++){
        while (i < arrayCopy.length - 1 && arrayCopy[i] === arrayCopy[i + 1]){
            arrayCopy.splice(i, 1);
        }
    }
    return arrayCopy;
}