if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./config/app');

app.listen(app.get('port') , () => {
    console.log(`server on port ${app.get('port')}`);
    console.log('Envionment: ' , process.env.NODE_ENV)
});