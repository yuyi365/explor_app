class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def index
    render json: User.all, status: :ok
  end

  def show
    user = find_user
    render json: user, status: :ok
  end

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def update
    user = find_user
    user.update!(user_params)
    render json: user, status: :accepted
  end

  # def update_password
  #   user = find_user
  #   if BCrypt::Password.create(params[:currentPassword]) == user.password_digest
  #     user.update!(user_params)
  #     render json: user, status: :accepted
  #   else
  #     render json: {
  #              error:
  #                'Current password does not match what is on file. Please try again!',
  #            },
  #            status: :unprocessable_entity
  #   end
  # end

  private

  def find_user
    User.find(session[:user_id])
  end

  def user_params
    params.permit(:username, :email, :password, :first_name, :last_name)
  end

  def render_not_found
    render json: { error: 'user not found' }, status: :not_found
  end

  def render_unprocessable_entity(invalid)
    render json: {
             errors: invalid.record.errors.full_messages,
           },
           status: :unprocessable_entity
  end
end
