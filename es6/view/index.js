function computeRowHtml(rowData) {
	const name = `<td>${rowData.name}</td>`;
	const bestBid = `<td>${rowData.bestBid}</td>`;
	const bestAsk = `<td>${rowData.bestAsk}</td>`;
	const lastChangeBid = `<td>${rowData.lastChangeBid}</td>`;
	const lastChangeAsk = `<td>${rowData.lastChangeAsk}</td>`;
	const midPrice = `<td id="${rowData.name}"></td>`;

	return `<tr>${name}${bestBid}${bestAsk}${lastChangeBid}${lastChangeAsk}${midPrice}</tr>`;
}

function computeTableHtml(data) {
	let html = '';

	data.forEach((item) => {
		html += computeRowHtml(item);
	});

	return html;
}

function createGraph(id, list) {
	window.Sparkline.draw(document.getElementById(id), list);
}

function createTableGraphs(list) {
	list.forEach((item) => {
		createGraph(item.name, item.midPriceList.map((midPriceItem) => midPriceItem.value));
	});
}

function render(el, data) {
	el.innerHTML = computeTableHtml(data);
	//createTableGraphs(data);
}

export default function (container) {
	const table = document.createElement('table');
	container.appendChild(table);

	return {
		renderTable: (data) => render(table, data)
	};
}
