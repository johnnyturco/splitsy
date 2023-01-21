class CreateBills < ActiveRecord::Migration[6.1]
  def change
    create_table :bills do |t|
      t.integer :creator_id
      t.string :title
      t.datetime :date
      t.string :bill_note
      t.float :tax_amount
      t.float :tip_amount

      t.timestamps
    end
  end
end
