const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const { readFromFile, writeToFile, addToJsonFile } = require("../helpers/fsUtils");

notes.get("/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/notes", (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
        console.log("Incomplete request data");
        return;
    }
    const newNote = {
        title,
        text,
        id: uuid(),
    };
    addToJsonFile(newNote, "./db/db.json");

    const response = {
        status: "success",
        body: newNote,
    };

    res.json(response);
});

notes.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
        .then((fileContent) => JSON.parse(fileContent))
        .then((notes) => {
            const notesToKeep = notes.filter(note => note.id !== noteId);
            writeToFile("./db/db.json", notesToKeep);
        });
});

module.exports = notes;