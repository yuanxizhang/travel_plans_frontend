class Api::V1::OffersController < ApplicationController

  def index
    offers = Offer.all.order(:price)
    render json: offers
  end

  def new 
    offer = Offer.new
  end

  def show  
    offer = Offer.find_by(:id => params[:id])
    render json: offer
  end

  def create
    offer = Offer.new(offer_params)
    
    if offer.save
      render json: offer, status: :accepted
    else 
      render json: { errors: offer.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    offer = Offer.find_by(:id => params[:id])
    offer.update(offer_params)
    if offer.save
      render json: offer, status: :accepted
    else
      render json: { errors: offer.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    offer = Offer.find_by(:id => params[:id])
    if offer.destroy
      render json: { message: "removed" }, status: :ok
    else
      render json: offer, message: "Failed to remove", status: :bad_request
    end
  end

  private

  def offer_params
    params.permit(:tour_name, :about, :departs, :length, :price, :likes, :provider_id)
  end

end
