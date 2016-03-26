class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.integer :yelp_biz_id, default: nil
      t.integer :owner_id, null: false
      t.timestamps null: false
    end

    add_index :listings, :yelp_biz_id
    add_index :listings, :owner_id
  end
end
