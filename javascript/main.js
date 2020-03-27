new Vue ({
    el: '#app',
    data: {
        inputShow: false,
       inputTodo: '',
       todos: ['Fazer os cards', 'Comprar leite', 'Comprar uma mesa', 'Ler um livro'],
       
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
              
            if(this.inputTodo != '')
            {
            this.todos.push(this.inputTodo);
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




