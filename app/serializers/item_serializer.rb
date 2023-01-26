class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_note, :item_amount, :settled
  belongs_to :user
  belongs_to :bill
end
