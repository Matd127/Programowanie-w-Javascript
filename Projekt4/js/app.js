const Note = {
    title: String,
    content: String,
    color: String,
    pin: Boolean,
    dateOfCreation: Date
}
const notes = [];

const addNote = document.querySelector("#submit")
const btnShowForm = document.querySelector(".add-note")
const form = document.querySelector('.form')
const overlay = document.querySelector('.overlay')

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

const openForm = () => {
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const closeForm = () => {
    form.classList.add('hidden');
    overlay.classList.add('hidden');
}
btnShowForm.addEventListener('click', openForm)
overlay.addEventListener('click', closeForm)