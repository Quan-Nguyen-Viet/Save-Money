import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import saving from './routers/saving.js';
import history from './routers/history.js';
import user from './routers/user.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.port || 5000;

const URI = 'mongodb+srv://admin:Asfvdn4nu2Ry4jOx@cluster0.jimix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(express.urlencoded({ extended: true, limit: '30mb'}));
app.use(express.json({limit: '30mb'}));
app.use(cors());
 
app.use('/saving', saving);
app.use('/history', history);
app.use('/user', user);

mongoose
.connect(URI, { UseNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log('Server is running on Port', PORT);
  });
})
.catch((err) => {
  console.log('err',err);
});
