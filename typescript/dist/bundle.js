/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    constructor(templateId, hostElementId, elPosition = 'afterbegin', newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const contentNode = document.importNode(this.templateElement.content, true);
        this.element = contentNode.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.attachContent(this.element, elPosition);
    }
    attachContent(el, elPosition) {
        this.hostElement.insertAdjacentElement(elPosition, el);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
/* harmony import */ var _states_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../states/project */ "./src/states/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    getherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;
        const validatableTitle = {
            value: enteredTitle,
            isRequired: true,
            minLength: 2,
            maxLength: 20,
        };
        const validatableDescription = {
            value: enteredDescription,
            isRequired: true,
            minLength: 5,
            maxLength: 200,
        };
        const validatablePeople = {
            value: +enteredPeople,
            isRequired: true,
            min: 1,
            max: 10,
        };
        if (!(0,_utils_validation__WEBPACK_IMPORTED_MODULE_2__.validate)(validatableTitle) ||
            !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_2__.validate)(validatableDescription) ||
            !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_2__.validate)(validatablePeople)) {
            alert('Invalid input. Please try again.');
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            _states_project__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, description, people);
            this.element.reset();
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(hostId, project) {
        super('single-project', hostId, 'beforeend', project.id);
        this.project = project;
        this.element.draggable = true;
        this.configure();
        this.renderContent();
    }
    get peopleCount() {
        return this.project.people > 1
            ? `${this.project.people} people`
            : '1 person';
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('end');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.renderText('h2', this.project.title);
        this.renderText('h3', this.peopleCount);
        this.renderText('p', this.project.description);
    }
    renderText(selector, text) {
        this.element.querySelector(selector).textContent = text;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _states_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../states/project */ "./src/states/project.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(type) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.type = type;
        const theme = {
            active: ['bg-blue-100', 'border-blue-200'],
            finished: ['bg-green-100', 'border-green-200'],
        };
        const cl = this.element.classList;
        cl.add.apply(cl, theme[type]);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.element.classList.add('border-orange-400');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        const prjStatus = this.type === 'active' ? _models_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished;
        if (prjId)
            _states_project__WEBPACK_IMPORTED_MODULE_2__.projectState.moveProject(prjId, prjStatus);
        this.element.classList.remove('border-orange-400');
    }
    dragLeaveHandler(_) {
        this.element.classList.remove('border-orange-400');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        _states_project__WEBPACK_IMPORTED_MODULE_2__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === _models_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active;
                }
                return project.status === _models_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const project of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(`${this.type}-projects-list`, project);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = `${this.type} projects`;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectList.prototype, "renderContent", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/states/base.ts":
/*!****************************!*\
  !*** ./src/states/base.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "State": () => (/* binding */ State)
/* harmony export */ });
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFunc) {
        this.listeners.push(listenerFunc);
    }
}


/***/ }),

