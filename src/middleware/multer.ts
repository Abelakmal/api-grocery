import multer from "multer";
import path from "path";
import { ApiError } from "../error/ApiError";

export function upload(folder: string) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../images/${folder}`);
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
      cb(
        new ApiError(
          "Invalid file type. Only PNG, JPG, JPEG, GIF allowed.",
          400
        )
      );
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fieldSize: 1024 * 1024 },
  }).single("image");
}
