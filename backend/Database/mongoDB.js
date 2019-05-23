const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

//mongoose.set('useCreateIndex', true);

//Build the connection string

let dbURI;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Configuration to avoid warning "DeprecationWarning" of moongose in the functions:
// 'findOneAndModify ()' and 'findOneAndDelete ()'
mongoose.set('useFindAndModify' , false)

module.exports = {
  mongoose,
  connect: async () => {
    mongoose.Promise = Promise;

    switch (process.env.NODE_ENV) {
      case 'test':
        const mongoServer = new MongoMemoryServer();
        let mongoUri = await mongoServer.getConnectionString()
        dbURI = mongoUri;
        //return mongoose.connect(mongoUri, { useNewUrlParser: true });
        break;
      case 'production':
        dbURI = 'mongodb://localhost:27017/feedbacks';
        //return mongoose.connect(dbURI, { useNewUrlParser: true });
        break;
      case 'dev':
      default:
        dbURI = 'mongodb://localhost:27017/feedbacks';
        //return mongoose.connect(dbURI, { useNewUrlParser: true });
        break;
    }
    return mongoose.connect(dbURI, { useNewUrlParser: true });
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};