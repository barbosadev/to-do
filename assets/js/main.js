var firebaseConfig = {
  apiKey: "AIzaSyAqwmSRNVq5AXm3REP0xZJCV8_kmX_SO8w",
  authDomain: "to-do-e23e1.firebaseapp.com",
  databaseURL: "https://to-do-e23e1.firebaseio.com",
  projectId: "to-do-e23e1",
  storageBucket: "to-do-e23e1.appspot.com",
  messagingSenderId: "237197502832",
  appId: "1:237197502832:web:0b22aeb3f727ff876347b5"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let tarefas=[];
let ids = [];

new Vue ({
  el: '#app',
  data: {
    inputShow: false,
    inputTodo: '',
    todos: tarefas,     
  },
  mounted(){
    db.collection("tarefas").orderBy("data", "asc").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var jaExiste = false;
        ids.forEach((id)=>{ if(doc.id == id){ jaExiste = true; } }); // Verifica se a tarefa já está no Array para não repetir

        /*tarefas.forEach((tarefa)=>{
          if((tarefa.id == doc.id) && (tarefa.id == doc.id || tarefa.tarefa != doc.tarefa || tarefa.pendente != doc.pendente)){
            tarefa.tarefa = doc.tarefa;
            tarefa.pendente = doc.pendente;
            jaExiste = true;
          }
        });
        */
        if(!jaExiste){ // Adiciona ao Array somente tarefas que não estão nele
          tarefas.unshift({
            'id': doc.id,
            'tarefa': doc.data().tarefa,
            'pendente': doc.data().pendente,
          });
          ids.push(doc.id);
        }
        //id.push(doc.data().id);
        console.log(doc.id);
      });
      //console.log("itens: ", tarefas.join(" ,"));    
      //console.log("itens: ", tarefas.join(" ,"));      
    });
  },
  methods: {
    openInput: function (){
      this.inputShow = !this.inputShow; 
      setTimeout(() => {
        this.$refs.inputdo.focus();
      }, 0);
    },
    addTodo: function(){

      //Animação do primeiro card após inserção.
      let cardum = document.querySelector(".card:first-child");
      cardum.style.animation = "";
      setTimeout(() => cardum.style.animation = "0.4s ease-out 0s 1 slideInFromLeft", 5);


      this.inputShow = !this.inputShow; 
      if(this.inputTodo != ''){
        //this.todos.push(this.inputTodo);
        let hoje = Date(Date.now());
        hoje = hoje.toString();
        db.collection("tarefas").add({
          tarefa: this.inputTodo,
          autor: "Lovelace",
          pendente: true,
          data: hoje
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
        this.inputTodo = '';
      } 
    },
    editPendente: function(id, estadoAtual){
      console.log(id);
      db.collection("tarefas").doc(id).update({
        pendente: !estadoAtual
      });
    },
  }
});