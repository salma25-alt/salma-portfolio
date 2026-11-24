import multer from 'multer';

// Store file temporarily in memory buffer before streaming to Cloudinary
const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const uploadSingleFile = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error('Invalid file type. Only JPG, PNG, WEBP images and PDFs are allowed.'),
        false
      );
    }
  },
}).single('file');
