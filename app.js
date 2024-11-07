//GLOBAL VARIABLES
const todosListElement = document.querySelector(".todos__list");
const inputFormElement = document.querySelector(".input__form");
let todosList = JSON.parse(localStorage.getItem("list")) || [];
//UI CLASS INSTANCE
class TodoAppUI {
    //RENDER LIST
    renderList(){
        const list = todosList.map(item => {
            return `<li id=${item.id} class="todo__item ${item.checked === true ? "todo__checked" : ""}">
                <p>${item.text}</p>
                <button class="check ${item.checked === true ? "button__checked" : ""}">
                    ${item.checked === true ? "Выполнено" : "В процессе"}
                </button>
                <button class="edit">Ред.</button>
                <button class="delete">Удалить</button>
            </li>`
        }).reverse().join("");

        todosListElement.innerHTML = list;
        const todosItemsElements = todosListElement.querySelectorAll(".todo__item");
        todoAppUIClass.setLocalStorage();
        inputFormElement.addEventListener("submit", todoAppUIClass.addTodo);
        
        todosItemsElements.forEach(item => {
            item.addEventListener("click", todoAppUIClass.check);
        });
    }
    //ADD NEW TODO
    addTodo(e){
        e.preventDefault();

        if (!e.target.text.value) {
            return;
        }

        if (e.target.add__button.innerHTML === "Добавить"){
            const todo = {
                id: Math.random().toString().slice(2),
                text: e.target.text.value,
                checked: false
            };

            todosList.push(todo);
        }

        if (e.target.add__button.innerHTML === "Изменить") {
            const id = e.target.querySelector("p").innerHTML;

            todosList.map(todo => {
                if (todo.id === id) {
                    todo.text = e.target.text.value;
                }
            });

            e.target.querySelector("p").innerHTML = "";
            e.target.querySelector("p").style.display = "none";
            e.target.add__button.innerHTML = "Добавить";

            todosListElement.querySelectorAll(".todo__item").forEach(item => {
                item.querySelector(".check").disabled = false;
                item.querySelector(".edit").disabled = false;
                item.querySelector(".delete").disabled = false;
            });
        }

        e.target.text.value = "";
        todoAppUIClass.renderList();
    }
    //CHECK TODO
    check(e){
        if(e.target.classList.contains("check")){
            todosList.filter(todo => {
                if(todo.id === e.target.parentElement.id){
                    todo.checked = !todo.checked;
                }

                return todo;
            });

            todoAppUIClass.renderList();
        }

        if(e.target.classList.contains("delete")){
            todoAppUIClass.deleteItem(e.target.parentElement.id);
        }

        if(e.target.classList.contains("edit")){
            todoAppUIClass.editTodo(e.target.parentElement.id)
        }
    }
    //SET LOCAL STORAGE DATA
    setLocalStorage(){
        localStorage.setItem("list", JSON.stringify(todosList));
    }
    //DELETE TODO ITEM
    deleteItem(id){
        todosList = todosList.filter(item => {
            if(item.id === id){
                return false;
            } else {
                return true;
            }
        });

        todoAppUIClass.setLocalStorage();
        todoAppUIClass.renderList();
    }
    //EDIT TODO ITEM
    editTodo(id){
        const p = inputFormElement.querySelector("p");
        const todo = todosList.find(todo => todo.id === id);
        inputFormElement.text.value = todo.text;
        inputFormElement.add__button.innerHTML = "Изменить";
        p.innerHTML = id;
        p.style.display = "block";

        todosListElement.querySelectorAll(".todo__item").forEach(item => {
            item.querySelector(".check").disabled = true;
            item.querySelector(".edit").disabled = true;
            item.querySelector(".delete").disabled = true;
        });
    }
}
//CREATE CLASS INSTANCE
const todoAppUIClass = new TodoAppUI();
todoAppUIClass.renderList();