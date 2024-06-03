const host = "http://18.205.219.133:8083"
const todosContainer = document.querySelector('.todos-container')

// 처음 접속할 때 getTodos 메소드를 실행
window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

// todoList를 가져옴
function getTodos() {
    axios.get(`${host}/todo`).then(
        // then 메소드가 실행되며 받아오는 객체, todoList
        response => {
            console.log(response.data);
            // renderTodos 함수 호출
            // response.data.todos : 실제 데이터
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error)
        });
}

// todoList rendering
function renderTodos(todos) {
    // todosContainer 초기화
    todosContainer.innerHTML = '';
    // todo를 하나하나 도는 코드
    todos.forEach(todo => {
        // div 생성 부분
        const nameDiv = document.createElement('div')
        const todoDiv = document.createElement('div')
        // 생성된 div에 todo-item class 지정
        nameDiv.classList.add('name-item');
        todoDiv.classList.add('todo-item');
        // 생성된 div의 할 일을 item으로 초기화
        nameDiv.textContent = todo.name;
        todoDiv.textContent = todo.item;
        // todosContainer에 자식으로 추가
        todosContainer.appendChild(nameDiv);
        todosContainer.appendChild(todoDiv);


        // 삭제 버튼 생성 및 이벤트 처리
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';

        // 삭제 버튼 클릭 이벤트
        deleteBtn.addEventListener('click', function () {
            console.log(todo.id);
            deleteTodo(todo.id);
        });

        //todoDiv에 삭제 버튼 추가
        todoDiv.appendChild(deleteBtn);
    });
}


// todo-input input 태그 가져오기
const nameInput = document.querySelector('.name-input');
// todo-input input 태그 가져오기
const todoInput = document.querySelector('.todo-input');

const add_guestbook_btn = document.querySelector("#add_guestbook")

// 키가 눌렸을 때
add_guestbook_btn.addEventListener('click', function (event) {
    addTodo();
});

// todo 추가
function addTodo() {
    // trim() : 입력값에서 좌우 공백 제거
    const name = nameInput.value.trim();

    // trim() : 입력값에서 좌우 공백 제거
    const title = todoInput.value.trim();

    // 입력 형식
    let todoData = {
        id: 0,
        name: name,
        item: title,
        time: 0
    };

    // 만약 입력이 없다면 return
    if (title == '')
        return;
    if (name == '')
        return;

    // 정상데이터 입력 후 다시 렌더링
    axios.post(`${host}/todo`, todoData)
        .then(response => {
            // input 태그 내용을 초기화
            todoInput.value = '';
            nameInput.value = '';
            // todo List 항목 갱신
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo: ', todoData);
        });
}

function deleteTodo(todoId) {
    axios.delete(`${host}/todo/${todoId}`)
        .then(function (response) {
            console.log('Todo deleted: ', response.data);
            getTodos();
        })
        .catch(function (error) {
            console.error('Error deleting todo: ', error);
        });
}