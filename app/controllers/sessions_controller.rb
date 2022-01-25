class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: {
               errors:
                 'Either the email does not exist or the password is incorrect. Please try again.',
             },
             status: :not_found
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end
