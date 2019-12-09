# Travel Plans

## The Travel Planning App is built with a Ruby on Rails REST API backend and a javascript frontend. It helps you find the best vacation packages for your travel plans.

The goals for this project:
* Design and architect features across frontend and backend
* Integrate JavaScript and Rails
* Debug issues in small- to medium-sized projects
* Build and iterate on a project MVP
* Communicate in a technical environment

The features of this application:
* Add a new traveler to the travel group
* Remove travelers from the travel group
* View all of the tours that are offered by tour providers
* Like a tour by clicking on the like button to increase the total like count
* Add a new travel plan for a traveler

## Project Setup 

Create a folder called travel-project. Inside the travel-project folder make two seperate directories: js, rails.

Inside the rails directory, build a rails API:

	rails new travel_plans --database=postgresql --api

Build models and controllers in the Rails API for providers, offers, travelers, plans.
	
From your terminal, run: 
	rails g model Traveler name passion

Then run: 
	rails db:create && rails db:migrate

There are two different one-to-many relationships between the models: each traveler has many travel plans, each provider has many tour offers.

Things we need to do for the traveler controller:
* We're rendering all travelers in the form of JSON.
* We're creating a new traveler based on whatever traveler_params we get from our frontend.
* We're setting out traveler_params to permit a parameter named name and a parameter named passion. These must be included in the body of the POST requests we will be making with JS fetch.

After the Rails Backend is completed, we can check the four working endpoints, or routes that it exposes to the public. To see all the travelers, for example, we could navigate to http://localhost:3000/api/v1/travelers.

Since this is a Singla Page Application(SPA), we only need to build one HTML page. We will name this home page file index.html. 

In the frontend, we use classes and functions to organize our code into reusable pieces. We translate JSON responses into JavaScript model objects. 

We also want to create a class whose only responsibility is to communicate with the Rails API, we can name this class Adapter and save it in the file adapter.js.

In the adapter.js file, we want to use fetch to handle Client-Server Communications. All interactions between the client and the server should be handled asynchronously (AJAX) and use JSON as the communication format. 

We use POST request to create a new traveler, use PATCH request to update tour offer's like count, use GET request to get all tour offers, and use DELETE request to remove a traveler.
