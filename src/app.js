class App {
  attachEventListeners() {
    document.querySelector('#notes-list').addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const note = Note.findById(id);
      document.querySelector('#update').innerHTML = note.renderUpdateForm();
    });
  }
}