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
});

app.post('/add-product', async(req,res)=>{
    try {
       let products = await Products.find({});
       let id;
       if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
       }else{
        id = 1;
       }
        const product = new Products({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        console.log(product)
      const saved = await product.save()

      res.json({success: true, name: req.body.name})
    } catch (error) {
        console.log(error.message)
    }
});

app.post('/removeproduct', async(req, res)=>{
    await Products.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get('/allproducts', async(req, res)=>{
    let products = await Products.find({});
    console.log("all products fetched");
    console.log(products)
    res.send(products)
})

app.listen(port, ()=>{
    console.log('Server is running on port 4000!!!');
});
