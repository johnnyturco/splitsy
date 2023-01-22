class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: current_user
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :venmo_username)
    end
end
