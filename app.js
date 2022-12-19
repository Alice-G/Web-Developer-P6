// BUG FIXME LEG TEST DEL HINT BLOCK ASK TODO WEIRD CHECK

// packages
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // disappears?
const Thing = require("./models/thing"); // or ../models? TEST   WEIRD

const path = require("path");

// routes
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

// DB connection
mongoose
  .connect(
    "mongodb+srv://TestUser616:TestUserGenesis@courseworkn01.kykuvcy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

// CORS Errors handling      ASK I don't change 'app' to 'router' here. Why?
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// file handling BLOCK CHECK
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/stuff", stuffRoutes); // do i need this?
app.use("/api/auth", userRoutes); // do i need this?

module.exports = app; // do i need this?
// file handling BLOCK end CHECK

// CRUD section BLOCK
// POST route
router.post("/", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// GETAll route  // ASK made this 'get', is that right?
router.get("/", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

// GETOne route
router.get("/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

// PUT updateone route
router.put("/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

// delete route
router.delete("/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});
// end CRUD BLOCK

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