/***/ "./src/states/project.ts":
/*!*******************************!*\
  !*** ./src/states/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./src/states/base.ts");


class ProjectState extends _base__WEBPACK_IMPORTED_MODULE_1__.State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project)
            project.status = newStatus;
        this.updateListeners();
    }
    updateListeners() {
        for (const listenerFunc of this.listeners) {
            listenerFunc(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate({ value, isRequired, minLength, maxLength, min, max, }) {
    let isValid = true;
    if (isRequired) {
        isValid = isValid && value.toString().trim().length > 0;
    }
    if (minLength && minLength > 0 && typeof value === 'string') {
        isValid = isValid && value.length >= minLength;
    }
    if (maxLength && maxLength > 0 && typeof value === 'string') {
        isValid = isValid && value.length <= maxLength;
    }
    if (min && min > 0 && typeof value === 'number') {
        isValid = isValid && value >= min;
    }
    if (max && max > 0 && typeof value === 'number') {
        isValid = isValid && value <= max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ2hELE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQztLQUNsQztJQUVELElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ2hELE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQztLQUNsQztJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7VUN4Q0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOd0Q7QUFDRjtBQUV0RCxJQUFJLG1FQUFZLEVBQUUsQ0FBQztBQUNuQixJQUFJLGlFQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsSUFBSSxpRUFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL3N0YXRlcy9iYXNlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvc3RhdGVzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy91dGlscy92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIFBvc2l0aW9uVmFsdWVzID0gJ2JlZm9yZWJlZ2luJyB8ICdhZnRlcmJlZ2luJyB8ICdiZWZvcmVlbmQnIHwgJ2FmdGVyZW5kJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xuXHR0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cdGhvc3RFbGVtZW50OiBUO1xuXHRlbGVtZW50OiBVO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHRlbXBsYXRlSWQ6IHN0cmluZyxcblx0XHRob3N0RWxlbWVudElkOiBzdHJpbmcsXG5cdFx0ZWxQb3NpdGlvbjogUG9zaXRpb25WYWx1ZXMgPSAnYWZ0ZXJiZWdpbicsXG5cdFx0bmV3RWxlbWVudElkPzogc3RyaW5nXG5cdCkge1xuXHRcdHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XHR0ZW1wbGF0ZUlkXG5cdFx0KSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcblx0XHR0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCkhIGFzIFQ7XG5cblx0XHRjb25zdCBjb250ZW50Tm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCwgdHJ1ZSk7XG5cdFx0dGhpcy5lbGVtZW50ID0gY29udGVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcblx0XHRpZiAobmV3RWxlbWVudElkKSB0aGlzLmVsZW1lbnQuaWQgPSBuZXdFbGVtZW50SWQ7XG5cblx0XHR0aGlzLmF0dGFjaENvbnRlbnQodGhpcy5lbGVtZW50LCBlbFBvc2l0aW9uKTtcblx0fVxuXG5cdHByaXZhdGUgYXR0YWNoQ29udGVudChlbDogVSwgZWxQb3NpdGlvbjogUG9zaXRpb25WYWx1ZXMpIHtcblx0XHR0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChlbFBvc2l0aW9uLCBlbCk7XG5cdH1cblxuXHRhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcblx0YWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xufVxuIiwiaW1wb3J0IHthdXRvYmluZH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XG5pbXBvcnQge1ZhbGlkYXRpb25Qcm9wcywgdmFsaWRhdGV9IGZyb20gJy4uL3V0aWxzL3ZhbGlkYXRpb24nO1xuaW1wb3J0IHtwcm9qZWN0U3RhdGV9IGZyb20gJy4uL3N0YXRlcy9wcm9qZWN0JztcblxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XG5cdHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXHRkZXNjcmlwdGlvbklucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblx0cGVvcGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsICdhZnRlcmJlZ2luJywgJ3VzZXItaW5wdXQnKTtcblxuXHRcdHRoaXMudGl0bGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdCcjdGl0bGUnXG5cdFx0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXHRcdHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdCcjZGVzY3JpcHRpb24nXG5cdFx0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXHRcdHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnI3Blb3BsZSdcblx0XHQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cblx0XHR0aGlzLmNvbmZpZ3VyZSgpO1xuXHR9XG5cblx0Y29uZmlndXJlKCkge1xuXHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xuXHR9XG5cblx0cmVuZGVyQ29udGVudCgpIHt9XG5cblx0cHJpdmF0ZSBnZXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG5cdFx0Y29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcblx0XHRjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xuXHRcdGNvbnN0IGVudGVyZWRQZW9wbGUgPSArdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWU7XG5cblx0XHRjb25zdCB2YWxpZGF0YWJsZVRpdGxlOiBWYWxpZGF0aW9uUHJvcHMgPSB7XG5cdFx0XHR2YWx1ZTogZW50ZXJlZFRpdGxlLFxuXHRcdFx0aXNSZXF1aXJlZDogdHJ1ZSxcblx0XHRcdG1pbkxlbmd0aDogMixcblx0XHRcdG1heExlbmd0aDogMjAsXG5cdFx0fTtcblxuXHRcdGNvbnN0IHZhbGlkYXRhYmxlRGVzY3JpcHRpb246IFZhbGlkYXRpb25Qcm9wcyA9IHtcblx0XHRcdHZhbHVlOiBlbnRlcmVkRGVzY3JpcHRpb24sXG5cdFx0XHRpc1JlcXVpcmVkOiB0cnVlLFxuXHRcdFx0bWluTGVuZ3RoOiA1LFxuXHRcdFx0bWF4TGVuZ3RoOiAyMDAsXG5cdFx0fTtcblxuXHRcdGNvbnN0IHZhbGlkYXRhYmxlUGVvcGxlOiBWYWxpZGF0aW9uUHJvcHMgPSB7XG5cdFx0XHR2YWx1ZTogK2VudGVyZWRQZW9wbGUsXG5cdFx0XHRpc1JlcXVpcmVkOiB0cnVlLFxuXHRcdFx0bWluOiAxLFxuXHRcdFx0bWF4OiAxMCxcblx0XHR9O1xuXG5cdFx0aWYgKFxuXHRcdFx0IXZhbGlkYXRlKHZhbGlkYXRhYmxlVGl0bGUpIHx8XG5cdFx0XHQhdmFsaWRhdGUodmFsaWRhdGFibGVEZXNjcmlwdGlvbikgfHxcblx0XHRcdCF2YWxpZGF0ZSh2YWxpZGF0YWJsZVBlb3BsZSlcblx0XHQpIHtcblx0XHRcdGFsZXJ0KCdJbnZhbGlkIGlucHV0LiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHJldHVybiBbZW50ZXJlZFRpdGxlLCBlbnRlcmVkRGVzY3JpcHRpb24sICtlbnRlcmVkUGVvcGxlXTtcblx0fVxuXG5cdEBhdXRvYmluZFxuXHRwcml2YXRlIHN1Ym1pdEhhbmRsZXIoZXZlbnQ6IEV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdldGhlclVzZXJJbnB1dCgpO1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcblx0XHRcdGNvbnN0IFt0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZV0gPSB1c2VySW5wdXQ7XG5cdFx0XHRwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSk7XG5cdFx0XHR0aGlzLmVsZW1lbnQucmVzZXQoKTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7UHJvamVjdH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xuaW1wb3J0IHtEcmFnZ2FibGV9IGZyb20gJy4uL21vZGVscy9kcmFwLWRyb3AnO1xuaW1wb3J0IHthdXRvYmluZH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0SXRlbVxuXHRleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PlxuXHRpbXBsZW1lbnRzIERyYWdnYWJsZVxue1xuXHRwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XG5cblx0Z2V0IHBlb3BsZUNvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLnByb2plY3QucGVvcGxlID4gMVxuXHRcdFx0PyBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZW9wbGVgXG5cdFx0XHQ6ICcxIHBlcnNvbic7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xuXHRcdHN1cGVyKCdzaW5nbGUtcHJvamVjdCcsIGhvc3RJZCwgJ2JlZm9yZWVuZCcsIHByb2plY3QuaWQpO1xuXHRcdHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG5cdFx0dGhpcy5lbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XG5cblx0XHR0aGlzLmNvbmZpZ3VyZSgpO1xuXHRcdHRoaXMucmVuZGVyQ29udGVudCgpO1xuXHR9XG5cblx0QGF1dG9iaW5kXG5cdGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuXHRcdGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZCk7XG5cdFx0ZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuXHR9XG5cblx0QGF1dG9iaW5kXG5cdGRyYWdFbmRIYW5kbGVyKF86IERyYWdFdmVudCk6IHZvaWQge1xuXHRcdGNvbnNvbGUubG9nKCdlbmQnKTtcblx0fVxuXG5cdGNvbmZpZ3VyZSgpIHtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xuXHR9XG5cblx0cmVuZGVyQ29udGVudCgpIHtcblx0XHR0aGlzLnJlbmRlclRleHQoJ2gyJywgdGhpcy5wcm9qZWN0LnRpdGxlKTtcblx0XHR0aGlzLnJlbmRlclRleHQoJ2gzJywgdGhpcy5wZW9wbGVDb3VudCk7XG5cdFx0dGhpcy5yZW5kZXJUZXh0KCdwJywgdGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uKTtcblx0fVxuXG5cdHJlbmRlclRleHQoc2VsZWN0b3I6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG5cdFx0dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIS50ZXh0Q29udGVudCA9IHRleHQ7XG5cdH1cbn1cbiIsImltcG9ydCB7YXV0b2JpbmR9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xuaW1wb3J0IHtwcm9qZWN0U3RhdGV9IGZyb20gJy4uL3N0YXRlcy9wcm9qZWN0JztcbmltcG9ydCB7RHJhZ1RhcmdldH0gZnJvbSAnLi4vbW9kZWxzL2RyYXAtZHJvcCc7XG5pbXBvcnQge1Byb2plY3QsIFByb2plY3RTdGF0dXN9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcbmltcG9ydCB7UHJvamVjdEl0ZW19IGZyb20gJy4vcHJvamVjdC1pdGVtJztcblxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0XG5cdGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD5cblx0aW1wbGVtZW50cyBEcmFnVGFyZ2V0XG57XG5cdGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6ICdhY3RpdmUnIHwgJ2ZpbmlzaGVkJykge1xuXHRcdHN1cGVyKCdwcm9qZWN0LWxpc3QnLCAnYXBwJywgJ2JlZm9yZWVuZCcsIGAke3R5cGV9LXByb2plY3RzYCk7XG5cdFx0Y29uc3QgdGhlbWUgPSB7XG5cdFx0XHRhY3RpdmU6IFsnYmctYmx1ZS0xMDAnLCAnYm9yZGVyLWJsdWUtMjAwJ10sXG5cdFx0XHRmaW5pc2hlZDogWydiZy1ncmVlbi0xMDAnLCAnYm9yZGVyLWdyZWVuLTIwMCddLFxuXHRcdH07XG5cblx0XHRjb25zdCBjbCA9IHRoaXMuZWxlbWVudC5jbGFzc0xpc3Q7XG5cdFx0Y2wuYWRkLmFwcGx5KGNsLCB0aGVtZVt0eXBlXSk7XG5cblx0XHR0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcblxuXHRcdHRoaXMuY29uZmlndXJlKCk7XG5cdFx0dGhpcy5yZW5kZXJDb250ZW50KCk7XG5cdH1cblxuXHRAYXV0b2JpbmRcblx0ZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcblx0XHRpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gJ3RleHQvcGxhaW4nKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2JvcmRlci1vcmFuZ2UtNDAwJyk7XG5cdFx0fVxuXHR9XG5cblx0QGF1dG9iaW5kXG5cdGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcblx0XHRjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuXHRcdGNvbnN0IHByalN0YXR1cyA9XG5cdFx0XHR0aGlzLnR5cGUgPT09ICdhY3RpdmUnID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xuXHRcdGlmIChwcmpJZCkgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KHByaklkLCBwcmpTdGF0dXMpO1xuXHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdib3JkZXItb3JhbmdlLTQwMCcpO1xuXHR9XG5cblx0QGF1dG9iaW5kXG5cdGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XG5cdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2JvcmRlci1vcmFuZ2UtNDAwJyk7XG5cdH1cblxuXHRjb25maWd1cmUoKSB7XG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuXHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcik7XG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XG5cblx0XHRwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcblx0XHRcdGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLnR5cGUgPT09ICdhY3RpdmUnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHByb2plY3Quc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcHJvamVjdC5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHJlbGV2YW50UHJvamVjdHM7XG5cdFx0XHR0aGlzLnJlbmRlclByb2plY3RzKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJQcm9qZWN0cygpIHtcblx0XHRjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHRcdGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGBcblx0XHQpISBhcyBIVE1MVUxpc3RFbGVtZW50O1xuXHRcdGxpc3RFbC5pbm5lckhUTUwgPSAnJztcblx0XHRmb3IgKGNvbnN0IHByb2plY3Qgb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XG5cdFx0XHRuZXcgUHJvamVjdEl0ZW0oYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCwgcHJvamVjdCk7XG5cdFx0fVxuXHR9XG5cblx0QGF1dG9iaW5kXG5cdHJlbmRlckNvbnRlbnQoKSB7XG5cdFx0Y29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YDtcblx0XHR0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQgPSBsaXN0SWQ7XG5cdFx0dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gYCR7dGhpcy50eXBlfSBwcm9qZWN0c2A7XG5cdH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBhdXRvYmluZChfOiBhbnksIF8yOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuXHRjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG5cdGNvbnN0IGFkakRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcblx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XG5cdFx0XHRyZXR1cm4gYm91bmRGbjtcblx0XHR9LFxuXHR9O1xuXHRyZXR1cm4gYWRqRGVzY3JpcHRvcjtcbn1cbiIsImV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xuXHRBY3RpdmUsXG5cdEZpbmlzaGVkLFxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG5cdGNvbnN0cnVjdG9yKFxuXHRcdHB1YmxpYyBpZDogc3RyaW5nLFxuXHRcdHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuXHRcdHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxuXHRcdHB1YmxpYyBwZW9wbGU6IG51bWJlcixcblx0XHRwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXG5cdCkge31cbn1cbiIsInR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZDtcblxuZXhwb3J0IGNsYXNzIFN0YXRlPFQ+IHtcblx0cHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xuXHRhZGRMaXN0ZW5lcihsaXN0ZW5lckZ1bmM6IExpc3RlbmVyPFQ+KSB7XG5cdFx0dGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZ1bmMpO1xuXHR9XG59XG4iLCJpbXBvcnQge1Byb2plY3QsIFByb2plY3RTdGF0dXN9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcbmltcG9ydCB7U3RhdGV9IGZyb20gJy4vYmFzZSc7XG5cbmNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+IHtcblx0cHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XG5cdHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQcm9qZWN0U3RhdGU7XG5cblx0cHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0c3RhdGljIGdldEluc3RhbmNlKCkge1xuXHRcdGlmICh0aGlzLmluc3RhbmNlKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcblx0XHRcdHJldHVybiB0aGlzLmluc3RhbmNlO1xuXHRcdH1cblx0fVxuXG5cdGFkZFByb2plY3QodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbnVtT2ZQZW9wbGU6IG51bWJlcikge1xuXHRcdGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChcblx0XHRcdE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcblx0XHRcdHRpdGxlLFxuXHRcdFx0ZGVzY3JpcHRpb24sXG5cdFx0XHRudW1PZlBlb3BsZSxcblx0XHRcdFByb2plY3RTdGF0dXMuQWN0aXZlXG5cdFx0KTtcblxuXHRcdHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblx0XHR0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuXHR9XG5cblx0bW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xuXHRcdGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQocHJqID0+IHByai5pZCA9PT0gcHJvamVjdElkKTtcblx0XHRpZiAocHJvamVjdCkgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXM7XG5cdFx0dGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcblx0fVxuXG5cdHByaXZhdGUgdXBkYXRlTGlzdGVuZXJzKCkge1xuXHRcdGZvciAoY29uc3QgbGlzdGVuZXJGdW5jIG9mIHRoaXMubGlzdGVuZXJzKSB7XG5cdFx0XHRsaXN0ZW5lckZ1bmModGhpcy5wcm9qZWN0cy5zbGljZSgpKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uUHJvcHMge1xuXHR2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuXHRpc1JlcXVpcmVkPzogYm9vbGVhbjtcblx0bWluTGVuZ3RoPzogbnVtYmVyO1xuXHRtYXhMZW5ndGg/OiBudW1iZXI7XG5cdG1pbj86IG51bWJlcjtcblx0bWF4PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUoe1xuXHR2YWx1ZSxcblx0aXNSZXF1aXJlZCxcblx0bWluTGVuZ3RoLFxuXHRtYXhMZW5ndGgsXG5cdG1pbixcblx0bWF4LFxufTogVmFsaWRhdGlvblByb3BzKSB7XG5cdGxldCBpc1ZhbGlkID0gdHJ1ZTtcblxuXHRpZiAoaXNSZXF1aXJlZCkge1xuXHRcdGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDA7XG5cdH1cblxuXHRpZiAobWluTGVuZ3RoICYmIG1pbkxlbmd0aCA+IDAgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbHVlLmxlbmd0aCA+PSBtaW5MZW5ndGg7XG5cdH1cblxuXHRpZiAobWF4TGVuZ3RoICYmIG1heExlbmd0aCA+IDAgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbHVlLmxlbmd0aCA8PSBtYXhMZW5ndGg7XG5cdH1cblxuXHRpZiAobWluICYmIG1pbiA+IDAgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuXHRcdGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbHVlID49IG1pbjtcblx0fVxuXG5cdGlmIChtYXggJiYgbWF4ID4gMCAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cdFx0aXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsdWUgPD0gbWF4O1xuXHR9XG5cblx0cmV0dXJuIGlzVmFsaWQ7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7UHJvamVjdElucHV0fSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dCc7XG5pbXBvcnQge1Byb2plY3RMaXN0fSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0JztcblxubmV3IFByb2plY3RJbnB1dCgpO1xubmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKTtcbm5ldyBQcm9qZWN0TGlzdCgnZmluaXNoZWQnKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==