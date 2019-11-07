class Offer {
    constructor(offer) {
        this.id = offer.id
        this.tour_name = offer.tour_name;
        this.about = offer.about;
        this.departs = offer.departs;
        this.length = offer.length;
        this.price = offer.price;
        this.likes = offer.likes;
        this.provider = offer.provider;
    }

    renderOffer() {      
        return `
            <li class="card" data-id=${this.id} id="offer-card">
                <h5>${this.tour_name}</h5>
                <p>Detail: ${this.about}</p>
                <p>Departs: ${this.departs}</p>
                <p>Length: ${this.length} </p>
                <p>Price: $${this.price} dollars</p>
                <p>Likes: ${this.provider.name} </p>
                <p>${this.likes} Likes</p>

                <button class="like-btn" data-id=${this.id}>Like</button>
            </li>`;
            
    }

    static findById(id) {
        return this.all.find(offer => offer.id === id);
    }

    renderUpdateForm() {
        return `
            <form data-id=${this.id} id="update-form">
              <label>Tour Name</label>
              <p>
                <input type="text" value="${this.tour_name}" id="updated-tour-name" />
              </p>
              <label>About</label>
              <p>
                <input type="text" value="${this.about}" id="updated-about" />
              </p>
              <button id="update" type='submit'>Save Offer</button>
            </form>
      `;
    }

    update({ place, adventure }) {
        this.place = place;
        this.adventure = adventure;
    }
}
