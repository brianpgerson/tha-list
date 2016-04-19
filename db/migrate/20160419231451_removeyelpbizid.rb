class Removeyelpbizid < ActiveRecord::Migration
  def change
    remove_column :listings, :yelp_biz_id

    add_column :listings, :yelp_biz_id, :string
  end
end
