import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import route from './routes/routes.js';
import productRoute from './routes/productRouter.js'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongo_url = process.env.MONGO_CONN;

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', route);
app.use('/product', productRoute);

mongoose.connect(mongo_url)
    .then(()=>{
        console.log('MongoDB Connected...');
    }).catch((error) => {
        console.log('MongoDB Connection Error: ',error);
        
    });

app.get('/', (req,res) => {
    res.send('Hello World');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
