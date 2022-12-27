const loadNotes = () => {
  const jsonNotes = JSON.parse(window.localStorage.getItem("notes"));
  jsonNotes ? (notes = [...jsonNotes]) : console.log("Brak notatek");
};
loadNotes();

const displayNotes = (notes) => {
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const newNote = document.createElement("div");
    newNote.classList.add("note");
    newNote.style.backgroundColor = note.color;
    newNote.innerHTML = `<div class='manage-icons'> 
    <div class='edit-button' id=" ${note.id}">📜</div> 
    <div class='delete-button' id="${note.id}">&#10060;</div> </div>
    <h1>${note.title}</h1> 
    <div class="content">
    <div>Tagi: ${note.tags}</div>
      ${note.content}
    </div>`;
    notesList.appendChild(newNote);
  });
};

const manageNotes = () => {
  displayNotes(notes);
  addNote.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector("textarea").value;
    const color = document.querySelector('input[type="color"]').value;
    const tags = (document.querySelector('input[name="tags"]').value).split(' ');
    const note = new Note(Date.now(), title, content, color, false, tags, Date.now());
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    document.querySelector("form").reset();
    toggleForm();
    displayNotes(notes);
    manageNotes();
  });

  const btnDelete = document.querySelectorAll(".delete-button").forEach(function (btn) {
      btn.addEventListener("click", () => {
        notes = notes.filter((note) => note.id !== Number(btn.id));
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes(notes);
        manageNotes();
      });
    });

  const loadValuesToForm = (note) => {
    editForm.querySelector('input[name="title"]').value = note.title;
    editForm.querySelector("textarea").value = note.content;
    editForm.querySelector(`input[type="color"]`).value = note.color;
  };

  const btnEdit = document.querySelectorAll(".edit-button").forEach(function (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleEditForm();
        const singleNote = notes.find((note) => note.id === Number(btn.id));
        loadValuesToForm(singleNote);
        document.querySelector(".edit-note").addEventListener("click", () => {
          editNote(singleNote);
          manageNotes();
        });
      });
    });

  const editNote = function (newNote) {
    newNote.title = editForm.querySelector('input[name="title"]').value;
    newNote.content = editForm.querySelector("textarea").value;
    newNote.color = editForm.querySelector('input[type="color"]').value;
    localStorage.setItem("notes", JSON.stringify(notes));
  };
};
manageNotes();

const toggleEditForm = () => {
  editForm.classList.toggle("hidden");
  editOverlay.classList.toggle("hidden");
};

const toggleForm = () => {
  form.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const showNotes = () => {
  addNoteBtn.classList.remove("hidden");
  notesList.classList.remove("hidden");
};

notesMenu.addEventListener("click", showNotes);
btnShowForm.addEventListener("click", toggleForm);
overlay.addEventListener("click", toggleForm);
editOverlay.addEventListener("click", toggleEditForm);