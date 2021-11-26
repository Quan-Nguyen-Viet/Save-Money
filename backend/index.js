import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import saving from './routers/saving.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.port || 5000;

const URI = 'mongodb+srv://admin:Asfvdn4nu2Ry4jOx@cluster0.jimix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb'}));
app.use(cors());
 
app.use('/saving', saving);

app.get('/', (req, res) => {
    res.send('SUCCESS');
});

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
