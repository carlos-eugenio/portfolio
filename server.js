const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const about_data = require("./about_data")
const courses_data = require("./courses_data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/about", function(req, res) {
    return res.render("about", { about: about_data })
})

server.get("/", function(req, res) {
    return res.render("courses", { items: courses_data })
})

server.get("/courses", function(req, res) {
    return res.render("courses", { items: courses_data })
});

server.get("/courses/:id", function(req, res) {
    const id = req.params.id
    const info_course = courses_data.find( id_course => id_course.id === `${id}` )
    return res.render("course-details", { items: info_course })
});

server.use(function(req, res) {
    res.status(404).render("not-found")
})

server.listen(5000, function() {
    console.log("Server is running")
})
