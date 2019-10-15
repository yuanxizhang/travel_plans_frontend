class Plan {
    constructor(plan) {
        this.id = plan.id
        this.place = plan.place;
        this.adventure = plan.adventure;
        this.traveler_id = plan.traveler_id
    }

    render() {      
        return `
            <li>
              <p>Place: ${this.place} - Adventure: ${this.adventure}
                 <button data-id=${this.id}>Edit</button>
                 <button data-id="${this.id}">Delete</button></p>   
            </li>`;
            
    }

    static findById(id) {
        return this.all.find(plan => plan.id === id);
    }

    renderUpdateForm() {
        return `
            <form data-id=${this.id} id="update-form">
              <label>Place</label>
              <p>
                <input type="text" value="${this.place}" id="updated-place" />
              </p>
              <label>Advanture</label>
              <p>
                <input type="text" value="${this.adventure}" id="updated-adventure" />
              </p>
              <button id="update" type='submit'>Save Plan</button>
            </form>
      `;
    }

    update({ place, adventure }) {
        this.place = place;
        this.adventure = adventure;
    }
}
