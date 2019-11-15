class Traveler {
    constructor(traveler) {
        this.id = traveler.id
        this.name = traveler.name;
        this.passion = traveler.passion;
        this.plans = [];
    }

    render() {      
        return `
            <li data-id=${this.id} class="card">
              <p>Name: ${this.name} - Passion: ${this.passion}            
                 <button id="delete-traveler" class="delete-traveler" data-id="${this.id}">Delete</button></p>   
            </li>`;
            
    }

}
