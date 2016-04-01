class UpdateListingsTable < ActiveRecord::Migration
  def change
    add_column :listings, :how_bad_wanna_go, :integer, null: false, default: 0
    add_column :listings, :city, :string, null: false, default: "San Francisco"
    add_column :listings, :rating, :float, null: false, default: 0
    add_column :listings, :rating_img_url, :string
  end
end
