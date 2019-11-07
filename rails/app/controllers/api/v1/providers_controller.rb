class Api::V1::ProvidersController < ApplicationController
  
  def index
    providers = Provider.all
    render json: providers
  end

  def new 
    provider = Provider.new
  end

  def show 
    provider = Provider.find(params[:id]) 
    render json: provider
  end

  def create
    provider = Provider.new(provider_params)
    
    if provider.valid?
      provider.save
      render json: provider, status: :accepted
    else 
      render json: { errors: provider.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    provider = Provider.find(params[:id])
    provider.update(provider_params)
    if provider.save
      render json: provider, status: :accepted
    else
      render json: { errors: provider.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def provider_params
    params.permit(:name, :website)
  end

end
