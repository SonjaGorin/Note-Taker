const notes = require("express").Router();
const uuid = require("../helpers/uuid");

notes.get("/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
    };
    readAndAppend(newNote, "./db/feedback.json");
  
    const response = {
        status: "success",
        body: newNote,
    };

    res.json(response);
    } else {
    res.json("Error in posting feedback");
    }
});

module.exports = notes;