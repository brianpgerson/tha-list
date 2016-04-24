class CreateUserLists < ActiveRecord::Migration
  def change
    create_table :user_lists do |t|
      t.integer :user_id, null: false
      t.integer :list_id, null: false
      t.timestamps null: false
    end

    add_index :user_lists, :user_id
    add_index :user_lists, :list_id

    remove_column :lists, :owner_id
    remove_column :lists, :subscriber_ids
  end
end
