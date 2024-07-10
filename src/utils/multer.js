import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/logo");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.name)
//     );
//   },
// });
// export const upload = multer({ storage: storage });
const storage = multer.diskStorage({
    destination: "public/logo",
    filename: (req, file, cb) => {
      const uniqueSuffix = Math.floor(Math.random() * 1000000);
      const originalname = file.originalname.split(".");
      const extension = originalname.pop();
      const filename = `${originalname.join("")}-${uniqueSuffix}.${extension}`;
      console.log(file,"file in multer");
      cb(null, filename);
    },
  });
  export const upload = multer({ storage: storage });
