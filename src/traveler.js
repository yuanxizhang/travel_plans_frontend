class Traveler {
    constructor(traveler) {
        this.id = traveler.id
        this.name = traveler.name;
        this.passion = traveler.passion;
        this.plans = [];
    }

    renderLi() {      
        return `
            <li data-id=${this.id}>
              <p>Name: ${this.name} - Passion: ${this.passion}            
                 <button id="delete-button" data-id="${this.id}">Delete</button></p>   
            </li>`;
            
    }

    static findById(id) {
        return this.all.find(traveler => traveler.id === id);
    }

    renderUpdateForm() {
        return `
            <form data-id=${this.id} id="update-form">
              <label>Name</label>
              <p>
                <input type="text" value="${this.name}" id="updated-name"/>
              </p>
              <label>Passion</label>
              <p>
                <input type="text" value="${this.passion}" id="updated-passion"/>
              </p>
              <button id="update" type='submit'>Save Traveler</button>
            </form>
      `;
    }

    update({ name, passion }) {
        this.name = name;
        this.passion = passion;
    }
}
