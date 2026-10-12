//Slide 10 Setting up Mongoose PowerPoint

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
    mongoUri: process.env.MONGO_URI ||
    // "mongodb+srv://Blessing:qzzJjISAcwfPklIo@cluster0.txlxgvp.mongodb.          //Blessings hardcoded credentials in the Setup PP (slide 20)
    // net/Skeleton?retryWrites=true&w=majority"                                   //Doesn't appear to be required by the assignment?
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/Portfolio'
}

export default config;