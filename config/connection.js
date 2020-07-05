const mongoose = require('mongoose')
const config = require('config')
const dbString = process.env.DATABASEURL

const connectDB = async () => {
    try {
        await mongoose.connect(dbString, { useNewUrlParser: true, 
            useUnifiedTopology: true,
             useFindAndModify: false,
              useCreateIndex: true})

        console.log('DB connected...')
    } catch(err) {
        console.error(err.message)

        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB