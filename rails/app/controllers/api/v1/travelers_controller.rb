class Api::V1::TravelersController < ApplicationController
  
  def index
    travelers = Traveler.all
    render json: travelers
  end

  def new 
    traveler = Traveler.new
  end

  def show 
    traveler = Traveler.find(params[:id])  
    render json: traveler
  end

  def create
    traveler = Traveler.new(traveler_params)
    
    if traveler.valid?
      traveler.save
      render json: traveler, status: :accepted
    else 
      render json: { errors: traveler.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    traveler.update(traveler_params)
    if traveler.save
      render json: traveler, status: :accepted
    else
      render json: { errors: traveler.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    traveler = Traveler.find(params[:id]) 
    if traveler.destroy
      render json: { message: "removed" }, status: :ok
    else
      render json: traveler, message: "Failed to remove", status: :bad_request
    end
  end

  private

  def traveler_params
    params.permit(:name, :passion)
  end

end
