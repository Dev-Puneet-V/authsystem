require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model/user');
const app = express();
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const SALT_ROUND = parseInt(process.env.SALT_ROUND);
app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});

app.post('/register', async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    if (!(email && password && firstname && lastname)) {
        res.status(400).send('All fields are required');
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        res.status(401).send("User already exists");
    }
   const myEncPassword = await bcrypt.hash(password, SALT_ROUND);
   const user = await User.create({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password: myEncPassword
   });
   const secret = process.env.JWT_SECRET;
   const token = jwt.sign({
    user_id: user._id,
    email: email
   }, secret, {
        expiresIn: '2h',
    });
    user.token = token;
    user.password = undefined;

    res.status(201).json(user);

})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;