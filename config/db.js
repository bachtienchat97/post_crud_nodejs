const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // đã tích hợp sẵn useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // đã tích hợp sẵn useFindAndModify: false
    })
    console.log('đã kết nối thành công cơ sở dữ liệu')
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;