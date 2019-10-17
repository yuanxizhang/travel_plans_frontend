class Offer {
    constructor(offer) {
        this.id = offer.id
        this.tour_name = offer.tour_name;
        this.about = offer.about;
        this.departs = offer.departs;
        this.length = offer.length;
        this.price = offer.price;
        this.provider_id = offer.provider_id;
    }

    renderLi() {      
        return `
            <li class="card" data-id=${offer.id}>
                <h5>${offer.tour_name}</h5>
                <p>Detail: ${offer.about}</p>
                <p>Departs: ${offer.departs}</p>
                <p>Length: ${offer.length} </p>
                <p>Price: ${offer.price} dollars</p>
                <button class="like-btn">Like</button>
                <button class="btn btn-danger">Delete</button>
            </li>`;
            
    }

    static findById(id) {
        return this.all.find(offer => offer.id === id);
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
              <button id="update" type='submit'>Save Offer</button>
            </form>
      `;
    }

    update({ place, adventure }) {
        this.place = place;
        this.adventure = adventure;
    }
}
