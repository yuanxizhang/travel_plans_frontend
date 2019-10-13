const TRAVELERS_URL = 'http://localhost:3000/api/v1/travelers'; 
const PLANS_URL = 'http://localhost:3000/api/v1/plans'; 
const PROVIDERS_URL = 'http://localhost:3000/api/v1/providers'; 
const OFFERS_URL = 'http://localhost:3000/api/v1/offers'; 


document.addEventListener('DOMContentLoaded', () => {
    getTravelers();
})

function getTravelers() {
    return fetch(TRAVELERS_URL)
          .then(res => res.json())
          .then (json => {
              json.forEach(traveler => {
                const newT = new Traveler(traveler)
                document.querySelector('#traveler-list').innerHTML += newT.renderListItem();
              })
          })
          .catch(err => console.log('Error, with message:', err.statusText));
}

function addNewTraveler() {
    const travelerList = new TravelerList();
  
    const newTravelerForm = document.getElementById("new-traveler-form");
    const newTravelerName = document.getElementById("new-traveler-name");
    const newTravelerPassion = document.getElementById("new-traveler-passion");
    const travelerUl = document.getElementById("travelers");

    let formData = {
      name: newTravelerName,
      passion: newTravelerPassion
    };
     
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(TRAVELERS_URL, configObj)
      .then(response => response.json())
      .then(json => console.log(json));

    const renderApp = () => (travelerUl.innerHTML = travelerList.renderTravelers());

      newTravelerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        travelerList.createNewTraveler(newTravelerName.value, newTravelerPassion.value);
        // reset form
        e.target.reset();
        renderApp();
      });

      travelerUl.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON") {
          travelerList.deleteTraveler(e.target.dataset.name);
          renderApp();
        }
      });
}






