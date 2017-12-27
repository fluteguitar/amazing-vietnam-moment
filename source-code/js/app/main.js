// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
    fetch: function () {
	var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
	console.log(chrome);
	// var todos = chrome.storage.sync.get(STORAGE_KEY) || [];
	todos.forEach(function (todo, index) {
	    todo.id = index
	})
	todoStorage.uid = todos.length
	return todos
    },
    save: function (todos) {
	// chrome.storage.sync.set({STORAGE_KEY, todos})
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}


// visibility filters
var filters = {
    all: function (todos) {
	return todos
    },
    active: function (todos) {
	return todos.filter(function (todo) {
	    return !todo.completed
	})
    },
    completed: function (todos) {
	return todos.filter(function (todo) {
	    return todo.completed
	})
    }
}

// app Vue instance
var app = new Vue({
    // app initial state
    data: {
	lang: DEFAULT_LANG,
	todos: todoStorage.fetch(),
	newTodo: '',
	editedTodo: null,
	visibility: 'all',
	visible: false,
	isShowLongCaption: false,
	defaultCaptionText: {
	    en: DEFAULT_CAPTION_TEXT_EN,
	    vi: DEFAULT_CAPTION_TEXT_VI
	} 
    },

    // watch todos change for localStorage persistence
    watch: {
	todos: {
	    handler: function (todos) {
		todoStorage.save(todos)
	    },
	    deep: true
	}
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
	index: function() {
	    let temp = getRandomInt(0, listImage.length -1 );
	    return listImage[temp];	
	},
	styleObject: function() {
	    let backgroundImageUrl = 'url(' + imagePath + this.index + '.jpg)';
	    console.log(backgroundImageUrl);
	    return {
		"background-color": '#ff6600',
		"background-image": backgroundImageUrl
	    };
	},
	captionData: function() {
	    let temp = database[this.lang][this.index];
	    if (!temp)
		return database[this.lang][12];
	    return temp;
	},
	getLongCaption: function() {
	    let temp = this.captionData.longCaption;
	    if ( !temp )
		return this.defaultCaptionText[this.lang];
	    return temp;
	},
	filteredTodos: function () {
	    return filters[this.visibility](this.todos)
	},
	remaining: function () {
	    return filters.active(this.todos).length
	},
	allDone: {
	    get: function () {
		return this.remaining === 0
	    },
	    set: function (value) {
		this.todos.forEach(function (todo) {
		    todo.completed = value
		})
	    }
	}
    },

    filters: {
	pluralize: function (n) {
	    return n === 1 ? 'item' : 'items'
	}
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
	addTodo: function () {
	    var value = this.newTodo && this.newTodo.trim()
	    if (!value) {
		return
	    }
	    this.todos.push({
		id: todoStorage.uid++,
		title: value,
		completed: false
	    })
	    this.newTodo = ''
	},

	removeTodo: function (todo) {
	    this.todos.splice(this.todos.indexOf(todo), 1)
	},

	editTodo: function (todo) {
	    this.beforeEditCache = todo.title
	    this.editedTodo = todo
	},

	doneEdit: function (todo) {
	    if (!this.editedTodo) {
		return
	    }
	    this.editedTodo = null
	    todo.title = todo.title.trim()
	    if (!todo.title) {
		this.removeTodo(todo)
	    }
	},

	cancelEdit: function (todo) {
	    this.editedTodo = null
	    todo.title = this.beforeEditCache
	},

	removeCompleted: function () {
	    this.todos = filters.active(this.todos)
	}
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
	'todo-focus': function (el, binding) {
	    if (binding.value) {
		el.focus()
	    }
	}
    }
})

// handle routing
function onHashChange () {
    var visibility = window.location.hash.replace(/#\/?/, '')
    if (filters[visibility]) {
	app.visibility = visibility
    } else {
	window.location.hash = ''
	app.visibility = 'all'
    }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

// mount
app.$mount('.container')
