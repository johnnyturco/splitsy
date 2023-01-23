class User < ApplicationRecord
    has_secure_password

    has_many :items
    has_many :bills, through: :items

    validates_presence_of :first_name, :last_name, :username, :password, :venmo_username
    validates :username, uniqueness: true
    validates :password, length: {minimum: 3}

end
