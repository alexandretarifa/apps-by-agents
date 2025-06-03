document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const newTodoInput = document.getElementById('new-todo');
  const addButton = document.getElementById('add-button');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'todo-item';
      if (todo.completed) li.classList.add('completed');

      const text = document.createElement('span');
      text.className = 'text';
      text.textContent = todo.text;

      const btnGroup = document.createElement('div');
      btnGroup.className = 'btn-group';

      const completeBtn = document.createElement('button');
      completeBtn.className = 'complete-btn';
      completeBtn.innerHTML = todo.completed ? '↺' : '✔';
      completeBtn.title = todo.completed ? 'Mark as incomplete' : 'Mark as complete';
      completeBtn.addEventListener('click', () => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '✖';
      deleteBtn.title = 'Delete todo';
      deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      btnGroup.appendChild(completeBtn);
      btnGroup.appendChild(deleteBtn);

      li.appendChild(text);
      li.appendChild(btnGroup);
      todoList.appendChild(li);
    });
  }

  addButton.addEventListener('click', () => {
    const text = newTodoInput.value.trim();
    if (text !== '') {
      todos.push({ text, completed: false });
      saveTodos();
      renderTodos();
      newTodoInput.value = '';
      newTodoInput.focus();
    }
  });

  newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addButton.click();
    }
  });

  renderTodos();
});