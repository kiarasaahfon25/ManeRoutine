// main server file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const pool = require('./config/db'); 

const app = express();
const PORT = 5000; 

app.use(cors()); 
app.use(bodyParser.json()); 


//const helmet = require('helmet');
//require('dotenv').config();
//app.use(helmet());
//app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/hairquizRoutes');
//const productRoutes = require('./routes/products');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
//app.use('/api/products', productRoutes);

//const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => 
    console.log(`Server running on port ${PORT}`));
