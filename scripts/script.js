(() => {
    const todos = [
        {
            id: 1,
            title: "Complete online Javascript course",
            status: true,
        },
        {
            id: 2,
            title: "Jog around the park 3x",
            status: false,
        }, 
        {
            id: 3,
            title: "10 minutes meditation",
            status: false,
        },
        {
            id: 4,
            title: "Read for 1 hour",
            status: false,
        },
        {
            id: 5,
            title: "Pick up groceries",
            status: false,
        },
        {
            id: 6,
            title: "Complete Todo App on Frontend Mentor",
            status: false,
        }
    ];

    var filteredTodos = []

    const todoFormElement = document.querySelector(".js-todo-form");
    const todoFormInputElement = document.querySelector(".js-todo-input");

    const todoListElement = document.querySelector(".js-todo-list");
    const todoCounterElement = document.querySelector(".js-todo-left");

    const filterActiveTodoElement = document.querySelector(".js-filter-active");
    const filterCompletedTodoElement = document.querySelector(".js-filter-completed");
    const filterAllTodoElement = document.querySelector(".js-filter-all");

    // todoFormElement.addEventListener("submit", (event) => {
    //     event.preventDefault();

    //     let todo = todoFormInputElement.textContent;

    //     if ( todo && todo.trim() != "" ) {

    //     }
    // })

    renderTodos(todos);
    renderTodoCounter();

    filterActiveTodoElement.addEventListener("click", (event) => {
        filteredTodos = todos.filter((todo) => !todo.status );

        clearTodoElements();
        renderTodos(filteredTodos);
    })

    filterCompletedTodoElement.addEventListener("click", (event) => {
        filteredTodos = todos.filter(todo => todo.status);

        clearTodoElements();
        renderTodos(filteredTodos);
    })

    filterAllTodoElement.addEventListener("click", (event) => {
        filteredTodos = [...todos];

        clearTodoElements();
        renderTodos(filteredTodos);
    })

    function renderTodos(todos) {
        todos.forEach((todo) => {
            todoListElement.appendChild(createTodoElement(todo));
        })
    }

    function clearTodoElements() {
        todoListElement.textContent = "";
    }

    function createTodoElement(todo) {
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

        todoCheckBoxElement.id = `checkbox${todo.id}`;
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

    function renderTodoCounter() {
        let todoLeftCounter = todos.reduce((accumulator, todo) => {
            if ( !todo.status ) {
                return ++accumulator;
            }
            return accumulator;
        }, 0);

        todoCounterElement.textContent = 
            (todoLeftCounter > 1 ? `${todoLeftCounter} items left` : `${todoLeftCounter} item left`);
    }
})();