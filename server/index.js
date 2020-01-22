
require('./db/db')


const express =require('express');
const bodyParser=require('body-parser');
const path=require('path');
const exhbs  = require('express-handlebars');



//require routres 
var loginRouter=require('./local_app/routes/login/login.route')


//end require routers 

const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));




app.engine( 'hbs', exhbs( {
  extname: 'hbs',
  defaultLayout: 'main',
 
}));
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'hbs');



//register routes here 
app.use('/',loginRouter);

//end reghister routes here 

const PORT =process.env.PORT || 3001;
app.listen(PORT,(err)=>{
    if(!err){
        console.log("server has beens started at port = "+PORT);
    }
    else{
        console.log("error at server "+err);
    }
});