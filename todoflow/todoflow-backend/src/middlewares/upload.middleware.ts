import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads", "avatars");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const userId = (req as any).userId ?? "anon";
    const ext = path.extname(file.originalname);
    cb(null, `${userId}-${Date.now()}${ext}`);
  },
});

function fileFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
}

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("avatar");