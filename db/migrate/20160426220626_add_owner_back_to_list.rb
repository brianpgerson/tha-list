class AddOwnerBackToList < ActiveRecord::Migration
  def change
    add_column :lists, :owner_id, :integer, null: false, default: 0
    add_index :lists, :owner_id
  end
end
