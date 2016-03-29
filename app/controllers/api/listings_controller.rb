require "byebug"

class Api::ListingsController < ApplicationController

  def index
    if params[:bounds].empty?
      @listings = List.find(params[:list_id]).listings
    else
      @listings = List.find(params[:list_id]).listings.in_bounds(params[:bounds])
    end
    render :index
  end

  def create
    @listing = Listing.new(listing_params)
    if @listing.save
      render :index
    else
      render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    Listing.delete(params[:id])
    render :show
  end

  def show
    @listing = Listing.find(params[:id])
    if @listing
      render :show
    else
      render json: {errors: ["No listing with that ID"]}, status: :unprocessable_entity
    end
  end

  def update
    @listing = current_listing
    if @listing.update(listing_params)
      render :show
    else
      render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def listing_params
    params.require(:listing).permit(:name, :description, :lat, :lng, :list_id)
  end
end
