class Api::UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: {errors: ["No user with that id."]}, status: :unprocessable_entity
    end
  end

  def search
    @users = User.where("username ILIKE (?)", "%#{params[:search_term]}%").where("username NOT ILIKE (?)", "%#{current_user.username}%");

    render :index
  end


  private

  def user_params
    params.require(:user).permit(:username, :session_token, :password, :description)
  end
end
