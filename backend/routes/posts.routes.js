const validator = require('validator');
const { BlobServiceClient } = require('@azure/storage-blob');
const express = require('express');
const router = express.Router();
var multer  = require('multer');
/*
var storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    const uniquePrefix = Math.round(Math.random() * 1E6);
    cb(null, uniquePrefix + file.originalname);
  },  
});
*/
let uploadCount = 0;
let storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split('.')[1];
  const pass = ['jpg', 'jpeg', 'png', 'svg'].includes(ext) && uploadCount < 50;
  if (!pass) {
    req.fileRejected = true;
  } else {
    // filename for req.file seem not to work for memoryStorage
    req.filename = Math.round(Math.random() * 1E6) + file.originalname;
    uploadCount++;
  }
  cb(null, pass);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });


const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      // .select('author created title photo')
      .sort({created: -1});    
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result.map(r => r.toClient()));
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result.toClient());
      
  }
  catch(err) {
    res.status(500).json(err);
  }
});
const validation = (input) => {
  let { author, email, title,text } = input;
  if ( 
    author && 
    title && title.length > 10 && title.length < 25 &&
    text && text.length > 20 &&
    email && validator.isEmail(email)
  ) {
    return true;
  } else {
    return false;
  }
};
router.post('/posts', upload.single('photo'), async (req, res) => {
  let { author, email, publishDate, editDate, status, title,text } = req.body;
  if (validation(req.body)) {    
    editDate = new Date();
    publishDate = publishDate ? publishDate :  editDate;
    status = 'published';
    if (req.fileRejected) {
      res.status(400).json({message: 'ERROR. File has wrong format, or upload limit reached'});
    } else {
      try {
        let postData;
        if (req.file) {
          const { filename } = req;
          // upload file data
          await uploadToAzure(filename, req.file.buffer, req.file.buffer.length);
          postData = { author, email, publishDate, editDate, status, title, text, photo: filename };
        } else {
          postData =  { author, email, publishDate, editDate, status, title, text };
        }
        const newPost = new Post(postData);
        const savedPost = await newPost.save();
        res.json(savedPost.toClient());
      } catch(err) {
        res.status(500).json(err);
      }
    }
    
  } else {
    res.status(400).json({message: 'ERROR. Required fields are missing or incorrect'});
  }
 
});

async function uploadToAzure(blobName, data, fileSizeInBytes) {

  const AZURE_BLOBS_STRING = process.env.AZURE_BLOBS_STRING;
  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_BLOBS_STRING);

  // Create a unique name for the container
  const containerName = 'bulletin-board';

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName); 

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // choose MIME
  const ext = blobName.split('.')[1];
  let MIME;
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      MIME = 'image/jpeg';
      break;
    case 'png':
      MIME = 'image/png';
      break;
    default:
      MIME = 'image/svg+xml';
      break;
  }

  // Upload data to the blob
  const uploadBlobResponse = await blockBlobClient.upload(data, fileSizeInBytes, {blobHTTPHeaders: {blobContentType: MIME}});
  console.log('Blob was uploaded successfully. Response: ', uploadBlobResponse);
  return uploadBlobResponse;
}

module.exports = router;
