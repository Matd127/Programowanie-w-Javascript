class Note {
  constructor(id, title, content, color, pin, dateOfCreation, tags) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.pin = pin;
    this.dateOfCreation = dateOfCreation;
    this.tags = tags;
  }
}

class Tag {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

let notes = [];
const addNote = document.querySelector("#submit");
const btnShowForm = document.querySelector(".add-note");
const form = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const notesList = document.querySelector(".notes-list");

const loadNotes = () => {
  const jsonNotes = JSON.parse(window.localStorage.getItem("notes"));
  jsonNotes ? (notes = [...jsonNotes]) : console.log("Brak notatek");
};
loadNotes();

const displayNotes = () => {
  notes &&
    notes.map((obj) => {
      const newNote = document.createElement("div");
      newNote.classList.add("note");
      newNote.innerHTML =
        "<div class='delete-button' id=" +
        obj.id +
        ">&#10060;</div> <h1> " +
        obj.title +
        '</h1> <div class="content">' +
        obj.content +
        "</div> ";
      notesList.appendChild(newNote);
    });
};
displayNotes();

addNote.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector('input[name="title"]').value;
  const content = document.querySelector("textarea").value;
  const color = document.querySelector('input[name="color"]:checked').id;
  const note = new Note(Date.now(), title, content, color, false, Date.now());
  notes.push(note);
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  document.querySelector("form").reset();
  closeForm();
  alert("Dodano notatkę!");
  displayNotes();
});

const openForm = () => {
  form.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeForm = () => {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowForm.addEventListener("click", openForm);
overlay.addEventListener("click", closeForm);
