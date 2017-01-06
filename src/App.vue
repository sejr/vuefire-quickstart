<!-- App.vue
  This component is the root component for our Vue application. It is rendered
  in the project root's index.html file with the <div id='app'> tag. The Firebase
  instance exists only within this component.
-->

<template>
  <div id='app'>

    <form id='todosForm' v-on:submit.prevent='addTodo'>
      <input type='text'
       class='form-control new-todo'
       v-model.trim='newTodo.text'
       placeholder='I need to...'>
    </form>

    <!-- List todos -->

    <ul class="list-group todoContainer">
      <li class="list-group-item" v-for="todo in todos" :key="todo['.key']" v-if="!todo.isDone">
        <span class="float-xs-right">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="todo.isDone" v-on:click="toggleTodo(todo)">
            </label>
          </div>
          <!-- <i v-bind:class="[todo.isDone ? 'ion-android-checkbox-outline' : 'ion-android-checkbox-outline-blank']"> -->
        </span>
        {{ todo.text }}
      </li>
    </ul>

    <ul class="list-group todoContainer">
      <!-- <li class="list-group-item disabled list-header">
        Completed
      </li> -->
      <li class="list-group-item item-done" v-for="todo in todos" v-if="todo.isDone">
        <span class="float-xs-right">
          <div class="checkbox">
            <!-- <label> -->
              <input type="checkbox" v-model="todo.isDone">
            <!-- </label> -->
          </div>
          <!-- <i v-bind:class="[todo.isDone ? 'ion-android-checkbox-outline' : 'ion-android-checkbox-outline-blank']"> -->
        </span>
        {{ todo.text }}
      </li>
    </ul>

    <!-- <div class='jumbotron jumbotron-fluid'>
      <div class='container-fluid'>
        This is a todo item
      </div>
    </div>
    <div class='jumbotron jumbotron-fluid'>
      <div class='container-fluid'>
        This is a todo item
      </div>
    </div> -->

    <!-- <img src='./assets/logo.png' height='150px'> -->
    <!-- Adding a new greeting; pretty much straight from the documentation! -->
    <!-- <form id='form' v-on:submit.prevent='addGreeting'>
      <input type='text' v-model='newGreeting.lang' placeholder='Language Name'>
      <input type='text' v-model='newGreeting.text' placeholder='How do you say hello?'>
      <button class='btn btn-primary btn-lg' type='submit' value='Add Greeting'>Add Greeting</button>
    </form> -->
    <!--
      Here we are iterating through a very simply array of greetings in
      different languages. To do this, we use the 'v-for' directive. This
      is linked to our demo Firebase instance, which is described below.
    -->
    <!-- <h1 v-for='greeting in greetings'>{{ greeting.text }}</h1> -->
  </div>
</template>

<script>
  // This line is new!
  import Firebase from 'firebase'

  /*
   * The config was copied and pasted straight from the Firebase Dashboard.
   * Simply click 'Add Firebase to Your Web App' to access yours.
   */

  let config = {
    apiKey: 'AIzaSyAEgVUAfQ9eRgoJ9xWqdeOj11kbJCiYLOo',
    authDomain: 'vue-todos.firebaseapp.com',
    databaseURL: 'https://vue-todos.firebaseio.com',
    storageBucket: 'vue-todos.appspot.com',
    messagingSenderId: '469755124734'
  }

  // Here we are initializing the Firebase connection.
  let app = Firebase.initializeApp(config)
  let db = app.database()

  // Accessing the greetings reference; .ref() takes a URL as its parameter.
  let todosRef = db.ref('todos')

  export default {
    name: 'app',

    /*
     * This section is added to the original CLI-generated App component. This
     * is where VueFire comes into play, allowing us to link our Vue app to
     * Firebase data relatively simply. More information is on the GitHub page:
     *
     * https://github.com/vuejs/vuefire/
     */

    firebase: {
      todos: todosRef.limitToLast(20)
    },

    data () {
      return {
        newTodo: {
          text: '',
          isDone: false,
          time: null
        }
      }
    },

    // We have added a simple method to add new greetings to our Firebase.
    methods: {
      addTodo: function () {
        if (this.newTodo.text !== '') {
          this.newTodo.time = Date.now()
          todosRef.push(this.newTodo)
          this.newTodo.text = ''
        }
      },

      toggleTodo: function (todo) {
        // console.log(todo)
        todosRef.child(todo['.key']).child('isDone').set(!todo.isDone)
      }
    },

    components: {
      // No
    }
  }
</script>

<style>
  body {
    background: #f7f7f7;
    font-size: 1.3em;
  }

  #app {
    /*padding-top: 50px;*/
  }

  .new-todo {
    border: 0px;
    border-radius: 0px;
    font-size: 1em;
    box-shadow: 0px 1px 2px rgba(0,0,0,.2);
    padding: 20px;
    font-weight: 700;
    position: fixed;
    top: 0;
    z-index: 10;
  }

  .list-group-item {
    padding-top: 20px;
    padding-bottom: 20px;
    background: #fafafa;
    color: #777;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.1);
    font-weight: 400;
    margin-bottom: 0px;
  }

  .item-done {
    background: rgba(0,0,0,.03);
    color: rgba(0,0,0,.3);
  }

  .todoContainer {
    margin-top: 70px;
    z-index: 1;
  }

  .list-header {
    /*padding-top: 10px;
    padding-bottom: 10px;*/
    font-weight: 700;
  }

  /* shared between both checkbox and radio */

.checkbox label {
    padding-left: 25px;
}

input[type="checkbox"] {
    margin: 3px 0 0;
}

.checkbox input[type="checkbox"], .checkbox-inline input[type="checkbox"] {
    -webkit-appearance: none;
    margin-left: -25px;
}

.checkbox input[type="checkbox"]:after, .checkbox-inline input[type="checkbox"]:after {
    /*border-color: rgba(0, 0, 0, 0.2);*/
}

.checkbox input[type="checkbox"]:disabled:after, .checkbox-inline input[type="checkbox"]:disabled:after {
    /*border-color: rgba(0, 0, 0, 0.1);*/
}

.checkbox input[type="checkbox"]:focus, .checkbox-inline input[type="checkbox"]:focus {
    outline: none;
}

/* checkbox */

.checkbox input[type="checkbox"]:after, .checkbox-inline input[type="checkbox"]:after {
    border: 2px solid;
    border-radius: 2px;
    content: '';
    display: block;
    height: 24px;
    transition: 240ms;
    width: 24px;
}

.checkbox input[type="checkbox"]:checked:before, .checkbox-inline input[type="checkbox"]:checked:before {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    /*left: 6px;*/
    margin-top: 4px;
    margin-left: 9px;
    display: table;
    width: 6px;
    height: 12px;
    border: 2px solid #888;
    border-top: 0;
    border-left: 0;
    content: '';
}

.checkbox input[type="checkbox"]:checked:after, .checkbox-inline input[type="checkbox"]:checked:after {
    background-color: rgba(0,0,0,.05);
    border-color: rgba(0,0,0,.05);
    content: ''
}

.checkbox input[type="checkbox"]:disabled:checked:after, .checkbox-inline input[type="checkbox"]:disabled:checked:after {
    background-color: rgba(0, 0, 0, 0.26);
    border-color: transparent;
}
</style>
