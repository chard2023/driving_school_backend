const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
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
// const updateExpiredPromoCodesRouter = require('./routes/updateExpiredPromoCodes');

// local imports
const coonectDB = require('./db.js');

// Set up Express app
const app = express();
app.use(express.json());

// cors
app.use(cors());

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
// app.use('/api/updateExpiredPromoCodes', updateExpiredPromoCodesRouter);


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Init upload
const upload = multer({
    storage: storage
}).single('file');

const PORT = 8080;

// Set base URL for uploaded files
const baseUrl = `http://localhost:${PORT}/uploads/`;

// API endpoint to handle file upload
app.post('/api/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: 'Error uploading file' });
      } else {
        const fileUrl = baseUrl + req.file.filename;
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