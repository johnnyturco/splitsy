class UsersController < ApplicationController

# testing purposes to see users
    def index
        users = User.all
        render json: users, status: :ok
    end

# "/login" route
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    # "/me" route
    def show
        render json: current_user
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :venmo_username)
    end
end
