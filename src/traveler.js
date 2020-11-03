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

        var f = document.createElement("form");
        f.setAttribute('method',"post");
        f.setAttribute('class',"new-plan-form");

        var newlabel1 = document.createElement("Label");
        newlabel1.innerHTML = "Place: ";

        var ip1 = document.createElement("input"); //input element 1, text
        ip1.setAttribute('type',"text");
        ip1.setAttribute('name',"place");

        var newlabel2 = document.createElement("Label");
        newlabel2.innerHTML = "Adventure: ";

        var ip2 = document.createElement("input"); //input element 2, text
        ip2.setAttribute('type',"text");
        ip2.setAttribute('name',"adventure");

        let newplanbtn = document.createElement('button')

        newplanbtn.setAttribute("class", "add-plan")
        newplanbtn.setAttribute("data-id", `${this.id}`)
        newplanbtn.innerHTML = "Add New Plan"
        
        f.appendChild(newlabel1);
        f.appendChild(ip1);
        f.appendChild(newlabel2);
        f.appendChild(ip2);        
        f.appendChild(newplanbtn)

        f.addEventListener('submit', this.handleAddPlan.bind(this));
        div.appendChild(f);

        
        const ul = document.createElement('ul')
        ul.setAttribute("data-id", `${this.id}`)
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
        deleteBtn.innerHTML = "Delete Traveler";

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

    handleAddPlan(e){
      e.preventDefault();
      console.log(e.target.parentElement.dataset.id);
      console.log(e.target.place.value);
      let planData = {
                            place: e.target.place.value,
                            adventure: e.target.adventure.value,
                            traveler_id: e.target.parentElement.dataset.id
                        }
      const newAdapter = new Adapter();
      newAdapter.addNewPlan(planData).then (jsonData => {
        const plan = new Plan(jsonData);
        plan.render();
         });
      e.target.reset();
      return false;
    }
    

}
