class Adapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  get(url) {
    return fetch(url).then(res => res.json());
  }

  patch(url, obj) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(obj),
    }).then(res => res.json());
  }

  delete(url, obj) {
    return fetch(url, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(obj),
    }).then(res => res.json());
  }

  post(url, obj) {
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(obj),
    }).then(res => res.json());
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

  updatePlan(id, planObj) {
    return this.patch(`${this.baseUrl}/plans/${id}`, planObj);
  }

  createTraveler(travelerObj) {
    return this.post(`${this.baseUrl}/travelers`, travelerObj);
  }

  createPlan(planObj) {
    return this.post(`${this.baseUrl}/plans`, planObj);
  }

  deletePlan(id, planObj) {
    return this.post(`${this.baseUrl}/plans/${id}`, planObj);
  }

}