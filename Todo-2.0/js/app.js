/* eslint-disable max-len */
/* eslint-disable func-names */
(function () {
  const $inputTodo = document.querySelector('.input-todo');
  const $todos = document.querySelector('.todos');
  const $completeAll = document.querySelector('#ck-complete-all');
  const $clearCompleted = document.querySelector('.clear-completed');
  const $completedTodos = document.querySelector('.completed-todos');
  const $activeTodos = document.querySelector('.active-todos');
  const $nav = document.querySelector('.nav');
  let menuFlag = 'all';
  let todos = [];

  function render() {
    let html = '';

    function generateHTML(todoList) {
      let newHtml = '';
      todoList.forEach(({ id, content, completed }) => {
        newHtml += `<li id="${id}" class="todo-item">
        <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
        </li>`;
      });
      return newHtml;
    }

    if (menuFlag === 'all') {
      html = generateHTML(todos);
    } else {
      html = generateHTML(todos.filter(({ completed }) => (menuFlag === 'active' ? !completed : completed)));
    }

    $todos.innerHTML = html;
    $completedTodos.textContent = todos.filter(({ completed }) => completed).length;
    $activeTodos.textContent = todos.filter(({ completed }) => !completed).length;
  }

  function generateId() {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

  function addTodo(content) {
    todos = [{ id: generateId(), content, completed: false }, ...todos];
    render();
  }

  function completeTodo(targetID) {
    todos = todos.map(todo => (todo.id === +targetID ? (Object.assign({}, todo, { completed: !todo.completed })) : todo));
    render();
  }

  function removeTodo(targetID) {
    todos = todos.filter(todo => todo.id !== +targetID);
    render();
  }

  function completeAllTodos(complete) {
    todos = todos.map(todo => Object.assign({}, todo, { completed: complete.checked }));
    render();
  }

  function clearCompletedTodos() {
    todos = todos.filter(todo => !todo.completed);
    render();
  }

  $inputTodo.addEventListener('keyup', (e) => {
    const content = $inputTodo.value.trim();
    if (content === '' || e.keyCode !== 13) return;
    addTodo(content);
    $inputTodo.value = '';
  });

  $todos.addEventListener('change', (e) => {
    completeTodo(e.target.parentNode.id);
  });

  $todos.addEventListener('click', (e) => {
    if (!e.target.classList.contains('remove-todo')) return;
    removeTodo(e.target.parentNode.id);
  });

  $completeAll.addEventListener('click', (e) => {
    completeAllTodos(e.target);
  });

  $clearCompleted.addEventListener('click', clearCompletedTodos);

  $nav.addEventListener('click', (e) => {
    [...$nav.children].forEach(navItem => navItem.classList.remove('active'));
    e.target.classList.add('active');
    menuFlag = e.target.id;
    render();
  });
}());
