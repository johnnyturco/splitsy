class User < ApplicationRecord
    has_secure_password

    has_many :items
    has_many :bills, through: :items

end
