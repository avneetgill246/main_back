const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://avneetsinghgill246:Liverpoolfc66@fpl-data.mjrew.mongodb.net/movies_db?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true
},()=>{
    console.log('connected')
})
