// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueFire from 'vuefire'

import App from './App'

/*
 * Because we installed VueFire via npm and imported it as a module, we have
 * to add this little snippet of code to 'install' it. If you include the lib
 * via typical <script> tags in your HTML document, this isn't required.
 */

Vue.use(VueFire)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
