import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(bodyParser.json())

const mongoURI = 'mongodb://root:example@localhost:27017/'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

  const MessageSchema = new mongoose.Schema({
    message: String,
    createdAt: { type: Date, default: Date.now }
  });
  const Message = mongoose.model('Message', MessageSchema);


app.post('/send', (req, res) => {
  const { message } = req.body;
  if (message) {
    const newMessage = new Message();
    newMessage.collection.insertOne({message})
    console.log('received:', message);
    res.send(`received: ${message}`);
  } else {
    res.status(400).send('Message is missing in the request body');
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
