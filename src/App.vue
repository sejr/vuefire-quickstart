<!-- App.vue
  This component is the root component for our Vue application. It is rendered
  in the project root's index.html file with the <div id="app"> tag. The Firebase
  instance exists only within this component.
-->

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- Adding a new greeting; pretty much straight from the documentation! -->
    <form id="form" v-on:submit.prevent="addGreeting">
      <input type="text" v-model="newGreeting.lang" placeholder="Language Name">
      <input type="text" v-model="newGreeting.text" placeholder="How do you say hello?">
      <input type="submit" value="Add Greeting">
    </form>
    <!--
      Here we are iterating through a very simply array of greetings in
      different languages. To do this, we use the "v-for" directive. This
      is linked to our demo Firebase instance, which is described below.
    -->
    <h1 v-for="greeting in greetings">{{ greeting.text }}</h1>
  </div>
</template>

<script>
  import Hello from './components/Hello'

  // This line is new!
  import Firebase from 'firebase'

  /*
   * The config was copied and pasted straight from the Firebase Dashboard.
   * Simply click "Add Firebase to Your Web App" to access yours.
   */

  let config = {
    apiKey: 'AIzaSyB3B6_lHNK5JXKNa8SIskj71aha6I9ZekA',
    authDomain: 'vuefire-quickstart-demo.firebaseapp.com',
    databaseURL: 'https://vuefire-quickstart-demo.firebaseio.com',
    storageBucket: 'vuefire-quickstart-demo.appspot.com',
    messagingSenderId: '248222879987'
  }

  // Here we are initializing the Firebase connection.
  let app = Firebase.initializeApp(config)
  let db = app.database()

  // Accessing the greetings reference; .ref() takes a URL as its parameter.
  let greetingsRef = db.ref('greetings')

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
      greetings: greetingsRef.limitToLast(10)
    },

    data () {
      return {
        newGreeting: {
          lang: '',
          text: ''
        }
      }
    },

    // We have added a simple method to add new greetings to our Firebase.
    methods: {
      addGreeting: function () {
        greetingsRef.push(this.newGreeting)
        this.newGreeting.lang = ''
        this.newGreeting.text = ''
      }
    },

    components: {
      Hello
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
