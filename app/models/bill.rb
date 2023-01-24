class Bill < ApplicationRecord
    has_many :items, dependent: :destroy
    has_many :users, through: :items

    # validates_presence_of :creator_id, presence: true

end
