class Traveler {
    constructor(traveler) {
        this.id = traveler.id
        this.name = traveler.name;
        this.passion = traveler.passion;
        this.plans = traveler.plans;
    }

    render() {
        const main = document.querySelector('main')

        const div = document.createElement('div')
        div.setAttribute("class", "card")
        div.setAttribute("data-id", `${this.id}`)

        const p = document.createElement('p')
        p.innerHTML = `${this.name} - loves ${this.passion}`
        div.appendChild(p)

        let newplanbtn = document.createElement('button')

        newplanbtn.setAttribute("class", "new-plan")
        newplanbtn.setAttribute("data-id", `${this.id}`)
        newplanbtn.innerHTML = "Add New Plan"
        newplanbtn.addEventListener('submit', this.handleNewPlanForm.bind(this))
        div.appendChild(newplanbtn)

        
        const ul = document.createElement('ul')
        div.appendChild(ul)

        this.plans.forEach(plan => {
            const newPlan = new Plan(plan);
            let li = newPlan.buildPlanLi();
            ul.appendChild(li);
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", this.handleDelete.bind(this));
        deleteBtn.setAttribute("data-id", `${this.id}`);
        deleteBtn.className = "delete-btn btn btn-danger";
        deleteBtn.innerHTML = "Delete";

        div.appendChild(deleteBtn);

        main.appendChild(div)
    }

    handleDelete(e) {
        let travelerObj = {
                "id": e.target.parentElement.dataset.id
            };

        let id = travelerObj.id;

        const travelerAdapter = new Adapter;
        travelerAdapter.deleteTraveler(id, travelerObj);

        e.target.parentElement.remove();
    }

    handleNewPlanForm(e){
      e.preventDefault()
      let planData = {
                            place: e.target.place.value,
                            adventure: e.target.adventure.value,
                            traveler_id: e.target.parentElement.dataset.id
                        }
      const tAdapter = new Adapter();
      tAdapter.addNewPlan(planData).then (jsonData => render(jsonData));
      document.querySelector(".new-plan-form").reset();
      return false;
    }
    

}

