class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_note, :item_amount, :settled
  has_one :user
  has_one :bill
end
