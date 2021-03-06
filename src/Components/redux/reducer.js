const initialState = {
  manager_id: null,
  username: '',
  managerfirstname: '',
  managerlastname: '', 
  email: '',
  company: '',
  taskname: '',
  tasknotes: '',
  devfirstname: '',
  devlastname: '',
  productname: '',
  productid: 0,
  componentname: '',
	tasks: [],
	devs: [],
	dev: [
		{
			firstname: '',
			last_name: '',
			title: ''
		}
	],
	products: []
}

const UPDATE_MANAGER_ID = 'UPDATE_MANAGER_ID'
const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_MANAGERFIRSTNAME = 'UPDATE_MANAGERFIRSTNAME'
const UPDATE_MANAGERLASTNAME = 'UPDATE_MANAGERLASTNAME'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_COMPANY = 'UPDATE_COMPANY'
const UPDATE_TASKNAME = 'UPDATE_TASKNAME'
const UPDATE_DEVFIRSTNAME = 'UPDATE_DEVFIRSTNAME'
const UPDATE_DEVLASTNAME = 'UPDATE_DEVLASTNAME'
const UPDATE_PRODUCTNAME = 'UPDATE_PRODUCTNAME'
const UPDATE_PRODUCTID = 'UPDATE_PRODUCTID'
const UPDATE_COMPONENTNAME = 'UPDATE_COMPONENTNAME'
const UPDATE_TASKDETAILS = 'UPDATE_TASKDETAILS'
const UPDATE_TASKS = 'UPDATE_TASKS'
const UPDATE_DEVS = 'UPDATE_DEVS'
const UPDATE_DEV = 'UPDATE_DEV'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

export function updateManagerId(id) {
	return {
		type: UPDATE_MANAGER_ID,
		payload: id
	}
}

export function updateUsername(username) {
	return {
		type: UPDATE_USERNAME,
		payload: username
	}
}

export function updateManagerFirstName(managerfirstname) {
	return {
		type: UPDATE_MANAGERFIRSTNAME,
		payload: managerfirstname
	}
}

export function updateManagerLastName(managerlastname) {
	return {
		type: UPDATE_MANAGERLASTNAME,
		payload: managerlastname
	}
}

export function updateEmail(email) {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}

export function updateCompany(company) {
	return {
		type: UPDATE_COMPANY,
		payload: company
	}
}

export function updateTaskName(taskname) {
	return {
		type: UPDATE_TASKNAME,
		payload: taskname
	}
}

export function updateDevFirstName(devfirstname) {
	return {
		type: UPDATE_DEVFIRSTNAME,
		payload: devfirstname
	}
}

export function updateDevLastName(devlastname) {
	return {
		type: UPDATE_DEVLASTNAME,
		payload: devlastname
	}
}

export function updateProductName(productname) {
	return {
		type: UPDATE_PRODUCTNAME,
		payload: productname
	}
}

export function updateProductId(productid) {
	return {
		type: UPDATE_PRODUCTID,
		payload: productid
	}
}

export function updateComponentName(componentname) {
	return {
		type: UPDATE_COMPONENTNAME,
		payload: componentname
	}
}

export function updateTaskDetails(taskdetails) {
	return {
		type: UPDATE_TASKDETAILS,
		payload: taskdetails
	}
}

export function updateTasks(tasks) {
	return {
		type: UPDATE_TASKS,
		payload: tasks
	}
}

export function updateDevs(devs) {
	return {
		type: UPDATE_DEVS,
		payload: devs
	}
}

export function updateDev(dev) {
	return {
		type: UPDATE_DEV,
		payload: dev
	}
}

export function updateProducts(products) {
	return {
		type: UPDATE_PRODUCTS,
		payload: products
	}
}

export default function reducer(state = initialState, action){
  const {type, payload} = action
  switch (type) {
    case UPDATE_MANAGER_ID:
      return {...state, manager_id: payload}
    case UPDATE_USERNAME:
      return {...state, username: payload}
    case UPDATE_MANAGERFIRSTNAME:
      return {...state, managerfirstname: payload}
    case UPDATE_MANAGERLASTNAME:
      return {...state, managerlastname: payload}
    case UPDATE_EMAIL:
      return {...state, email: payload}
    case UPDATE_COMPANY:
      return {...state, company: payload}
    case UPDATE_TASKNAME:
      return {...state, taskname: payload}
    case UPDATE_DEVFIRSTNAME:
      return {...state, devfirstname: payload}
    case UPDATE_DEVLASTNAME:
      return {...state, devlastname: payload}
    case UPDATE_PRODUCTNAME:
      return {...state, productname: payload}
    case UPDATE_PRODUCTID:
      return {...state, productid: payload}
    case UPDATE_COMPONENTNAME:
      return {...state, componentname: payload}
    case UPDATE_TASKS:
      return {...state, tasks: payload}
    case UPDATE_DEVS:
      return {...state, devs: payload}
    case UPDATE_DEV:
      return {...state, dev: payload}
    case UPDATE_PRODUCTS:
      return {...state, products: payload}
    case UPDATE_TASKDETAILS:
      const {taskname, tasknotes, devfirstname, devlastname, componentname} = payload
      return {...state, taskname, tasknotes, devfirstname, devlastname, componentname}
    default:
      return state;
  }
}