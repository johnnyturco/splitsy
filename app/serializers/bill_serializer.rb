class BillSerializer < ActiveModel::Serializer
  attributes :id, :creator_id, :title, :date, :bill_note, :total_amount
end
