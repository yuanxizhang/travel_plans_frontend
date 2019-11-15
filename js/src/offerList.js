class OfferList {
  constructor() {
    this.offers = []
    this.adapter = new NotesAdapter()
    this.initiBindingsAndEventListeners()
    this.fetchAndLoadNotes()
  }

  initiBindingsAndEventListeners() {
    this.offersContainer = document.getElementById('offers-container')
    this.body = document.querySelector('body')
    this.newNoteBody = document.getElementById('new-note-body')
    this.noteForm = document.getElementById('new-note-form')
    this.noteForm.addEventListener('submit', this.createNote.bind(this))
    this.offersContainer.addEventListener('dblclick', this.handleNoteClick.bind(this))
    this.body.addEventListener('blur', this.updateNote.bind(this), true)
  }

  createNote(e) {
    e.preventDefault()
    const value = this.newNoteBody.value

    this.adapter.createNote(value).then(note => {
      this.offers.push(new Note(note))
      this.newNoteBody.value = ''
      this.render()
    })
  }

  handleNoteClick(e) {
    this.toggleNote(e)
  }

  toggleNote(e) {
    const li = e.target
    li.contentEditable = true
    li.focus()
    li.classList.add('editable')
  }

  updateNote(e) {
    const li = e.target
    li.contentEditable = false
    li.classList.remove('editable')
    const newValue = li.innerHTML
    const id = li.dataset.id
    //console.log(id)
    this.adapter.updateNote(newValue, id)
  }

  fetchAndLoadNotes() {
    this.adapter
      .getNotes()
      .then(offers => {
        offers.sort((a, b) => a.id - b.id).forEach(note => this.offers.push(new Note(note)))
      })
      .then(() => {
        this.render()
      })
  }

  render() {
    this.offersContainer.innerHTML = this.offers.map(note => note.renderLi()).join('')
  }
}
  
}