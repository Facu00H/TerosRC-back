const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log("Database Conected"))
  .catch(err => console.error(err))