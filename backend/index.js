import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'

//config dotenv
dotenv.config()
const app = express();

//database config
connectDB();

//middleware use of morgan
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/products', productRoutes);




//rest api
app.get('/', (req, res) => {
    res.send("welcome ji")
});

//port
const PORT = process.env.PORT || 8080;

//app run 
app.listen(PORT, () => {
    console.log(`server is running ${PORT} `)
})
