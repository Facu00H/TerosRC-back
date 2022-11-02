const mongoose = require('mongoose');

module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGO_URL, connectionParams);
    console.log('Connected to database');
  } catch (error) {
    console.log(error);
    console.log('could not connect to database');
  };
};
