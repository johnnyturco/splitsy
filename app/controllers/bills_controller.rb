class BillsController < ApplicationController

    wrap_parameters format: []

    # before_action :authorize

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

    def create
        puts bill_params
        bill = Bill.create!(bill_params)
        render json: bill, status: :created
        # if current_user.id == params[:creator_id]
        #     bill = current_user.bills.create!(bill_params)
        #     render json: bill, status: :created
        # else
        #     render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        # end
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
