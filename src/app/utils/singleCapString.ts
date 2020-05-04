function singleCapString(str: string): string {
  const arr = str.toLowerCase().split('');
  arr[0] = arr[0].toUpperCase();

  return arr.join('');
}

export default singleCapString;
