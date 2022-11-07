const Note = {
    title: String,
    content: String,
    color: String,
    pin: Boolean,
    dateOfCreation: Date
}
const notes = [];

const addNote = document.querySelector("#submit")

addNote.addEventListener("click", (event) => {
    const title = document.querySelector('input[name="title"]').value
    const content = document.querySelector('textarea').value
    const color = "red";

    Note.title = title;
    Note.content = content;
    Note.color = color;
    Note.pin = false;
    Note.dateOfCreation = Date.now();

    notes.push(Note);
    console.log(notes);
    event.preventDefault();
})

