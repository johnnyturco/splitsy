class User < ApplicationRecord
    has_many :items
    has_many :bills, through: :items

end
