class Offer {
    constructor(offer) {
        this.id = offer.id
        this.tour_name = offer.tour_name;
        this.about = offer.about;
        this.departs = offer.departs;
        this.length = offer.length;
        this.price = offer.price;
        this.likes = offer.likes;
        this.image = offer.image;
        this.provider = offer.provider;
    }

    render() {
        let list = document.querySelector('#offers-list');
        let card = document.createElement("li");
        card.setAttribute('class', "card");
        card.setAttribute("data-id", `${this.id}`);

        const h = document.createElement("h5");
        h.innerHTML = this.tour_name;

        let img = document.createElement("img");
        img.className = "tour-image";
        img.src = this.image;

        const p1 = document.createElement("p");
        p1.innerHTML = `Detail: ${this.about}`;

        const p2 = document.createElement("p");
        p2.innerHTML = `Departs: ${this.departs}`;

        const p3 = document.createElement("p");
        p3.innerHTML = `Length: ${this.length}`;

        const p4 = document.createElement("p");
        p4.innerHTML = `Price: $${Math.round(this.price)}`;

        const p5 = document.createElement("p");
        p5.innerHTML = `Provider: ${this.provider.name}`;

        const p6 = document.createElement("p");
        p6.innerHTML = `${this.likes} likes`;

        const likeBtn = document.createElement("button");
        likeBtn.addEventListener("click", this.handleLike.bind(this));
        likeBtn.setAttribute("data-id", `${this.id}`);
        likeBtn.className = "like-btn btn btn-primary";
        likeBtn.innerHTML = "Like";

        list.appendChild(card);

        card.appendChild(h);
        card.appendChild(img);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(p3);
        card.appendChild(p4);
        card.appendChild(p5);
        card.appendChild(p6);
        card.appendChild(likeBtn);
    
    }

    handleLike(e) {
        let totalLikes = parseInt(e.target.previousElementSibling.innerText) + 1
        
        let offer_id = parseInt(e.target.dataset.id)
        let likeObj = {likes: totalLikes}

        const offerAdapter = new Adapter();

        offerAdapter.updateLikeCount(offer_id, likeObj)
        .then(data => {
          e.target.previousElementSibling.innerText = `${totalLikes} Likes`
        })
    }



}
