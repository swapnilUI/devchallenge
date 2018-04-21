import {STOMP_URL, TOPIC_URL} from './config';
import api from './services/stompApi';
import dataService from './services/dataService';
import view from './view';

const dataApi = dataService();
const stompApi = api();
const tableView = view(document.getElementById("tableDiv"));

//Connect stomp and prices service
const subscribeTopic = () => {
  stompApi.getTopics(TOPIC_URL,getMessage)
}
const getMessage = message => {
  dataApi.addNewData(JSON.parse(message.body));
  tableView.renderTable(dataApi.getData());
}

stompApi.stompConnect(STOMP_URL, subscribeTopic)
