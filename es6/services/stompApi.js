let stompClient;

const stompConnect = (url,callback) => {
  stompClient = Stomp.client(url);
  stompClient.connect({},callback);
}

const getTopics = (url,callback) =>{
  stompClient.subscribe(url,callback);
}

export default function(){
    return{
      stompConnect,
      getTopics
    }
}
