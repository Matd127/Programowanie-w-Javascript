const Note = {
    id: Number,
    title: String,
    content: String,
    color: String,
    pin: Boolean,
    dateOfCreation: Date
}

const notes = [];

const addNote = document.querySelector("#submit");
const btnShowForm = document.querySelector(".add-note");
const form = document.querySelector('.form');
const overlay = document.querySelector('.overlay');
const notesList = document.querySelector('.notes-list');

addNote.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="title"]').value
    const content = document.querySelector('textarea').value
    const color = document.querySelector('input[name="color"]:checked').id;
    console.log(color);
    console.log(Date.now())

    // Note = new Note(Date.now(), title, content, color, false, Date.now())
    Note.id = Date.now();
    Note.title = title;
    Note.content = content;
    Note.color = color;
    Note.pin = false;
    Note.dateOfCreation = Date.now();
    notes.push(Note);

    localStorage.setItem("notes", JSON.stringify(notes))
})

const openForm = () => {
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const closeForm = () => {
    form.classList.add('hidden');
    overlay.classList.add('hidden');
}
const loadNotes = () => {
    const jsonData = JSON.parse(window.localStorage.getItem('notes'))
    console.log(jsonData)
    const cos = jsonData.map((arr) => {
        return (arr.title);
    })
    console.log(cos.title)
    notesList.textContent = cos;

}
loadNotes();
btnShowForm.addEventListener('click', openForm)
overlay.addEventListener('click', closeForm)