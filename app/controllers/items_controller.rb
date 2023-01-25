class ItemsController < ApplicationController

    # def index
    #     render json: Item.all
    # end

    def index
        items = Item.where(:user_id => current_user.id)
        render json: items, status: :ok
    end

    def create
        item = Item.create!(user_id: params[:user_id], item_note: params[:item_note], bill_id: params[:bill_id], item_amount: params[:item_amount], settled: params[:settled])
        render json: item, status: :created
    end

    def update
        item = Item.find(params[:id])
        item.update!(user_id: params[:user_id], item_note: params[:item_note], bill_id: params[:bill_id], item_amount: params[:item_amount], settled: params[:settled])
        render json: item, status: :accepted
    end

    def destroy
        item = Item.find(params[:id])
        item.destroy
        head :no_content
    end

private

    def item_params
        params.permit(:item_note, :bill_id, :item_amount, :settled)
    end

end
