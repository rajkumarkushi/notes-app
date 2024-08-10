const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/notebook"

// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log('connected to mongoose')
//     })
// }
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Errorr connecting to MongoDB:', error);
    }
};

module.exports=connectToMongo;

