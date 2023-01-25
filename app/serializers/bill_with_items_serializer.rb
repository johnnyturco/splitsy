class BillWithItemsSerializer < ActiveModel::Serializer
  attributes :id, :creator_id, :title, :date, :bill_note, :total_amount, :items
  # has_many :items

end
