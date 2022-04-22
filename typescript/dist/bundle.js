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
    dragEndHandler(_) { }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVEsRUFBRTtRQUNoRCxPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7S0FDbEM7SUFFRCxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNoRCxPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7S0FDbEM7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNoQixDQUFDOzs7Ozs7O1VDeENEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTndEO0FBQ0Y7QUFFdEQsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxpRUFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9zdGF0ZXMvYmFzZS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0Ly4vc3JjL3N0YXRlcy9wcm9qZWN0LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQvLi9zcmMvdXRpbHMvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsidHlwZSBQb3NpdGlvblZhbHVlcyA9ICdiZWZvcmViZWdpbicgfCAnYWZ0ZXJiZWdpbicgfCAnYmVmb3JlZW5kJyB8ICdhZnRlcmVuZCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcblx0dGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuXHRob3N0RWxlbWVudDogVDtcblx0ZWxlbWVudDogVTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHR0ZW1wbGF0ZUlkOiBzdHJpbmcsXG5cdFx0aG9zdEVsZW1lbnRJZDogc3RyaW5nLFxuXHRcdGVsUG9zaXRpb246IFBvc2l0aW9uVmFsdWVzID0gJ2FmdGVyYmVnaW4nLFxuXHRcdG5ld0VsZW1lbnRJZD86IHN0cmluZ1xuXHQpIHtcblx0XHR0aGlzLnRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuXHRcdFx0dGVtcGxhdGVJZFxuXHRcdCkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cdFx0dGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW50SWQpISBhcyBUO1xuXG5cdFx0Y29uc3QgY29udGVudE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsIHRydWUpO1xuXHRcdHRoaXMuZWxlbWVudCA9IGNvbnRlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XG5cdFx0aWYgKG5ld0VsZW1lbnRJZCkgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xuXG5cdFx0dGhpcy5hdHRhY2hDb250ZW50KHRoaXMuZWxlbWVudCwgZWxQb3NpdGlvbik7XG5cdH1cblxuXHRwcml2YXRlIGF0dGFjaENvbnRlbnQoZWw6IFUsIGVsUG9zaXRpb246IFBvc2l0aW9uVmFsdWVzKSB7XG5cdFx0dGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoZWxQb3NpdGlvbiwgZWwpO1xuXHR9XG5cblx0YWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XG5cdGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcbn1cbiIsImltcG9ydCB7YXV0b2JpbmR9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xuaW1wb3J0IHtWYWxpZGF0aW9uUHJvcHMsIHZhbGlkYXRlfSBmcm9tICcuLi91dGlscy92YWxpZGF0aW9uJztcbmltcG9ydCB7cHJvamVjdFN0YXRlfSBmcm9tICcuLi9zdGF0ZXMvcHJvamVjdCc7XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xuXHR0aXRsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblx0ZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cdHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigncHJvamVjdC1pbnB1dCcsICdhcHAnLCAnYWZ0ZXJiZWdpbicsICd1c2VyLWlucHV0Jyk7XG5cblx0XHR0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnI3RpdGxlJ1xuXHRcdCkgYXMgSFRNTElucHV0RWxlbWVudDtcblx0XHR0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnI2Rlc2NyaXB0aW9uJ1xuXHRcdCkgYXMgSFRNTElucHV0RWxlbWVudDtcblx0XHR0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0JyNwZW9wbGUnXG5cdFx0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG5cdFx0dGhpcy5jb25maWd1cmUoKTtcblx0fVxuXG5cdGNvbmZpZ3VyZSgpIHtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKTtcblx0fVxuXG5cdHJlbmRlckNvbnRlbnQoKSB7fVxuXG5cdHByaXZhdGUgZ2V0aGVyVXNlcklucHV0KCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB8IHZvaWQge1xuXHRcdGNvbnN0IGVudGVyZWRUaXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XG5cdFx0Y29uc3QgZW50ZXJlZERlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcblx0XHRjb25zdCBlbnRlcmVkUGVvcGxlID0gK3RoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlO1xuXG5cdFx0Y29uc3QgdmFsaWRhdGFibGVUaXRsZTogVmFsaWRhdGlvblByb3BzID0ge1xuXHRcdFx0dmFsdWU6IGVudGVyZWRUaXRsZSxcblx0XHRcdGlzUmVxdWlyZWQ6IHRydWUsXG5cdFx0XHRtaW5MZW5ndGg6IDIsXG5cdFx0XHRtYXhMZW5ndGg6IDIwLFxuXHRcdH07XG5cblx0XHRjb25zdCB2YWxpZGF0YWJsZURlc2NyaXB0aW9uOiBWYWxpZGF0aW9uUHJvcHMgPSB7XG5cdFx0XHR2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxuXHRcdFx0aXNSZXF1aXJlZDogdHJ1ZSxcblx0XHRcdG1pbkxlbmd0aDogNSxcblx0XHRcdG1heExlbmd0aDogMjAwLFxuXHRcdH07XG5cblx0XHRjb25zdCB2YWxpZGF0YWJsZVBlb3BsZTogVmFsaWRhdGlvblByb3BzID0ge1xuXHRcdFx0dmFsdWU6ICtlbnRlcmVkUGVvcGxlLFxuXHRcdFx0aXNSZXF1aXJlZDogdHJ1ZSxcblx0XHRcdG1pbjogMSxcblx0XHRcdG1heDogMTAsXG5cdFx0fTtcblxuXHRcdGlmIChcblx0XHRcdCF2YWxpZGF0ZSh2YWxpZGF0YWJsZVRpdGxlKSB8fFxuXHRcdFx0IXZhbGlkYXRlKHZhbGlkYXRhYmxlRGVzY3JpcHRpb24pIHx8XG5cdFx0XHQhdmFsaWRhdGUodmFsaWRhdGFibGVQZW9wbGUpXG5cdFx0KSB7XG5cdFx0XHRhbGVydCgnSW52YWxpZCBpbnB1dC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRyZXR1cm4gW2VudGVyZWRUaXRsZSwgZW50ZXJlZERlc2NyaXB0aW9uLCArZW50ZXJlZFBlb3BsZV07XG5cdH1cblxuXHRAYXV0b2JpbmRcblx0cHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgdXNlcklucHV0ID0gdGhpcy5nZXRoZXJVc2VySW5wdXQoKTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XG5cdFx0XHRjb25zdCBbdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGVdID0gdXNlcklucHV0O1xuXHRcdFx0cHJvamVjdFN0YXRlLmFkZFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGUpO1xuXHRcdFx0dGhpcy5lbGVtZW50LnJlc2V0KCk7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge1Byb2plY3R9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcbmltcG9ydCB7RHJhZ2dhYmxlfSBmcm9tICcuLi9tb2RlbHMvZHJhcC1kcm9wJztcbmltcG9ydCB7YXV0b2JpbmR9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cblx0ZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD5cblx0aW1wbGVtZW50cyBEcmFnZ2FibGVcbntcblx0cHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xuXG5cdGdldCBwZW9wbGVDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0LnBlb3BsZSA+IDFcblx0XHRcdD8gYCR7dGhpcy5wcm9qZWN0LnBlb3BsZX0gcGVvcGxlYFxuXHRcdFx0OiAnMSBwZXJzb24nO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcblx0XHRzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsICdiZWZvcmVlbmQnLCBwcm9qZWN0LmlkKTtcblx0XHR0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuXHRcdHRoaXMuZWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuXG5cdFx0dGhpcy5jb25maWd1cmUoKTtcblx0XHR0aGlzLnJlbmRlckNvbnRlbnQoKTtcblx0fVxuXG5cdEBhdXRvYmluZFxuXHRkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcblx0XHRldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpO1xuXHRcdGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcblx0fVxuXG5cdEBhdXRvYmluZFxuXHRkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpOiB2b2lkIHt9XG5cblx0Y29uZmlndXJlKCkge1xuXHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xuXHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kSGFuZGxlcik7XG5cdH1cblxuXHRyZW5kZXJDb250ZW50KCkge1xuXHRcdHRoaXMucmVuZGVyVGV4dCgnaDInLCB0aGlzLnByb2plY3QudGl0bGUpO1xuXHRcdHRoaXMucmVuZGVyVGV4dCgnaDMnLCB0aGlzLnBlb3BsZUNvdW50KTtcblx0XHR0aGlzLnJlbmRlclRleHQoJ3AnLCB0aGlzLnByb2plY3QuZGVzY3JpcHRpb24pO1xuXHR9XG5cblx0cmVuZGVyVGV4dChzZWxlY3Rvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcblx0XHR0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikhLnRleHRDb250ZW50ID0gdGV4dDtcblx0fVxufVxuIiwiaW1wb3J0IHthdXRvYmluZH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XG5pbXBvcnQge3Byb2plY3RTdGF0ZX0gZnJvbSAnLi4vc3RhdGVzL3Byb2plY3QnO1xuaW1wb3J0IHtEcmFnVGFyZ2V0fSBmcm9tICcuLi9tb2RlbHMvZHJhcC1kcm9wJztcbmltcG9ydCB7UHJvamVjdCwgUHJvamVjdFN0YXR1c30gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xuaW1wb3J0IHtQcm9qZWN0SXRlbX0gZnJvbSAnLi9wcm9qZWN0LWl0ZW0nO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3Rcblx0ZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PlxuXHRpbXBsZW1lbnRzIERyYWdUYXJnZXRcbntcblx0YXNzaWduZWRQcm9qZWN0czogUHJvamVjdFtdO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XG5cdFx0c3VwZXIoJ3Byb2plY3QtbGlzdCcsICdhcHAnLCAnYmVmb3JlZW5kJywgYCR7dHlwZX0tcHJvamVjdHNgKTtcblx0XHRjb25zdCB0aGVtZSA9IHtcblx0XHRcdGFjdGl2ZTogWydiZy1ibHVlLTEwMCcsICdib3JkZXItYmx1ZS0yMDAnXSxcblx0XHRcdGZpbmlzaGVkOiBbJ2JnLWdyZWVuLTEwMCcsICdib3JkZXItZ3JlZW4tMjAwJ10sXG5cdFx0fTtcblxuXHRcdGNvbnN0IGNsID0gdGhpcy5lbGVtZW50LmNsYXNzTGlzdDtcblx0XHRjbC5hZGQuYXBwbHkoY2wsIHRoZW1lW3R5cGVdKTtcblxuXHRcdHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xuXG5cdFx0dGhpcy5jb25maWd1cmUoKTtcblx0XHR0aGlzLnJlbmRlckNvbnRlbnQoKTtcblx0fVxuXG5cdEBhdXRvYmluZFxuXHRkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuXHRcdGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLW9yYW5nZS00MDAnKTtcblx0XHR9XG5cdH1cblxuXHRAYXV0b2JpbmRcblx0ZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuXHRcdGNvbnN0IHByaklkID0gZXZlbnQuZGF0YVRyYW5zZmVyIS5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XG5cdFx0Y29uc3QgcHJqU3RhdHVzID1cblx0XHRcdHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XG5cdFx0aWYgKHByaklkKSBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QocHJqSWQsIHByalN0YXR1cyk7XG5cdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2JvcmRlci1vcmFuZ2UtNDAwJyk7XG5cdH1cblxuXHRAYXV0b2JpbmRcblx0ZHJhZ0xlYXZlSGFuZGxlcihfOiBEcmFnRXZlbnQpOiB2b2lkIHtcblx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYm9yZGVyLW9yYW5nZS00MDAnKTtcblx0fVxuXG5cdGNvbmZpZ3VyZSgpIHtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyKTtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcblxuXHRcdHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xuXHRcdFx0Y29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHtcblx0XHRcdFx0aWYgKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcblx0XHRcdFx0XHRyZXR1cm4gcHJvamVjdC5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0LnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GaW5pc2hlZDtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZhbnRQcm9qZWN0cztcblx0XHRcdHRoaXMucmVuZGVyUHJvamVjdHMoKTtcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclByb2plY3RzKCkge1xuXHRcdGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuXHRcdFx0YCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxuXHRcdCkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG5cdFx0bGlzdEVsLmlubmVySFRNTCA9ICcnO1xuXHRcdGZvciAoY29uc3QgcHJvamVjdCBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcblx0XHRcdG5ldyBQcm9qZWN0SXRlbShgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgLCBwcm9qZWN0KTtcblx0XHR9XG5cdH1cblxuXHRAYXV0b2JpbmRcblx0cmVuZGVyQ29udGVudCgpIHtcblx0XHRjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xuXHRcdHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCA9IGxpc3RJZDtcblx0XHR0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSBgJHt0aGlzLnR5cGV9IHByb2plY3RzYDtcblx0fVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKF86IGFueSwgXzI6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG5cdGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcblx0Y29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcblx0XHRcdHJldHVybiBib3VuZEZuO1xuXHRcdH0sXG5cdH07XG5cdHJldHVybiBhZGpEZXNjcmlwdG9yO1xufVxuIiwiZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XG5cdEFjdGl2ZSxcblx0RmluaXNoZWQsXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcblx0Y29uc3RydWN0b3IoXG5cdFx0cHVibGljIGlkOiBzdHJpbmcsXG5cdFx0cHVibGljIHRpdGxlOiBzdHJpbmcsXG5cdFx0cHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG5cdFx0cHVibGljIHBlb3BsZTogbnVtYmVyLFxuXHRcdHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcblx0KSB7fVxufVxuIiwidHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgU3RhdGU8VD4ge1xuXHRwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XG5cdGFkZExpc3RlbmVyKGxpc3RlbmVyRnVuYzogTGlzdGVuZXI8VD4pIHtcblx0XHR0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRnVuYyk7XG5cdH1cbn1cbiIsImltcG9ydCB7UHJvamVjdCwgUHJvamVjdFN0YXR1c30gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi9iYXNlJztcblxuY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xuXHRwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcblx0cHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcblxuXHRwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG5cdFx0aWYgKHRoaXMuaW5zdGFuY2UpIHtcblx0XHRcdHJldHVybiB0aGlzLmluc3RhbmNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBudW1PZlBlb3BsZTogbnVtYmVyKSB7XG5cdFx0Y29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KFxuXHRcdFx0TWF0aC5yYW5kb20oKS50b1N0cmluZygpLFxuXHRcdFx0dGl0bGUsXG5cdFx0XHRkZXNjcmlwdGlvbixcblx0XHRcdG51bU9mUGVvcGxlLFxuXHRcdFx0UHJvamVjdFN0YXR1cy5BY3RpdmVcblx0XHQpO1xuXG5cdFx0dGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXHRcdHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG5cdH1cblxuXHRtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XG5cdFx0Y29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcmogPT4gcHJqLmlkID09PSBwcm9qZWN0SWQpO1xuXHRcdGlmIChwcm9qZWN0KSBwcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1cztcblx0XHR0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuXHR9XG5cblx0cHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKSB7XG5cdFx0Zm9yIChjb25zdCBsaXN0ZW5lckZ1bmMgb2YgdGhpcy5saXN0ZW5lcnMpIHtcblx0XHRcdGxpc3RlbmVyRnVuYyh0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XG4iLCJleHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25Qcm9wcyB7XG5cdHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XG5cdGlzUmVxdWlyZWQ/OiBib29sZWFuO1xuXHRtaW5MZW5ndGg/OiBudW1iZXI7XG5cdG1heExlbmd0aD86IG51bWJlcjtcblx0bWluPzogbnVtYmVyO1xuXHRtYXg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh7XG5cdHZhbHVlLFxuXHRpc1JlcXVpcmVkLFxuXHRtaW5MZW5ndGgsXG5cdG1heExlbmd0aCxcblx0bWluLFxuXHRtYXgsXG59OiBWYWxpZGF0aW9uUHJvcHMpIHtcblx0bGV0IGlzVmFsaWQgPSB0cnVlO1xuXG5cdGlmIChpc1JlcXVpcmVkKSB7XG5cdFx0aXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMDtcblx0fVxuXG5cdGlmIChtaW5MZW5ndGggJiYgbWluTGVuZ3RoID4gMCAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0aXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsdWUubGVuZ3RoID49IG1pbkxlbmd0aDtcblx0fVxuXG5cdGlmIChtYXhMZW5ndGggJiYgbWF4TGVuZ3RoID4gMCAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0aXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsdWUubGVuZ3RoIDw9IG1heExlbmd0aDtcblx0fVxuXG5cdGlmIChtaW4gJiYgbWluID4gMCAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cdFx0aXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsdWUgPj0gbWluO1xuXHR9XG5cblx0aWYgKG1heCAmJiBtYXggPiAwICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcblx0XHRpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWx1ZSA8PSBtYXg7XG5cdH1cblxuXHRyZXR1cm4gaXNWYWxpZDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtQcm9qZWN0SW5wdXR9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0JztcbmltcG9ydCB7UHJvamVjdExpc3R9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QnO1xuXG5uZXcgUHJvamVjdElucHV0KCk7XG5uZXcgUHJvamVjdExpc3QoJ2FjdGl2ZScpO1xubmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9