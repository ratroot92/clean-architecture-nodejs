
require('./db/db')


const express =require('express');
const bodyParser=require('body-parser');
const path=require('path');
const exhbs  = require('express-handlebars');
const cookieParser=require('cookie-parser');
const expressSession=require('express-session');
const cors=require('cors');





//require routres for local_app 
var loginRouter=require('./local_app/routes/login/login.route');
var sourcesRouter=require('./local_app/routes/sources/sources.route')


//end require routers 

//require routres for api 
var api_loginRouter=require('./restfull_app/routes/login.route');



//end require routers 

const app=express();


app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));

app.use(expressSession({
    resave: true,
    saveUninitialized: true
}));

//falsh mesage middleware
app.use((req,res,next)=>{
    res.locals.message=req.session.message,
    delete req.session.messages
    next()
})



app.engine( 'hbs', exhbs( {
  extname: 'hbs',
  defaultLayout: 'main',
 
}));
app.set('/views',path.join(__dirname,'views'));
app.use(express.static('public'))
app.use('/mdbootstrap', express.static(__dirname + '/node_modules/mdbootstrap'));
app.set('view engine', 'hbs');



//register routes here local app
app.use('/',loginRouter);
app.use('/sources',sourcesRouter);
//end reghister routes here 

//register routes here restfull_api
app.use('/api/login',api_loginRouter);

//end reghister routes here 

const PORT =process.env.PORT || 3001;
let server=app.listen(PORT,(err)=>{
    if(!err){
        console.log("server has beens started at port = "+PORT);
    }
    else{
        console.log("error at server "+err);
    }
});

var io = require('socket.io')(server);
global.io = io; //added
require('./socket.js')(io)



// io.on('connection', (socket) => {
//     console.log('The user is connected');

//     socket.on('new-message', (message,userInfo) => {
//         console.log(userInfo);
//         console.log(message);

//       io.emit('message', {type:'new-message', text: message});   
//     });

//     socket.on('disconnect', function(){
//       console.log('The user is disconnected');
//     });

//     socket.on('add-message', (data) => {
//        // console.log(userInfo);
//       //  console.log(message);
//       data=[1,2,3];
//       io.emit('message', {type:'new-message', data: data});   
//     });

//     socket.on('add-record', (record) => {
//       io.emit('getrecord', {type:'new-record', text: record});   
//     });
//     data=[1,2,3];
//     io.emit('message', {type:'new-message', data: data}); 
//   });


  module.export = express();