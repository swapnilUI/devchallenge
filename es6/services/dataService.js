import utils from '../utils';
const func = utils();
const addData = (newData,allData) => {
    const checkIfExist = allData.find(item => item.name === newData.name);
    if(!checkIfExist){
      const tempArray = [func.restructureItem(newData)]
      return func.sortData(allData.concat(tempArray));
    }else {
      const currentDataIndex = allData.indexOf(checkIfExist),
            slicedArrayTillMatached = allData.slice(0,currentDataIndex),
            restOfArrayElements = allData.slice(currentDataIndex + 1),
            newStructuredData = func.restructureItem(newData,checkIfExist),
            newDataArray = [].concat(slicedArrayTillMatached).concat(newStructuredData).concat(restOfArrayElements);
      return func.sortData(newDataArray);
    }
}

export default function(){
    let allData = [];
    return{
      addNewData: data => {
        allData = addData(data, allData);
      },
      getData: () => allData
    }
}
