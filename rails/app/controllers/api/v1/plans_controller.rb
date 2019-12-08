class Api::V1::PlansController < ApplicationController
	before_action :find_plan, only: [:show, :update]

  def index
    plans = Plan.all
    render json: plans
  end

  def new 
    plan = Plan.new
  end

  def show 
    plan = Plan.find_by_id(params[:id]) 
    render json: plan
  end

  def create
    plan = Plan.new(plan_params)
    
    if plan.valid?
      plan.save
      render json: plan, status: :accepted
    else 
      render json: { errors: plan.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    plan = Plan.find_by_id(params[:id])

    plan.update(plan_params)
    if plan.save
      render json: plan, status: :accepted
    else
      render json: { errors: plan.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    plan = Plan.find_by(:id => params[:id])
    if plan.destroy
      render json: { message: "removed" }, status: :ok
    else
      render json: plan, message: "Failed to remove", status: :bad_request
    end
  end

  private

  def plan_params
    params.permit(:place, :adventure, :traveler_id)
  end

end
