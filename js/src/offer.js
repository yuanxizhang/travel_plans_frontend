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

    render() {      
        return `
            <li class="card" data-id=${this.id} id="offer-card">
                <h5>${this.tour_name}</h5>
                <p>Detail: ${this.about}</p>
                <p>Departs: ${this.departs}</p>
                <p>Length: ${this.length} </p>
                <p>Price: $${this.price} dollars</p>
                <p>Provider: ${this.provider.name} </p>
                <p>${this.likes} likes</p>

            </li>`;
            
    }

}
