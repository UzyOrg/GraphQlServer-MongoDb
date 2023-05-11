import mongoose from "mongoose";



mongoose.connect(import.meta.env.VITE_MONGODB_URI,{  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(()=>{
    console.log("conectado exitosamente").catch(error=>{
        console.log("error connection to mongodb", error.message)
    })
})