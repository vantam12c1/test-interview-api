require('dotenv').config()
const cors = require('cors')
const express = require('express');
const app = express();
const port = (process.env.PORT || 3000) ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// === import routes === //
const authRoute = require('./src/routes/auth.route');
const homeRoute = require('./src/routes/home.route');
const newsRoute = require('./src/routes/news.route');
const userRoute = require('./src/routes/user.route');

mongoose.connect(process.env.URL_DB, {useNewUrlParser: true})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// === use routes === //
app.use('/', homeRoute);
app.use('/api/auth', authRoute);
app.use('/api/news', newsRoute);
app.use('/api/user', userRoute);

app.listen(port, ()=> console.log(`Server is running... ${port}`));