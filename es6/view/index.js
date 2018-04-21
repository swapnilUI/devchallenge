const createRows = (rowData) => {
	return `<tr><td>${rowData.name}</td>
          <td>${rowData.bestBid}</td>
          <td>${rowData.bestAsk}</td>
          <td>${rowData.lastChangeBid}</td>
          <td>${rowData.lastChangeAsk}</td>
          <td id="${rowData.name}"></td></tr>`;
}

const tableRows = (data) => {
	let html = '';

	data.forEach((item) => {
		html += createRows(item);
	});

	return html;
}

const createSparkLine = (id, list) => {
	window.Sparkline.draw(document.getElementById(id), list);
}

const insertSparkline = (data) => {
	data.forEach((item) => {
		createSparkLine(item.name, item.midPrices.map((price) => price.value));
	});
}

const render = (el, data) => {
	el.innerHTML = tableRows(data);
	insertSparkline(data);
}

export default function (container) {
	const tbody = document.createElement('tbody');
	container.appendChild(tbody);

	return {
		renderTable: (data) => render(tbody, data)
	};
}
