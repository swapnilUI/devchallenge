const addData = (newData,allData) => {

    const checkIfExist = allData.find(item => item.name === newData.name);
    if(!checkIfExist){
      let tempArray = [newData]
      return allData.concat(tempArray);
    }else {
      let currentDataIndex = allData.indexOf(checkIfExist);
      let slicedArrayTillMatached = allData.slice(0,currentDataIndex);
      let restOfArrayElements = allData.slice(currentDataIndex + 1);
      let newDataArray = [].concat(slicedArrayTillMatached).concat(newData).concat(restOfArrayElements);
      return newDataArray;
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
