class ChangeBizId < ActiveRecord::Migration
  def change
    change_column :listings, :yelp_biz_id, :string
  end
end
