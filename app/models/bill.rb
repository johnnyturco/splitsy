class Bill < ApplicationRecord
    has_many :items, dependent: :destroy
    has_many :users, through: :items

    validates_presence_of :title, :date, :tax_amount, :tip_amount, :creator_id, presence: true
end
