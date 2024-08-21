            var todoForm = document.getElementById('todo-form');
            var todoInput = document.getElementById('todo-input');
            var todoList = document.getElementById('todo-list');
            var todos = [];

            function saveTodos() {
                localStorage.setItem('todos', JSON.stringify(todos));
            }

            function loadTodos() {
                var storedTodos = localStorage.getItem('todos');
                if (storedTodos) {
                    todos = JSON.parse(storedTodos);
                }
            }

            function renderTodos() {
                todoList.innerHTML = '';
                for (var i = 0; i < todos.length; i++) {
                    var todo = todos[i];
                    var li = document.createElement('li');
                    li.className = 'todo-item';
                    li.innerHTML = '<span class="text">' + todo + '</span>' +
                       '<button class="edit-btn">Edit</button>' +
                       '<button class="delete-btn">Delete</button>';

                    (function(index) {
                        li.querySelector('.edit-btn').onclick = function() {
                            var newText = prompt("Edit the todo:", todos[index]);
                            if (newText !== null) {
                                todos[index] = newText.trim();
                                saveTodos();
                                renderTodos();
                            }
                        };

                        li.querySelector('.delete-btn').onclick = function() {
                            todos.splice(index, 1);
                            saveTodos();
                            renderTodos();
                        };
                    })(i);

                    todoList.appendChild(li);
                }
            }

            function addTodo(text) {
                todos.push(text);
                saveTodos();
                renderTodos();
            }

            todoForm.onsubmit = function(e) {
                e.preventDefault();

                var todoText = todoInput.value.trim();
                if (todoText) {
                    addTodo(todoText);
                    todoInput.value = '';
                }
            };

            loadTodos();
            renderTodos();
