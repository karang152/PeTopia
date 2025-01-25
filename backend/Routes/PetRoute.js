// Importing required modules and controllers
import express from "express"; // For creating and managing routes
import multer from "multer"; // For handling file uploads
import path from "path"; // For handling and transforming file paths
import { postPetRequest, approveRequest, deletePost, allPets } from "../Controller/PetController.js"; // Importing pet-related controller functions

// Initializing the router object to define routes
const router = express.Router();

// Configuring multer storage for handling file uploads
const storage = multer.diskStorage({
  // Setting the destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images')); // Files will be saved in the 'images' folder
  },
  // Setting a unique filename for uploaded files
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

// Creating the multer instance with the defined storage configuration
const upload = multer({ storage: storage });

// Route to fetch all pets with a 'Pending' status
router.get('/request', (req, res) => allPets('Pending', req, res));

// Route to fetch all pets with an 'Approved' status
router.get('/approvedPets', (req, res) => allPets('Approved', req, res));

// Route to fetch all pets with an 'Adopted' status
router.get('/adoptedPets', (req, res) => allPets('Adopted', req, res));

// Route to handle pet service requests, including file uploads
// 'upload.single('picture')' ensures a single image file is uploaded with the key 'picture'
router.post('/services', upload.single('picture'), postPetRequest);

// Route to approve a pet request using its ID
router.put('/approving/:id', approveRequest);

// Route to delete a pet entry using its ID
router.delete('/delete/:id', deletePost);

// Exporting the router object to use in other parts of the application
export default router;
