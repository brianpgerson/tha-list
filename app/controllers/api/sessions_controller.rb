class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(user_params[:name], user_params[:password])
    if @user.nil?
      render json: {errors: ['Invalid name or password']}, status: :unauthorized
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
      render json: {
        session_token: nil,
        name: nil,
        id: nil
      }
    end
  end


  def destroy
    logout
    render json: {
      session_token: nil,
      name: nil,
      id: nil
    }
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end

end
