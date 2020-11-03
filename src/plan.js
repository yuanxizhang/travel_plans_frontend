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

    render() {
        const travelerDiv = document.querySelector(`[data-id="${this.traveler_id}"] ul`);
        let li = this.buildPlanLi();

        travelerDiv.appendChild(li);
    } 

}
