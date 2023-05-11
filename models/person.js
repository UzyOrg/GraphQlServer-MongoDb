import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        minLength: 5
        
    }, 
    phone: {
        type: String,
        minLength: 5
    },
    city:{
        type: String,
        required: true,
        minLength: 5
    },
    street: {
        type: String,
        required: true,
        minLength: 5
    }
})
mongoose.plugin(uniqueValidator);
export default mongoose.model('Person',schema)