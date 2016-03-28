class AddLatLngColumns < ActiveRecord::Migration
  def change
    add_column :listings, :lat, :integer, null: false, default: 0
    add_column :listings, :lng, :integer, null: false, default: 0
  end
end
