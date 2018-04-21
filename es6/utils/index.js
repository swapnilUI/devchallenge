const sortData = (data) => {
    return data.sort((a,b) => b.lastChangeBid - a.lastChangeBid)
}
const getmidPrice = (data) => {
	return (data.bestBid + data.bestAsk) / 2;
}

const checkPriceTime = (list, currentTime) => {
	return list.filter((item) => currentTime - item.time <= 30000);
}

const restructureItem = (newData, currentItem) => {
	const currentTime = Date.now();
  const midPriceArray = currentItem ? checkPriceTime(currentItem.midPrices, currentTime) : [];
	return Object.assign(
		{},
		currentItem || {},
		newData,
		{
			midPrices: []
				.concat(midPriceArray)
				.concat([
					{
						time: currentTime,
						value: getmidPrice(newData)
					}
				])
		}
	);
}

export default function(){
  return {
    sortData,
    getmidPrice,
    checkPriceTime,
    restructureItem
  }
}
