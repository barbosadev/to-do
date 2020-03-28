function novaTarefa(){
    var hoje = Date(Date.now());
    hoje = hoje.toString();
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
    tarefas.innerHTML = txtTarefa.value +  "<br/>" + tarefas.innerHTML;
    txtTarefa.value = "";
}