import multer from "multer";
import path from "path";
import { ApiError } from "../error/ApiError";
import { imgUploadPath } from "../helper/config";

// Fungsi upload menggunakan folder yang diberikan
export function upload() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Gunakan variabel lingkungan untuk path penyimpanan
      cb(null, imgUploadPath);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        path.parse(file.originalname).name +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });

  const fileFilter = (req: any, file: any, cb: CallableFunction) => {
    if (
      file &&
      (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg")
    ) {
      cb(null, true);
    } else {
      cb(new ApiError("Invalid file type. Only PNG, JPG, JPEG allowed.", 400));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 }, // Mengatur ukuran maksimal file menjadi 1MB
  }).single("image");
}
