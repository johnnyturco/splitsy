class ItemsController < ApplicationController

    def index
        items = Item.where(:user_id => current_user.id)
        render json: items, status: :ok
    end

    def create
        item = Item.create!(user_id: current_user.id, item_note: params[:item_note], bill_id: params[:bill_id], amount: params[:amount], settled: params[:settled])
        render json: item, status: :created
    end

    # def update
    #     item = Item.find(params[:id])
    #         if current_user.id == bill_id
    #             render json: {status: "Success"}
    #         else
    #             render json: {status: "Failed"}
    #             # update items
    #         end
    # end

    def update
        item = Item.find(params[:id])
        item.update!(item_params)
        render json: item, status: :accepted
    end

    def destroy
        item = Item.find(params[:id])
        item.destroy
        head :no_content
    end


private

    def item_params
        params.permit(:item_note, :bill_id, :amount, :settled)
    end

end
