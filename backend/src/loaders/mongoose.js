'use strict';

const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};


const setupDBConnection = async () => {
  try {
    await mongoose
      .connect('mongodb://sinf-mongodb', options)
      .then(() =>
        console.log('Mongoose connected to mongodb://sinf-mongodb'),
      );
  } catch (err) {
    console.error(
      'Mongoose: failure in initial connection to the DB (aborting, will not retry)',
      err,
    );
    process.exit(44);
  }

  mongoose.connection.on('error', err => {
    console.error('Mongoose connection error: ', err);
  });
};

module.exports = setupDBConnection;
