export function objectToSelectOptions(data,key,value){
  const result = data.map(row => ({
    key: row[key],
    value: row[value]
  }));
  return result;
}
