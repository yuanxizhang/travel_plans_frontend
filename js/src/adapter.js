class Adapter {
  constructor() {
    this.baseUrl = 'http://travel-plan-api.herokuapp.com/api/v1/';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  get(url) {
    return fetch(url).then(res => res.json()).catch(err => console.log(err));
  }

  patch(url, obj) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(obj),
    }).then(res => res.json())
      .catch(err => console.log(err));
  }

  delete(url, obj) {
    return fetch(url, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(obj),
    }).then(res => res.json())
      .catch(err => console.log(err));
  }

  post(url, obj) {
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(obj),
    }).then(res => res.json())
      .catch(err => console.log(err));
  }

  getOffers() {
    return this.get(`${this.baseUrl}/offers`);
  }

  getPlans() {
    return this.get(`${this.baseUrl}/plans`);
  }

  getTravelers() {
    return this.get(`${this.baseUrl}/travelers`);
  }

  updateLikeCount(id, likeObj) {
    return this.patch(`${this.baseUrl}/offers/${id}`, likeObj);
  }

  addNewTraveler(travelerObj) {
    return this.post(`${this.baseUrl}/travelers`, travelerObj);
  }

  deleteTraveler(id, travelerObj) {
    return this.delete(`${this.baseUrl}/travelers/${id}`, travelerObj);
  }

  addNewPlan(planObj) {
    return this.post(`${this.baseUrl}/plans`, planObj);
  }

  deletePlan(id, planObj) {
    return this.delete(`${this.baseUrl}/plans/${id}`, planObj);
  }

  updatePlan(id, planObj) {
    return this.patch(`${this.baseUrl}/plans/${id}`, planObj);
  }

}