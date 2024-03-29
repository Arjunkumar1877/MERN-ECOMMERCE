const port = 4000;
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { Products } from './models/productSchema.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDb connected')
})
.catch((err)=>{
    console.log(err)
})


app.get('/', (req,res)=>{
    res.json("hellooooooooooooooo")
})

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file,cb)=>{
  return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage: storage});
app.use('/images', express.static('uploads/images'));
app.post('/upload',upload.single('product'), async(req,res)=>{
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

app.post('/add-product', async(req,res)=>{
    try {
        const product = new Products({
             id:1,
  name:"arjun",
  image:"fgdddgfd",
  category:"gdgfdgjk",
  new_price:23,
  old_price:54,
       })

      const saved = await product.save()

      res.json(saved)
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(port, ()=>{
    console.log('Server is running on port 4000!!!');
});
