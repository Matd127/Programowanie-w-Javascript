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
const editOverlay = document.querySelector(".edit-overlay");
const notesList = document.querySelector(".notes-list");
const editForm = document.querySelector(".edit-form");

const loadNotes = () => {
  const jsonNotes = JSON.parse(window.localStorage.getItem("notes"));
  jsonNotes ? (notes = [...jsonNotes]) : console.log("Brak notatek");
};
loadNotes();

const displayAndManageNotes = () => {
  notes &&
    notes.map((obj) => {
      const newNote = document.createElement("div");
      newNote.classList.add("note");
      newNote.classList.add("note-" + obj.color);
      newNote.innerHTML =
        "<div class='manage-icons'> <div class='edit-button' id=" +
        obj.id +
        "> 📜</div> <div class='delete-button' id=" +
        obj.id +
        ">&#10060;</div></div> <h1> " +
        obj.title +
        '</h1> <div class="content">' +
        obj.content +
        "</div> ";
      notesList.appendChild(newNote);
    });

  const btnDelete = document.querySelectorAll(".delete-button");
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener("click", () => {
      notes = notes.filter((obj) => obj.id !== Number(btnDelete[i].id));
      localStorage.setItem("notes", JSON.stringify(notes));
      alert("Usunieto notatkę!");
      location.reload();
    });
  }

  const btnEdit = document.querySelectorAll(".edit-button");
  for (let i = 0; i < btnEdit.length; i++) {
    btnEdit[i].addEventListener("click", () => {
      toggleEditForm();
      const singleNote = notes.find((obj) => obj.id === Number(btnEdit[i].id));
      console.log(editForm);
      editForm.querySelector('input[name="title"]').value = singleNote.title;
      editForm.querySelector("textarea").value = singleNote.content;
      //select radio button by color
      //edit note
    });
  }
};
displayAndManageNotes();

addNote.addEventListener("click", (e) => {
  const title = document.querySelector('input[name="title"]').value;
  const content = document.querySelector("textarea").value;
  const color = document.querySelector('input[name="color"]:checked').id;
  const note = new Note(Date.now(), title, content, color, false, Date.now());
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  document.querySelector("form").reset();
  toggleForm();
  alert("Dodano notatkę!");
});

const toggleEditForm = () => {
  editForm.classList.toggle("hidden");
  editOverlay.classList.toggle("hidden");
};

const toggleForm = () => {
  form.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

btnShowForm.addEventListener("click", toggleForm);
overlay.addEventListener("click", toggleForm);
editOverlay.addEventListener("click", toggleEditForm);
