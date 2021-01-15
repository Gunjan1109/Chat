const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
app.set('view engine', 'hbs')
app.use(express.static('public'))
var users = []
var admin;
app.get('/user',(req,res) => {
    res.render('userChat')
})

app.get('/admin',(req,res) => {
   
    res.render('adminChat')
})

io.on('connection', socket => {
    console.log("Connected");
    users.push({id:socket.id})
   // console.log(users);
    admin = users[0].id
    //console.log(admin);
    if(users.length === 1){

    }
    else{
        users.pop()
    }
    io.emit('new-user',socket.id)
        socket.on('chat',obj => {
            //data saved in databased
            console.log(obj);
            io.to(admin).emit('chat',obj)
           // io.to(admin).emit('chat',data)

        })
    //})

    socket.on('end-user',id => {
        console.log("End user");
        socket.emit('finish-chat',id)
    })
})
server.listen(3000);