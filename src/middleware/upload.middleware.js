import multer, { diskStorage } from "multer";

const profileImg = multer({
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

const upload = {
  profileImg,
};

export default upload;
