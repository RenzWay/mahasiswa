// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3001;

// app.get("/", (req, res) => {
//   res.send("API mahasiswa sudah aktif");
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("mongoDB connect");
//     app.listen(PORT, () => {
//       console.log(`server running on ${PORT}`);
//     });
//   })
//   .catch((er) => {
//     console.error(`mongoDB error: ${er}`);
//   });
