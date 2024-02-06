const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Files");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// const upload = multer({ storage: fileStorageEngine });

const upload = multer({
  storage: fileStorageEngine,
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === "image" && !file.mimetype.startsWith("image/")) {
//       return cb(new Error("Only image files are allowed for the image field!"));
//     }
//     cb(null, true);
//   },
});

module.exports = upload;