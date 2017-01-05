<img src="http://i.imgur.com/WQWi5sS.png" height="200px">

# vuefire-quickstart

> A boilerplate for web applications using Vue.js and Firebase. It utilizes the Vue CLI's webpack template.

[**A demo version is available here:** https://vuefire-quickstart-demo.firebaseapp.com/]
(https://vuefire-quickstart-demo.firebaseapp.com/)

## Build Setup

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Deploy to Firebase

**Note:** When deploying with Firebase, you will be prompted for the directory
name that contains your built app. By default, Firebase searches for a `public`
directory. You should change this to `dist` to avoid having to modify the build
process that came with the template.

``` bash

# build for production with minification
npm run build

# make sure you've installed the firebase CLI
npm install -g firebase-tools

# initialize a firebase app; see above note
firebase init

# deploy to firebase servers
firebase deploy

```
