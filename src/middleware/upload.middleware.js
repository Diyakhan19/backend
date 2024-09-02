import multer, { diskStorage } from "multer";

const profileImgs = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/avatars");
    },
    filename: (req, file, cb) => {
      let fileName = new Date().getMilliseconds() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const destinationImgs = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/destinations");
    },
    filename: (req, file, cb) => {
      let fileName = new Date().getMilliseconds() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const postImgs = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/posts");
    },
    filename: (req, file, cb) => {
      let fileName = new Date().getMilliseconds() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const hotelImgs = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/hotels");
    },
    filename: (req, file, cb) => {
      let fileName = new Date().getMilliseconds() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const roomImgs = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/rooms");
    },
    filename: (req, file, cb) => {
      let fileName = new Date().getMilliseconds() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const transportImgs = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/transports");
    },
    filename: (req, file, cb) => {
      let fileName = new Date().getMilliseconds() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const upload = {
  profileImgs,
  destinationImgs,
  postImgs,
  hotelImgs,
  roomImgs,
  transportImgs,
};

export default upload;
