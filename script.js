function Todo(name) {
  this.name = name;
  this.completed = false;
  this.editing = false;
}

var app = new Vue({
  el: '#todoApp',
  data: {
    filter: 'all',
    newTodoName: '',
    editingTodoName: null,
    todoCollection: [
      new Todo('todo1'),
      new Todo('todo2'),
      new Todo('todo3'),
      new Todo('todo4'),
      new Todo('todo5'),
    ]
  },
  methods: {
    onDblClickTodoName: function (todo) {
      if(todo.completed) {
        return;
      }
      todo.editing = true;
      this.editingTodoName = todo.name;
    },

    onEnterTodoName: function (todo) {
      todo.editing = false;
      todo.name = this.editingTodoName;
      this.editingTodoName = null;
    },

    onCancelTodoName: function(todo) {
      todo.editing = false;
      this.editingTodoName = null;
    },

    onEnterAddTodo: function() {
      if(!this.newTodoName) {
        return;
      }
      this.todoCollection.push(new Todo(this.newTodoName));
      this.newTodoName = '';
    },

    onClickAllDone: function () {
      this.todoCollection.filter(function(todo){
        todo.completed = true;
      });
    },

    setFilter: function (filter) {
        this.filter = filter;
    },

    getFilterButtonClass: function(filter) {
      return {
        'btn-outline-secondary': filter !== this.filter,
        'btn-secondary': filter === this.filter,
      };
    },

    onClickRemoveCompleted: function () {
      this.todoCollection = this.todoCollection.filter(function(todo){
        return !todo.completed;
      })
    },
  },
  computed: {
    counter: function () {
      return this.todoCollection.length;
    },

    filteredTodoCollection: function () {
      var vm = this;
      return vm.todoCollection.filter(function (todo) {
        switch(vm.filter) {
          case 'all':
            return true;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
        }
      });
    }
  }
});
