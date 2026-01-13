const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        mongoose.set('strictQuery', false);
       const connection = await mongoose.connect("mongodb+srv://root:957SM72LeXhxJSG8@hzs-radionica.mwsmm.mongodb.net/HealthFitnessApp?appName=HZS-radionica")
        console.log('MongoDB Connected: ' + connection.connection.host);
    } catch (error) {
        console.error("error: "+ error.message)
        process.exit(1);
    }
}
module.exports = connectDB;