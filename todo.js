// TODO LİST PROJECT

// Select the all elements
const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');

// All event listeners
eventListeners();

function eventListeners() {
    form.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
    secondCardBody.addEventListener('click', deleteTodo);
    filter.addEventListener('keyup', filterTodos);
    clearButton.addEventListener('click', clearAllTodos);
}

// Add todo Or Alert
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === '') {
        showAlert('danger', 'Lütfen bir todo girin...');
    }else if(getTodosFromLocalStorage().indexOf(newTodo) !== -1) {
        showAlert('danger', 'Bu todo zaten var...');
    }else {
        addTodoToUI(newTodo);
        addTodoToLocalStorage(newTodo);
        showAlert('success', 'Todo başarıyla eklendi...');
    }

    e.preventDefault();
}

// Load all todos to UI
function loadAllTodosToUI() {
    let todos = getTodosFromLocalStorage();

    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

// Delete todo
function deleteTodo (e) {
    if (e.target.className === 'fa fa-remove') {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromLocalStorage(e.target.parentElement.parentElement.textContent);
        showAlert('success', 'Todo başarıyla silindi...');
    }
}

// Filter todos
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.list-group-item');

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute('style', 'display: none !important');
        } else {
            listItem.setAttribute('style', 'display: block');
        }
    });
}

// Clear all todos
function clearAllTodos(e) {
    if (confirm('Tümünü silmek istediğinize emin misiniz?')) {
        while (todoList.firstElementChild !== null) {
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem('todos');
    }

    e.preventDefault();
}

// Delete todo from Local Storage
function deleteTodoFromLocalStorage(deletedTodo) {
    let todos = getTodosFromLocalStorage();

    todos.forEach(function(todo, index) {
        if (todo === deletedTodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}


// Show Alert
function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function() {
        alert.remove();
    }, 2000);
}

// Add todo to UI
function addTodoToUI(newTodo) {

    // Create a new li element
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between';
    
    // Create a new a element
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'delete-item';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Add text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Add listItem to todoList
    todoList.appendChild(listItem);
    todoInput.value = '';
}

// Add todo to Local Storage
function addTodoToLocalStorage(newTodo) {
    let todos = getTodosFromLocalStorage();

    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get todos from Local Storage
function getTodosFromLocalStorage() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}