class BillSerializer < ActiveModel::Serializer
  attributes :id, :creator_id, :title, :date, :bill_note, :tax_amount, :tip_amount
end
