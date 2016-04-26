class Api::ListsController < ApplicationController
  def index
    @lists = current_user.lists
    render :index
  end

  def create
    @list = List.new(list_params)
    @list[:owner_id] = current_user.id
    if @list.save
      @userlist = UserList.new(list_id: @list.id, user_id: current_user.id)
      if @userlist.save
        render :show
      else
        render json: {errors: @userlist.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {errors: @list.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def add_user
    @userlist = UserList.new(user_id: user_list_params[:userId], list_id: user_list_params[:listId])
    if @userlist.save
      render json: {userlist: "it worked!"}
    else
      render json: {errors: @userlist.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def remove_user_from_list(list_id)
    @userlist = UserList.where(list_id: list_id).where(user_id: current_user.id)
    unless @userlist.empty?
      UserList.destroy(@userlist.first.id)
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.owner == current_user.id
      List.delete(params[:id])
    else
      remove_user_from_list(params[:id])
    end
    render json: {user_id: current_user.id}
  end


  def show
    @list = List.find(params[:id])
    if @list
      render :show
    else
      render json: {errors: ["No list with that ID"]}, status: :unprocessable_entity
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      render :show
    else
      render json: {errors: @list.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end

  def user_list_params
    params.require(:userList).permit(:userId, :listId)
  end

end
