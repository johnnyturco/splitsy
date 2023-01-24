class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :item_note
      t.float :item_amount
      t.boolean :settled
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :bill, null: false, foreign_key: true

      t.timestamps
    end
  end
end
