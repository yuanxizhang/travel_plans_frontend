const TRAVELERS_URL = 'http://localhost:3000/api/v1/travelers'; 
const PLANS_URL = 'http://localhost:3000/api/v1/plans'; 
const PROVIDERS_URL = 'http://localhost:3000/api/v1/providers'; 
const OFFERS_URL = 'http://localhost:3000/api/v1/offers'; 

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
                    <button class="like-btn btn btn-primary">Like</button>
                    <button class="delete-btn btn btn-danger">Delete</button>
                </li>`;
              })
}

const addOfferForm = document.querySelector('.add-offer-form')
addOfferForm.addEventListener('submit', function (event) {
  fetch(`http://localhost:3000/offers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tpur_name: `${event.target.tour_name.value}`,
      about: `${event.target.about.value}`,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(json => renderOffers(json))
})

const tourOffers = document.getElementById('offers-list')
tourOffers.addEventListener('click', function (event) {
  let likeButtonIsPressed = event.target.className === "like-btn"
  let delButtonIsPressed = event.target.className === "delete-btn"
  if (likeButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`
    fetch(`http://localhost:3000/offers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: likeCount
        })
      })
      .then(response => response.json())
  }
  else if (delButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    fetch(`http://localhost:3000/offers/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => renderOffers(json))
  }
})


function getTravelers() {
    return fetch(TRAVELERS_URL)
          .then(resp => resp.json())
          .then (json => {
              json.forEach(tr => {
                const newTraveler = new Traveler(tr);
                document.querySelector('#travelers-list').innerHTML += newTraveler.renderLi();
              })        
               
          });          
}


// function addNewTraveler() {
//     const travelerList = new TravelerList();
  
//     const newTravelerForm = document.getElementById("new-traveler-form");
//     const newTravelerName = document.getElementById("new-traveler-name").value;
//     const newTravelerPassion = document.getElementById("new-traveler-passion").value;
//     const travelerUl = document.getElementById("travelers-list");

//     let formData = {
//       name: newTravelerName,
//       passion: newTravelerPassion
//     };
     
//     let configObj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(formData)
//     };

//     fetch(TRAVELERS_URL, configObj)
//       .then(response => response.json())
//       .then(json => console.log(json));

//     const renderApp = () => (travelerUl.innerHTML = travelerList.render());

//       newTravelerForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         travelerList.createNewTraveler(newTravelerName.value, newTravelerPassion.value);
//         // reset form
//         e.target.reset();
//         renderApp();
//       });

//       travelerUl.addEventListener("click", (e) => {
//         if (e.target.nodeName === "BUTTON") {
//           travelerList.deleteTraveler(e.target.dataset.name);
//           renderApp();
//         }
//       });
// }








