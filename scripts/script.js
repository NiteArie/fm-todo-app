(() => {
    var todos = [
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

    var todoIDCounter = todos.length;

    var filteredTodos = []

    const todoFormElement = document.querySelector(".js-todo-form");
    const todoFormInputElement = document.querySelector(".js-todo-input");

    const todoListElement = document.querySelector(".js-todo-list");
    const todoCounterElement = document.querySelector(".js-todo-left");

    const filterTodoLinkElements = Array.from(document.querySelectorAll(".js-filter"));
    const filterActiveTodoElement = document.querySelector(".js-filter-active");
    const filterCompletedTodoElement = document.querySelector(".js-filter-completed");
    const filterAllTodoElement = document.querySelector(".js-filter-all");
    const clearAllCompletedTodoElement = document.querySelector(".js-clear-completed");

    const themeTogglerElement = document.querySelector(".js-theme-toggler");
    const themeTogglerIconElement = document.querySelector(".js-theme-toggler-icon");

    var darkThemeState = true;

    renderTodos(todos);
    renderTodoCounter();

    todoFormElement.addEventListener("submit", (event) => {
        event.preventDefault();

        let todo = todoFormInputElement.value;

        if ( todo && todo.trim() != "" ) {

            todoFormInputElement.value = "";

            todoIDCounter += 1;

            let todoObject = {
                id: todoIDCounter,
                title: todo,
                status: false,
            };

            todos = [...todos, todoObject];

            renderTodo(todoObject);
            renderTodoCounter();
        } else {

        }
    })


    filterActiveTodoElement.addEventListener("click", function (event) {
        filteredTodos = todos.filter((todo) => !todo.status );

        clearActiveFilterLinkElements();
        activeFilterLinkElement(this);
        clearTodoElements();
        renderTodos(filteredTodos);
    })

    filterCompletedTodoElement.addEventListener("click", function (event) {
        filteredTodos = todos.filter(todo => todo.status);

        
        clearActiveFilterLinkElements();
        activeFilterLinkElement(this);
        clearTodoElements();
        renderTodos(filteredTodos);
    })

    filterAllTodoElement.addEventListener("click", function (event) {
        filteredTodos = [...todos];

        clearActiveFilterLinkElements();
        activeFilterLinkElement(this);
        clearTodoElements();
        renderTodos(filteredTodos);
    })

    clearAllCompletedTodoElement.addEventListener("click", (event) => {
        todos = todos.filter((todo) => !todo.status)

        clearTodoElements();
        renderTodos(todos);
    })

    themeTogglerElement.addEventListener("click", (event) => {
        darkThemeState = !darkThemeState;


        var themeElements = Array.from(document.querySelectorAll(".js-theme"));

        var themeClasses = [];

        themeElements.forEach((themeElement) => {
            let themeClassRegex = /^(\w+)?--(dark|light)$/;

            Array.from(themeElement.classList).forEach((themeElementClass) => {
                let matchResult = themeElementClass.match(themeClassRegex);

                if (matchResult) {
                    themeElement.classList.remove(themeElementClass);
                    themeClasses.push(matchResult[1]);
                }
                
            })
        });

        function changeThemeToTheme(themeMode) {
            themeElements.forEach((themeElement) => {
                
                themeClasses.forEach((themeClass) => {
                    if (Array.from(themeElement.classList).includes(themeClass)) {
                        themeElement.classList.add(`${themeClass}--${themeMode}`);
                    }
                })
    
            })
        }

        if (darkThemeState) {

            themeTogglerIconElement.src = "images/icon-sun.svg";

            changeThemeToTheme("dark");

        } else {
            themeTogglerIconElement.src= "images/icon-moon.svg";

            changeThemeToTheme("light");
        }
    })

    

    function clearActiveFilterLinkElements() {
        filterTodoLinkElements.forEach((filterTodoLinkElement) => {
            filterTodoLinkElement.classList.remove("todo__link--active");
        })
    }

    function activeFilterLinkElement(linkElement) {
        linkElement.classList.add("todo__link--active");
    }

    function renderTodo(todo) {
        todoListElement.appendChild(createTodoElement(todo));
    }

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

        todoItemElement.classList.add("todo__item", `todo__item${darkThemeState ? "--dark" : "--light"}`, "js-theme");
        todoFormElement.classList.add("todo__form");
        todoShowElementContainer.classList.add("todo__show");
        todoCheckBoxElement.classList.add("todo__checkbox");
        todoLabelElement.classList.add("todo__label", `todo__label${darkThemeState ? "--dark" : "--light"}`, "js-theme");
        todoContentElement.classList.add("todo__content", `todo__content${darkThemeState ? "--dark" : "--light"}`, "js-theme");
        todoRemoveElement.classList.add("todo__remove");
        todoCloseElement.classList.add("todo__close");

        todoCheckBoxElement.type = "checkbox";

        todoCheckBoxElement.id = `checkbox${todo.id}`;
        todoCheckBoxElement.checked = todo.status;

        todoLabelElement.setAttribute("for", todoCheckBoxElement.id);

        todoContentElement.textContent = todo.title;

        todoRemoveElement.setAttribute("type", "button");

        todoCloseElement.src = "images/icon-cross.svg";

        todoCheckBoxElement.addEventListener("change", function (event) {
            updateTodoStatus(todo.id, this.checked);
            renderTodoCounter();
        })

        todoRemoveElement.addEventListener("click", (event) => {
            removeTodo(todo.id);
        })

        todoShowElementContainer.append(todoCheckBoxElement, todoLabelElement, todoContentElement);
        todoRemoveElement.appendChild(todoCloseElement);
        todoFormElement.append(todoShowElementContainer, todoRemoveElement);
        todoItemElement.appendChild(todoFormElement);

        return todoItemElement;
    }

    function removeTodo(todoID) {
        todos = todos.filter(todo => todo.id != todoID);

        clearTodoElements();
        renderTodos(todos);
        renderTodoCounter();
    }

    function updateTodoStatus(todoID, status) {
        let todo = todos.find((todo) => todoID == todo.id);
        
        todo.status = status;

        console.log(todos);
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