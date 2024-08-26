// import { Socket } from "socket.io-client";
// import {io} from Socket;
// import {express} from ('express');
// import{morgan} from ('morgan');
// import {mongoose} from ('mongoose');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },

  { timestamp: true }
);
const Blog = mongoose.model("Blog", blogSchema); //look for this name and pulverize it and look for it (BLogCollection) in database
module.exports = Blog;

// const dburi = "mongodb+srv://storm:newuser31@cluster.xers5.mongodb.net/";

// mongoose
//   .connect(dburi)
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

//