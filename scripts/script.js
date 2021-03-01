(() => {
    const todos = [
        {
            title: "Complete online Javascript course",
            status: true,
        },
        {
            title: "Jog around the park 3x",
            status: false,
        }, 
        {
            title: "10 minutes meditation",
            status: false,
        },
        {
            title: "Read for 1 hour",
            status: false,
        },
        {
            title: "Pick up groceries",
            status: false,
        },
        {
            title: "Complete Todo App on Frontend Mentor",
            status: false,
        }
    ];

    const todoFormElement = document.querySelector(".js-todo-form");
    const todoFormInputElement = document.querySelector(".js-todo-input");

    const todoListElement = document.querySelector(".js-todo-list");

    // todoFormElement.addEventListener("submit", (event) => {
    //     event.preventDefault();

    //     let todo = todoFormInputElement.textContent;

    //     if ( todo && todo.trim() != "" ) {

    //     }
    // })

    renderTodos();

    function renderTodos() {
        todos.forEach((todo, index) => {
            todoListElement.appendChild(createTodoElement(todo, index));
        })
    }

    function createTodoElement(todo, index) {
        var todoItemElement = document.createElement("li");
        var todoFormElement = document.createElement("form");
        var todoShowElementContainer = document.createElement("div");
        var todoCheckBoxElement = document.createElement("input");
        var todoLabelElement = document.createElement("label");
        var todoContentElement = document.createElement("p");
        var todoRemoveElement = document.createElement("button");
        var todoCloseElement = document.createElement("img");

        todoItemElement.classList.add("todo__item");
        todoFormElement.classList.add("todo__form");
        todoShowElementContainer.classList.add("todo__show");
        todoCheckBoxElement.classList.add("todo__checkbox");
        todoLabelElement.classList.add("todo__label");
        todoContentElement.classList.add("todo__content");
        todoRemoveElement.classList.add("todo__remove");
        todoCloseElement.classList.add("todo__close");

        todoCheckBoxElement.type = "checkbox";

        todoCheckBoxElement.id = `checkbox${index}`;
        todoCheckBoxElement.checked = todo.status;

        todoLabelElement.setAttribute("for", todoCheckBoxElement.id);

        todoContentElement.textContent = todo.title;

        todoCloseElement.src = "../images/icon-cross.svg";

        todoShowElementContainer.append(todoCheckBoxElement, todoLabelElement, todoContentElement);
        todoRemoveElement.appendChild(todoCloseElement);
        todoFormElement.append(todoShowElementContainer, todoRemoveElement);
        todoItemElement.appendChild(todoFormElement);

        return todoItemElement;
    }
})();