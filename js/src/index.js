const BASE_URL = "http://localhost:3000/api/v1/"
const TRAVELERS_URL = `${BASE_URL}/travelers`; 
const PLANS_URL = `${BASE_URL}/plans`; 
const PROVIDERS_URL = `${BASE_URL}/providers`; 
const OFFERS_URL = `${BASE_URL}/offers`; 

document.addEventListener('DOMContentLoaded', () => {
    fetchOffers();
    getTravelers();
})

function fetchOffers(){
  return fetch(OFFERS_URL)
          .then(resp => resp.json())
          .then (json => renderOffers(json));  
}

function renderOffers(offers) {
    offers.forEach((offer) => {renderOffer(offer)});
}

function renderOffer(offer) {
    const oList = document.querySelector('#offers-list');
    const card = document.createElement("li");
    card.setAttribute('class', "card");
    card.setAttribute("data-id", `${offer.id}`);

    const h = document.createElement("h5");
    h.innerHTML = offer.tour_name;

    // const img = document.createElement("img");
    // img.className = "offer-image";
    // img.src = offer.image;

    const p1 = document.createElement("p");
    p1.innerHTML = `Detail: ${offer.about}`;

    const p2 = document.createElement("p");
    p2.innerHTML = `Departs: ${offer.departs}`;

    const p3 = document.createElement("p");
    p3.innerHTML = `Length: ${offer.length}`;

    const p4 = document.createElement("p");
    p4.innerHTML = `Price: $${Math.round(offer.price)}`;

    const p5 = document.createElement("p");
    p5.innerHTML = `Provider: ${offer.provider.name}`;

    const p6 = document.createElement("p");
    p6.innerHTML = `${offer.likes} likes`;

    const likeBtn = document.createElement("button");
    likeBtn.addEventListener("click", handleLike);
    likeBtn.setAttribute("data-id", offer.id);
    likeBtn.className = "like-btn btn btn-primary";
    likeBtn.innerHTML = "Like";

    // const deleteBtn = document.createElement("button");
    // deleteBtn.addEventListener("click", handleDelete);
    // deleteBtn.setAttribute("data-id", toy.id);
    // deleteBtn.className = "delete-btn btn btn-danger";
    // deleteBtn.innerHTML = "Delete";

    oList.appendChild(card);

    card.appendChild(h);
    // card.appendChild(img);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(p3);
    card.appendChild(p4);
    card.appendChild(p5);
    card.appendChild(p6);
    card.appendChild(likeBtn);
    // card.appendChild(deleteBtn);
}

// function renderOffer(offer){
    
//     document.querySelector('#offers-list').innerHTML += 
//                 `<li class="card" data-id=${offer.id} id="offer-card">
//                     <h5>${offer.tour_name}</h5>
//                     <p>Detail: ${offer.about}</p>
//                     <p>Departs: ${offer.departs}</p>
//                     <p>Length: ${offer.length} </p>
//                     <p>Price: $${Math.round(offer.price)} dollars</p>
//                     <p>Tour provider: ${offer.provider.name}</p>
//                     <p>${offer.likes} Likes</p>
//                     <button class="like-button btn btn-primary" data-id=${offer.id} >Like</button>
//                 </li>`;
              
// }

// addOfferForm = document.querySelector('.add-offer-form')
// addOfferForm.addEventListener('submit', function (event) {
//   fetch(OFFERS_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       tpur_name: `${event.target.tour_name.value}`,
//       about: `${event.target.about.value}`,
//       departs: `${event.target.tour_name.value}`,
//       lemgth: `${event.target.length.value}`,
//       Price: `${event.target.price.value}`
//       // likes: 0
//     })
//   })
//     .then(resp => resp.json())
//     .then(json => renderOffers(json))
// })



function handleLike(e) {
    let totalLikes = parseInt(e.target.previousElementSibling.innerText) + 1
    let options = {
                    method: "PATCH",
                    headers: {
                              "Content-Type": "application/json",
                              "Accept": "application/json"
                            },
                    body: JSON.stringify({
                                likes: totalLikes
                            })
                    }

    fetch(OFFERS_URL + `/${e.target.dataset.id}`, options)
    .then(resp => resp.json())
    .then(data => {
      e.target.previousElementSibling.innerText = `${totalLikes} Likes`
    })
  }

function getTravelers() {
    return fetch(TRAVELERS_URL)
          .then(resp => resp.json())
          .then (json => createTravelers(json));          
}

function createTravelers(data) {
    data.forEach(traveler => renderTraveler(traveler));
    
}

function renderTraveler(traveler) {
    const main = document.querySelector('main')

    const div = document.createElement('div')
    div.setAttribute("class", "card")
    div.setAttribute("data-id", `${traveler.id}`)

    const p = document.createElement('p')
    p.innerHTML = `${traveler.name}`
    div.appendChild(p)

    const addbtn = document.createElement('button')
    addbtn.setAttribute("data-traveler-id", `${traveler.id}`)
    addbtn.innerHTML = "Add Plan"
    addbtn.addEventListener('click', morePlan)
    div.appendChild(addbtn)

    const ul = document.createElement('ul')
    div.appendChild(ul)

    traveler.plans.forEach(plan => {

        let li = createPlan(plan);

        ul.appendChild(li);
    })

    main.appendChild(div)
}

function morePlan(e) {
    if (e.target.nextSibling.childElementCount < 10) {
        fetchPlan(e.target.attributes[0].value)
    }

}

function fetchPlan(traveler_id) {

    let planObj = {
        "traveler_id": traveler_id
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(planObj)
    };

    fetch(PLANS_URL, configObj)
        .then(res => res.json())
        .then(obj => renderPlan(obj))
        .catch(err => console.log(err));
}

function renderPlan(obj) {
    
    const travelerDiv = document.querySelector(`[data-id="${obj.traveler.id}"] ul`)

    let li = createPlan(obj)

    travelerDiv.appendChild(li)
}

function createPlan(obj) {
    const li = document.createElement('li')

    li.innerHTML = `${obj.place} - ${obj.adventure}`

    let relbtn = document.createElement('button')

    relbtn.setAttribute("class", "remove")
    relbtn.setAttribute("data-plan-id", `${obj.id}`)
    relbtn.innerHTML = "Remove"
    relbtn.addEventListener('click', destroyPlan)
    li.appendChild(relbtn)

    return li;
}

function destroyPlan(e) {
    
    let planObj = {
        "id": e.target.attributes[1].value
    }

    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(planObj)
    };

    fetch(PLANS_URL + `/${planObj.id}`, configObj)
        .then(res => res.json())
        .then(obj => removePlan(obj))
        .catch(err => console.log(err));
}

function removePlan(obj) {
    const travelerDiv = document.querySelector(`[data-id="${obj.traveler.id}"] ul li [data-plan-id="${obj.id}"]`)
    
    travelerDiv.parentNode.remove();
}



