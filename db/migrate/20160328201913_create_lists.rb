class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.integer :owner_id, null: false
      t.integer :subscriber_ids, array: true, default: []
      t.timestamps null: false
    end

    add_index :lists, :owner_id
  end
end
