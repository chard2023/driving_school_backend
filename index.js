const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const fullPath = path.join(__dirname, 'public', 'uploads');
    fs.mkdir(fullPath, (err) => {
      if (err && err.code !== 'EEXIST') {
        console.error(err);
        cb(err, null); // Pass the error to the callback function
      } else {
        cb(null, fullPath); // Pass null as the first argument to indicate there is no error
      }
    });
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// route imports
const productRoutes = require('./routes/product');
const courseRoutes = require('./routes/course');
const branchRoutes = require('./routes/branch');
const TCRoutes = require('./routes/trainingCenter');
const vehicleRoutes = require('./routes/vehicle');
const userRoutes = require('./routes/user');
const promoRoutes = require('./routes/promoCode');
const orderRoutes = require('./routes/order');

// local imports
const coonectDB = require('./db.js');

// Set up Express app
const app = express();
app.use(express.json());

// cors
const allowedOrigins = ['https://driving-school-backend.vercel.app'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes
app.use('/api/product', productRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/training_center', TCRoutes);
app.use('/api/vehicle_course', vehicleRoutes);
app.use('/api/user', userRoutes);
app.use('/api/promo_code', promoRoutes);
app.use('/api/order', orderRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Init upload
const upload = multer({
    storage: storage
}).single('file');

const PORT = 8080;

// API endpoint to handle file upload
app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: 'Error uploading file', error: err });
    } else {
      const serverUrl = `${req.protocol}://${req.get('host')}`;
      const fileUrl = `${serverUrl}/uploads/${req.file.filename}`;
      console.log("fileUrl: ",fileUrl);
      res.status(200).json({ message: 'File uploaded successfully', fileUrl: fileUrl });
    }
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


coonectDB()
    .then(() => {
        console.log('db connection succeeded.')
    })
    .catch(err => console.log(err))