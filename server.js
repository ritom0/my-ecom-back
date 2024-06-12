const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express();
app.use(cookieParser())

const allowedOrigins = [
    'http://localhost:3000',
    'https://fantastic-speculoos-ca9f69.netlify.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true // if you need to send cookies or HTTP authentication
  }));

app.use(express.json())             

app.use(fileUpload({
    useTempFiles:true
}))

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.json({msg:"This is Example"})
})

app.listen(PORT,() => {
    console.log("SERVER IS RUNNING ...")
})

//Routes 
app.use('/user',require('./routes/useRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))


//connect mongoDB

const URI = process.env.MONGODB_URL;


mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    connectTimeoutMS: 60000, // 30 seconds
    socketTimeoutMS: 60000, 
}).then(()=>{
    console.log("MongoDB Connected")
}).catch(err => {
    console.log(err)
})
