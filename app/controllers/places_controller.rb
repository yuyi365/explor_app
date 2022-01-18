class PlacesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def index
    if session[:user_id]
      user = User.find(session[:user_id])
      places = user.places
    else
      places = Place.all
    end
    render json: places, status: :ok
  end

  def show
    place = find_place
    render json: place, status: :ok
  end

  def create
    place = Place.create!(place_params)
    render json: place, status: :created
  end

  def destroy
    place = find_place
    place.destroy
    head :no_content, status: :no_content
  end

  private

  def find_place
    Place.find(params[:id])
  end

  def place_params
    params.permit(:name, :location, :image, :user_id, :category)
  end

  def render_not_found
    render json: { error: 'place not found' }, status: :not_found
  end

  def render_unprocessable_entity(invalid)
    render json: {
             errors: invalid.record.errors.full_messages,
           },
           status: :unprocessable_entity
  end
end
