const app = require('./app');
require('dotenv').config();
const {PORT} = process.env
console.log(process.env);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});