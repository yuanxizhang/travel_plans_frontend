class Traveler {
    constructor(traveler) {
        this.id = traveler.id
        this.name = traveler.name;
        this.passion = traveler.passion;
        this.plans = [];
        Traveler.all.push(this);
    }

    renderListItem() {
        
        return `
            <li>
                <strong>Name: ${this.name}, passion: ${this.passion}
                <button data-id=${this.id}>Edit</button>
                <button data-id="${this.id}">Delete</button></strong>
            </li>`;
            
    }

    static findById(id) {
        return this.all.find(traveler => traveler.id === id);
    }

    renderUpdateForm() {
        return `
            <form data-id=${this.id}>
              <label>Name</label>
              <p>
                <input type="text" value="${this.name}" />
              </p>
              <label>Passion</label>
              <p>
                <input type="text" value="${this.passion}" />
              </p>
              <button type='submit'>Save Traveler</button>
            </form>
      `;
    }

    update({ name, passion }) {
        this.name = name;
        this.passion = passion;
    }
}

Traveler.all = [];