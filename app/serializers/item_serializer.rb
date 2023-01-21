class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_note, :amount, :settled
  has_one :user
  has_one :bill
end
