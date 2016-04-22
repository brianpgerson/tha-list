require 'byebug'
class Api::ListingsController < ApplicationController

  def index
    if params[:bounds].empty?
      @listings = List.find(params[:list_id]).listings
    else
      @listings = List.find(params[:list_id]).listings.in_bounds(params[:bounds])
    end
    render :index
  end

  def get_yelp_info(input)
    parameters = {term: input['name'], limit: 1}
    res = Yelp.client.search(input['city'], parameters).businesses.first;
    listing = {
      yelp_biz_id: res.id,
      name: res.name,
      description: input['description'],
      lat: res.location.coordinate.latitude,
      lng: res.location.coordinate.longitude,
      num_ratings: res.review_count,
      rating: res.rating,
      rating_img_url: res.rating_img_url,
      how_bad_wanna_go: input['how_bad_wanna_go'],
      list_id: input['list_id']
    }
  end

  def create
    full_listing = get_yelp_info(listing_params)
    @listing = Listing.new(full_listing)
    if @listing.save
      render :index
    else
      render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    Listing.delete(params[:id])
    render json: @listing
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
    params.require(:listing).permit(:name, :description, :how_bad_wanna_go, :city, :list_id)
  end
end
