const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}
const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const TODOS={
  todos:[],
  todoList:'',
  getCount(){
    return this.todos.length
  },
  updateSelection(id){
    let selection=document.getElementById('selection_'+id).checked
    this.todos.filter(f=>f.id==id)[0].isSelected=selection
    uncheckedCountSpan.innerText=TODOS.getPendingTodosCount()
  },
  getPendingTodosCount(){
    return this.todos.filter(f=>f.isSelected==0).length
  },
  updateTodoList(){
    this.todoList=''
    this.todos.map(createLI)
    list.innerHTML=this.todoList
    uncheckedCountSpan.innerText=TODOS.getPendingTodosCount()
    itemCountSpan.innerText=TODOS.getCount()
  },
  removeTodo(id){
    let indexToDel=this.todos.findIndex(f=>f.id==id)
    this.todos.splice(indexToDel,1)
    this.updateTodoList()
  },
  addTodo(todo){
    this.todos.push(todo)
    this.updateTodoList()
  }
}

let ctr=0

function newTodo(text) {
  let note=prompt('Enter to do text')
  let todo={
    id:++ctr,
    text:note,
    isSelected:0
  }
 TODOS.addTodo(todo)
}
function createLI(todo){
  let checked=todo.isSelected==0?false:true
  if(checked){
    TODOS.todoList+= `<li>
  <input id='selection_${todo.id}' checked onClick='TODOS.updateSelection(${todo.id})' type='checkbox'/>
  <span>${todo.text}</span>
  <button id='btn_${todo.id}' onClick='TODOS.removeTodo(${todo.id})' >Delete</button>
  </li>`
  }
  else{
    TODOS.todoList+= `<li>
  <input id='selection_${todo.id}' onClick='TODOS.updateSelection(${todo.id})' type='checkbox'/>
  <span>${todo.text}</span>
  <button id='btn_${todo.id}' onClick='TODOS.removeTodo(${todo.id})' >Delete</button>
  </li>`
  }
  
}

