var btnNovaTarefa = document.querySelector("#novaTarefa");
btnNovaTarefa.addEventListener("click", novaTarefa);

var tarefas = document.querySelector("#tarefas");

var data = new Date();
hoje = data.getDate() + '/' + (data.getMonth() +1) + '/' + data.getFullYear();

var firebaseConfig = {
    apiKey: "AIzaSyAqwmSRNVq5AXm3REP0xZJCV8_kmX_SO8w",
    authDomain: "to-do-e23e1.firebaseapp.com",
    databaseURL: "https://to-do-e23e1.firebaseio.com",
    projectId: "to-do-e23e1",
    storageBucket: "to-do-e23e1.appspot.com",
    messagingSenderId: "237197502832",
    appId: "1:237197502832:web:0b22aeb3f727ff876347b5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function atualizarTarefas(){
    tarefas.innerHTML = "";
    db.collection("tarefas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tarefas.innerHTML += `${doc.data().tarefa} - ${doc.data().data}` + '<br/>';
        });
    });
}

function novaTarefa(tarefa){
    var txtTarefa = document.querySelector("#txtNovaTarefa");
    db.collection("tarefas").add({
        tarefa: txtTarefa.value,
        autor: "Lovelace",
        estado: "Fazer",
        data: hoje
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
    txtTarefa.value = "";
    atualizarTarefas();
}

atualizarTarefas();