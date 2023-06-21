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

const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

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

const upload = multer({ storage: storage });
app.post("/api/ipfs/", cors(), upload.single("uploaded_file"), async function (req: any, res: any) {
  try {
    if (req.file) {
      const readableStreamForFile = fs.createReadStream(__dirname + "/uploads/" + req.file.filename);
      // console.log(readableStreamForFile);
      const options = {
        pinataMetadata: {
          name: req.file.filename,
          keyvalues: {
            customKey: "customValue",
            customKey2: "customValue2",
          },
        },
        pinataOptions: {
          cidVersion: 0,
        },
      };

      pinata
        .pinFileToIPFS(readableStreamForFile, options)
        .then((result: any) => {
          const path = __dirname + "/uploads/" + req.file.filename;
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
          console.log(result);
          res.json(result);
        })
        .catch((err: any) => {
          console.log(err);
          res.status(400).send();
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// dbConnect().then(() => console.log("Conexion DB Ready"));

// AppDataSource.initialize().then(() => console.log("Conexion ORM Ready"));

let server;

if (process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync("/etc/letsencrypt/live/defix3.com/privkey.pem", "utf8");
  const certificate = fs.readFileSync("/etc/letsencrypt/live/defix3.com/cert.pem", "utf8");
  const ca = fs.readFileSync("/etc/letsencrypt/live/defix3.com/chain.pem", "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

server.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
