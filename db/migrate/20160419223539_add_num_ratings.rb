class AddNumRatings < ActiveRecord::Migration
  def change
    add_column :listings, :num_ratings, :integer
  end
end
