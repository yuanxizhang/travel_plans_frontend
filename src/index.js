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

function renderOffers(offers){
  offers.forEach(offer => {
                document.querySelector('#offers-list').innerHTML += 
                `<li class="card" data-id=${offer.id}>
                    <h5>${offer.tour_name}</h5>
                    <p>Detail: ${offer.about}</p>
                    <p>Departs: ${offer.departs}</p>
                    <p>Length: ${offer.length} </p>
                    <p>Price: ${offer.price} dollars</p>
                    <p>Tour provider: ${offer.provider.name}</p>
                    <p>Likes: ${offer.likes} </p>
                    <button id="likeBtn" class="btn btn-primary">Like</button>
                    <button class="delete-btn btn btn-danger">Delete</button>
                </li>`;
              })
}

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

// const likeButton = document.querySelector('#likeBtn')
// likeButton.addEventListener("click", function() {
  
//   let likeButtonIsPressed = event.target.className === "like-btn"
//   let delButtonIsPressed = event.target.className === "delete-btn"
//   if (likeButtonIsPressed) {
//     let id = event.target.parentElement.dataset.id
//     let like = event.target.previousElementSibling
//     let likeCount = parseInt(event.target.previousElementSibling.innerText)
//     like.innerText = `${++likeCount} likes`
//     fetch(`http://localhost:3000/offers/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           likes: likeCount
//         })
//       })
//       .then(response => response.json())
//   }
//   else if (delButtonIsPressed) {
//     let id = event.target.parentElement.dataset.id
//     fetch(`http://localhost:3000/offers/${id}`, {
//       method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(json => renderOffers(json))
//   }
// })


function getTravelers() {
    return fetch(TRAVELERS_URL)
          .then(resp => resp.json())
          .then (json => createTravelers(json));          
}

function createTravelers(data) {
    data.forEach(traveler => renderTraveler(traveler))
    
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
    if (e.target.nextSibling.childElementCount < 6) {
        fetchPlan(e.target.attributes[0].value)
    }

}

function fetchPlan(traveler_id) {

    let travelerObj = {
        "traveler_id": traveler_id
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(travelerObj)
    };

    fetch(PLANS_URL, configObj)
        .then(res => res.json())
        .then(obj => renderPlan(obj))
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

function destroyPlan(element) {
    
    let planObj = {
        "id": element.target.attributes[1].value
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
}

function removePlan(obj) {
    const travelerDiv = document.querySelector(`[data-id="${obj.traveler.id}"] ul li [data-plan-id="${obj.id}"]`)
    
    travelerDiv.parentNode.remove();
}



