class UsersController < ApplicationController

    # testing purposes to see users
    def index
        users = User.all
        render json: users, status: :ok
    end

    # "/signup" route
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    # "/me" route
    def show
        render json: current_user
    end

    def update
        user = logged_in_user.find(params[:id])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    def destroy
        user = logged_in_user.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :venmo_username)
    end

    def logged_in_user
        User.where(:id => current_user.id)
    end

end
