class Plan {
    constructor(plan) {
        this.id = plan.id
        this.place = plan.place;
        this.adventure = plan.adventure;
        this.traveler_id = plan.traveler_id;
    }

    buildPlanLi() { 
        const li = document.createElement('li')
        li.innerHTML = `${this.place}: ${this.adventure}`
        return li;
    }  

}
