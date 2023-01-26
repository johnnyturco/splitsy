class BillWithItemsSerializer < ActiveModel::Serializer
  attributes :id, :creator_id, :title, :date, :bill_note, :total_amount, :items
  # has_many :users

  def items
    object.items.map do |item|
      {
        item_note: item.item_note,
        item_amount: item.item_amount,
        settled: item.settled,
        user: {
          id: item.user.id,
          first_name: item.user.first_name,
          last_name: item.user.last_name,
          username: item.user.username,
          venmo_username: item.user.venmo_username
        }
      }
    end
  end

end
