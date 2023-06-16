const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "userManagement",
    resource_type: "auto",
  },
});

const docsStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["pdf", "doc", "docx"],
  params: {
    folder: "userManagement",
    resource_type: "raw",
  },
});

const docxStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["docx"],
  params: {
    folder: "userManagement", // Thư mục lưu trữ tệp docx trên Cloudinary
    resource_type: "auto",
  },
});

// Khởi tạo Multer Storage Cloudinary cho tệp pdf
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "userManagement", // Thư mục lưu trữ tệp pdf trên Cloudinary
    format: async (req, file) => "pdf", // Định dạng tệp sau khi tải lên (pdf)
    public_id: (req, file) => file.originalname, // Tên tệp trên Cloudinary sẽ giống tên tệp gốc
  },
});

// Khởi tạo Multer Storage Cloudinary cho tệp doc
const docStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "userManagement", // Thư mục lưu trữ tệp doc trên Cloudinary
    format: async (req, file) => "doc", // Định dạng tệp sau khi tải lên (doc)
    public_id: (req, file) => file.originalname, // Tên tệp trên Cloudinary sẽ giống tên tệp gốc
  },
});

// Khởi tạo Middleware Multer với các Multer Storage Cloudinary tương ứng
const uploadDocx = multer({ storage: docxStorage });
const uploadPdf = multer({ storage: pdfStorage });
const uploadDoc = multer({ storage: docStorage });

const uploadCloud = multer({ storage });
const uploadDocsCloud = multer({ storage: docsStorage });

module.exports = {
  uploadCloud,
  uploadDocsCloud,
  uploadDocx,
  uploadPdf,
  uploadDoc,
};
