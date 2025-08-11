export function shuffleArray(array: any) {
  let seen = new Set();
  let resultArray = [];
  while (resultArray.length < array.length) {
    let randomIndex = Math.floor(Math.random() * array.length);
    if (!seen.has(randomIndex)) {
      seen.add(randomIndex);
      resultArray.push(array[randomIndex]);
    }
  }
  return resultArray;
}
