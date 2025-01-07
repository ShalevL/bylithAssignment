export function loadImage(url) {
  return `https://fedtest.bylith.com/api/imager.php?url=${url}&type=fit&width=1000&height=1000&quality=70`;
}

export function arraysMatch(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArray1 = array1.map((obj) => JSON.stringify(obj)).sort();
  const sortedArray2 = array2.map((obj) => JSON.stringify(obj)).sort();

  return sortedArray1.every((item, index) => item === sortedArray2[index]);
}

export function containsObject(array, objectToCheck) {
  return array.some(
    (item) =>
      item.attribute_id === objectToCheck.attribute_id &&
      item.label_id === objectToCheck.label_id
  );
}
