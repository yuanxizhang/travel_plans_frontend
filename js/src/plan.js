class Plan {
    constructor(plan) {
        this.id = plan.id
        this.place = plan.place;
        this.adventure = plan.adventure;
        this.traveler_id = plan.traveler_id
        Plan.all.push(this);
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

}

Plan.all = [];