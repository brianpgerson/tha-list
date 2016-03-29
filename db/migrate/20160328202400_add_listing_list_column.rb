class AddListingListColumn < ActiveRecord::Migration
  def change
    remove_column :listings, :owner_id
    add_column :listings, :list_id, :integer, null: false, default: 1
  end
end
