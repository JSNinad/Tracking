const exp = require("constants");
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio =require("socket.io");
const { pathToFileURL } = require("url");


const server=http.createServer(app);
const io = socketio(server);


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function (data) {
        io.emit("receive-location",{id: socket.id, ...data});
    });


    socket.on("disconnect",function(){
        io.emit("user-disconnected", socket.id);

    })
   
});


app.get("/",function(req, res){
     res.render("index");

});
server.listen(3000);

// const express = require("express");
// const app = express();
// const http = require("http");
// const path = require("path");
// const socketio = require("socket.io");

// const server = http.createServer(app);
// const io = socketio(server);

// // Serve static files from 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));


// // Set view engine to ejs
// app.set("view engine", "ejs");

// // Handle socket.io connections
// io.on("connection", function(socket) {
//     console.log("A user connected");
// });

// // Route for home page
// app.get("/", function(req, res) {
//     res.render("index");
// });

// // Start the server
// server.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });
