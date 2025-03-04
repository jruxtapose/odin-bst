export default function pruneDuplicates(sortedArray){
    if (sortedArray.length === 0) return [];
    const uniqueArray = [sortedArray[0]];
    for (let i = 1; i < sortedArray.length; i++){
        if(sortedArray[i] !== sortedArray[i - 1]){
            uniqueArray.push(sortedArray[i]);
        }
    }
    return uniqueArray;
}
