let form = document.querySelector(".add-traveler-form");
form.addEventListener("submit", handleFormSubmit);


document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.adapter.getOffers().then (json => renderOffers(json));
    app.adapter.getTravelers().then (json => showTravelers(json)); 
})

function renderOffers(offers) {
    offers.forEach((offer) => {
        const newOffer = new Offer(offer);
        newOffer.render();
    });
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



function handleLike(e) {
    let totalLikes = parseInt(e.target.previousElementSibling.innerText) + 1
    
    let offer_id = parseInt(e.target.dataset.id)
    let likeObj = {likes: totalLikes}

    const offerAdapter = new Adapter();

    offerAdapter.updateLikeCount(offer_id, likeObj)
    .then(data => {
      e.target.previousElementSibling.innerText = `${totalLikes} Likes`
    })
  }

function showTravelers(data) {
    data.forEach(traveler => {
        const newTraveler = new Traveler(traveler);
        newTraveler.render();
    });
    
}

function handleFormSubmit(e){
  e.preventDefault()
  let travelerData = {
                        name: e.target.name.value,
                        passion: e.target.passion.value
                    }

  const tAdapter = new Adapter();
  tAdapter.addNewTraveler(travelerData).then (jsonData => {
        const traveler = new Traveler(jsonData);
        traveler.render();
    });
  document.querySelector(".add-traveler-form").reset();
  return false;
}



function createPlan(place, adventure, traveler_id) {

    let planObj = {   
        'place': place,
        'adventure': adventure,
        'traveler_id': traveler_id,
    }

    const planAdapter = new Adapter();

    planAdapter.addNewPlan(planObj)
        .then(json => renderPlan(json))
        .catch(err => console.log(err));
}



function handleEditForm(e) {
    e.preventDefault();
    const id = parseInt(e.target.attributes[1].value);
    const plan = Plan.findById(id);
    const place = e.target.querySelector('input').value;
    const adventure = e.target.querySelector('textarea').value;
    const traveler_id = plan.traveler.id;

    const planJSON = { place, adventure, traveler_id };
    const planAdapter = new Adapter;
    planAdapter.updatePlan(plan.id, planJSON).then(updatedPlan => console.log(updatedPlan));
}





