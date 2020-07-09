const $todosList = document.querySelector('.todos-list');
const $formSearch = document.querySelector('.form-search');
const $inputSearch = $formSearch.querySelector('input');
const $formAdd = document.querySelector('.form-add');

const filterTodos = (term) => {
    Array.from($todosList.children)
        .filter(item => !item.textContent.toLowerCase().includes(term))
        .forEach(item => item.classList.add('filtered'));

    Array.from($todosList.children)
        .filter(item => item.textContent.toLowerCase().includes(term))
        .forEach(item => item.classList.remove('filtered'));
}

const handleInputSearch = (e) => {
    const term = $inputSearch.value.trim().toLowerCase();
    filterTodos(term);    
}

const handleDeleteTodo = (e) => {
    if(e.target.classList.contains('btn-delete')) {
        e.target.parentElement.remove();
    }
}

const generateTemplate = todo => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt btn-delete"></i>
        </li>
    `
    $todosList.innerHTML += html;
}

const handleSubmitFormSearch = (e) => {
    e.preventDefault();
    const todo = $formAdd.add.value.trim();
    $formAdd.reset();
    if(todo.length) {
        generateTemplate(todo);
    }
}

$formAdd.addEventListener('submit', handleSubmitFormSearch);
$todosList.addEventListener('click', handleDeleteTodo);
$inputSearch.addEventListener('keyup', handleInputSearch)