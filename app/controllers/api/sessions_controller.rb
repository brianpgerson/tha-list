class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user.nil?
      render json: {errors: ['Invalid username or password']}, status: :unauthorized
    else
      login(@user)
      render :show
    end
  end

  def authenticate
    if current_user
      @user = current_user
      render :show
    else
      @user = {
        session_token: nil,
        username: nil,
        id: nil
      }
      render json: {user: @user}
    end
  end


  def destroy
    logout
    render json: {
      session_token: nil,
      username: nil,
      id: nil
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
