const app = require('./app');
app.listen(4000, () => {
    console.log(`Server listening on port ${process.env.PORT || 4000}`);
});