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

new Vue ({
  el: '#app',
  data: {
    inputShow: false,
    inputTodo: '',
    todos: tarefas,     
  },
  mounted(){
    db.collection("tarefas").orderBy("data", "desc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tarefas.push(`${doc.data().tarefa}`);
      });
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
      this.inputShow = !this.inputShow; 
      if(this.inputTodo != ''){
        this.todos.push(this.inputTodo);
 
        let hoje = Date(Date.now());
        hoje = hoje.toString();
        db.collection("tarefas").add({
          tarefa: this.inputTodo,
          autor: "Lovelace",
          estado: "Fazer",
          data: hoje
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
        this.inputTodo = ''; 
      } 
    },
  }, 
  computed: {
    isValid: function () {
      return this.inputTodo.length > 0;
    }
  }  
});