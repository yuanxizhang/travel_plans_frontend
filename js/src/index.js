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

  const newAdapter = new Adapter();
  newAdapter.addNewTraveler(travelerData).then (jsonData => {
        const traveler = new Traveler(jsonData);
        traveler.render();
    });
  document.querySelector(".add-traveler-form").reset();
  return false;
}








