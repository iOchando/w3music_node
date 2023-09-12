import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import dbConnect from "./config/postgres";
import AppDataSource from "./config/data.source";
// import { Server, Socket } from "socket.io";
import * as http from "http";
import * as https from "https";
const fs = require("fs");
import swaggerUi, { serve } from "swagger-ui-express";
import swaggerSetup from "./config/swagger";
import multer from "multer";

// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage";

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/", router);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// app.post("/api/ipfs/files", cors(), multer().array("files"), async function (req, res) {
//   if (req.files) {
//     var item = [];
//     for (var i = 0; i < Number(req.files.length); i++) {
//       const client = new Web3Storage({ token });
//       const files = [new File([req.files[i].buffer], req.files[i].originalname)];
//       const cid = await client.put(files);

//       item.push({ data: cid, nombre: req.files[i].originalname });
//     }
//     res.json(item);
//   } else {
//     res.json(req.body);
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[file.mimetype.split("/").length - 1]);
  },
});

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;
async function storeNFT(imagePath: string, name: string, description: string) {
  // load the file from disk
  const image = await fileFromPath(imagePath);

  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY as string });

  console.log(image);

  // call client.store, passing in the image & metadata
  return nftstorage.store({
    image,
    name,
    description,
  });
}

function getFileName(filePath: string): string {
  return filePath.split("/").pop() || "file";
}

function getFileType(filePath: string): string {
  // Implementa lógica para obtener el tipo MIME basado en la extensión del archivo.
  // Aquí solo se muestran ejemplos para imágenes, audios y videos comunes.

  const ext = filePath.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "mp3":
      return "audio/mpeg";
    case "wav":
      return "audio/wav";
    case "mp4":
      return "video/mp4";
    case "avi":
      return "video/x-msvideo";
    default:
      return "application/octet-stream";
  }
}

async function fileFromPath(filePath: string) {
  const fileData = await fs.promises.readFile(filePath);
  console.log(fileData);
  const fileName = getFileName(filePath);
  const fileType = getFileType(filePath);

  return new File([fileData], fileName, { type: fileType });
}

const upload = multer({ storage: storage });
app.post("/api/ipfs/", cors(), upload.single("uploaded_file"), async function (req: any, res: any) {
  try {
    if (req.file) {
      const imagePath = __dirname + "/uploads/" + req.file.filename;
      const result = await storeNFT(imagePath, req.file.filename, req.file.filename);
      const path = __dirname + "/uploads/" + req.file.filename;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
      console.log(result);
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// dbConnect().then(() => console.log("Conexion DB Ready"));

AppDataSource.initialize().then(() => {
  console.log("Conexion ORM Ready");
});

let server;

if (process.env.NODE_ENV === "production") {
  const credentials = {
    key: fs.readFileSync("/etc/letsencrypt/live/globaldv.tech/privkey.pem", "utf8"),
    cert: fs.readFileSync("/etc/letsencrypt/live/globaldv.tech/cert.pem", "utf8"),
    ca: fs.readFileSync("/etc/letsencrypt/live/globaldv.tech/chain.pem", "utf8"),
  };
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

server.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
