class BillWithItemsSerializer < ActiveModel::Serializer
  attributes :id, :creator_id, :title, :date, :bill_note, :tax_amount, :tip_amount
  has_many :items

end
