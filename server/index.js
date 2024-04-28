import mangoose from "mongoose";
import express from "express";
import cors from "cors";
import {UserModel} from "./models/Users.js"


const app = express();
app.use(express.json());
app.use(cors());

mangoose.connect('mongodb://localhost:27017/business_mgmt')
.then(() => console.log('Database connected successfully'))
 .catch(err => console.error('Database connection error:', err));


  // Define API endpoints
  app.get('/api/datas', async (req, res) => {
    try {
      const datas = await UserModel.find();
      res.json(datas);
      console.log(datas)
    } catch (error) {
      console.error('Error fetching cards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  app.post('/api/datas', async (req, res) => {
    try {
       console.log('Request body:', req.body); // Log the request body
       const {id, name, createdOn, location } = req.body;
       const newUser = new UserModel({
         id,
         name,
         createdOn,
         location,
       });
   
       await newUser.save();
       console.log('User saved:', newUser);
       res.status(201).json(newUser);
    } catch (error) {
       console.error('Error posting data:', error);
       res.status(500).json({ error: 'Internal server error', details: error.message });
    }
   });

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
