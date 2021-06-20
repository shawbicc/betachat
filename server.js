const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}})
const PORT = process.env.PORT || 3001;


//var engine = require('consolidate');
app.set('views', __dirname);
//app.engine('html', engine.mustache);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('app')
})
server.listen(PORT, () => {
    console.log('run! server has awaken!')
})

//this is where the back-end logic goes
io.on('connection', socket => {
    console.log(socket.id)
    socket.emit('userConnected')
    socket.on('userConnectedText', data=>{
        io.emit('statusText', data)
    })
    socket.on('message', data => {
        socket.broadcast.emit('message', data)
    })
})
io.on('disconnection', socket=>{
    io.emit('statusText', "A user left")
})
