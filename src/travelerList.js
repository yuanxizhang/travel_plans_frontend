class TravelerList {
  constructor() {
    this.travelers = [];
  }

  createNewTraveler(name, passion) {
    const newTraveler = new Traveler(name, passion);
    this.travelers.push(newTraveler);
  }

  renderTravelers() {
    return this.travelers.map((traveler) => traveler.render()).join("");
  }

  deleteTraveler(name) {
    this.travelers = this.travelers.filter((traveler) => traveler.name !== name);
  }
}
