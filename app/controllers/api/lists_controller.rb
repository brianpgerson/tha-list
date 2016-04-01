class Api::ListsController < ApplicationController
  def index
    @lists = current_user.lists
    render :index
  end

  def create
    @list = List.new(list_params)
    @list['owner_id'] = current_user.id
    if @list.save
      render :show
    else
      render json: {errors: @list.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @list = List.find(params[:id])
    List.delete(params[:id])
    render :show
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
    params.require(:list).permit(:name, :subscriber_ids)
  end

end
