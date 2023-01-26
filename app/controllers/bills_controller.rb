class BillsController < ApplicationController

    before_action :authorize, only: [:index, :show, :bills_owed, :create, :update, :destroy]

    wrap_parameters format: []

    # def index
    #     render json: Bill.all, status: :ok
    # end

    def index
        render json: user_bills, status: :ok
    end

    def show
        bill = user_bills.find(params[:id])
        render json: bill, serializer: BillWithItemsSerializer, status: :ok
    end

    def bills_owed
        bill = Bill.find(params[:id])
        render json: bill, serializer: BillWithItemsSerializer, status: :ok
    end

    def create
        puts bill_params
        bill = Bill.create!(bill_params)
        render json: bill, status: :created
    end

    def update
        bill = user_bills.find(params[:id])
        bill.update!(bill_params)
        render json: bill, status: :accepted
    end

    def destroy
        bill = user_bills.find(params[:id])
        bill.destroy
        head :no_content
    end

private

    def bill_params
        params.permit(:creator_id, :title, :date, :bill_note, :total_amount)
    end

# shows just bills made by user that is logged in
    def user_bills
        Bill.where(:creator_id => current_user.id)
    end

end
