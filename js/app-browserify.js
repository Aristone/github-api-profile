"use strict";

var Promise = require('es6-promise').Promise
// just Node?

// Browserify?
require('whatwg-fetch') //--> not a typo, don't store as a var

// es6 polyfills, powered by babel
require("babel/register")

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
    // start app
    // new Router()
// }
var token = '99137b772878f8a920ee0fb3a1afb07ed8802896'

var urls = [ 'https://api.github.com/users/Aristone','https://api.github.com/users/Aristone/repos' ]

var requests = urls.map((url) => fetch(url).then((r) => r.json()))

function qs(selector) {
    return document.querySelector(selector)
}

Promise.all(requests).then((data) => {
    var profile = data[0],
        repos = data[1]

    var profile_string = ['name', 'login', 'blog', 'location', 'email', 'html_url'].map((key) => `<li>${key}: ${profile[key]}</li>`).join('')
    var repo_string = repos.map((repo) => `<li><a href="${repo.html_url}">${repo.name}</a></li>`).join('')

    qs('.profile img').src = profile.avatar_url
    qs('.profile ul').innerHTML = profile_string
    qs('.repos ul').innerHTML = repo_string
})


//     var Backbone = require("backbone")
//     var GithubRouter = Backbone.Router.extend({
//     routes: {
//         'profile/:username': 'drawProfile',
//         'profile/:username/:message': 'logMessage',
//         '*default': 'home'
//     },
//     drawProfile: function(user){
//         new GithubClient(user)
//     },
//     logMessage: function(user, message){
//         alert(`${user}: ${message}`)
//     },
//     // home: function(slug){
//     //     alert("No username selected")
//     // },
//     initialize: function(){
//         Backbone.history.start()
//     }
// })
//     var router = new GithubRouter()

    var GithubRouter = Backbone.Router.extend({

        routes: {
            ':username': 'drawProfile'
        },
        drawProfile: function(user){
            new GithubClient(user).getData()
        },
        initialize: function(){
            Backbone.history.start()
        }
    })
    var router = new GithubRouter()

