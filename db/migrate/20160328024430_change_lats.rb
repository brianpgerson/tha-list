class ChangeLats < ActiveRecord::Migration
  def change
    remove_column :listings, :lat
    remove_column :listings, :lng

    add_column :listings, :lat, :float, null: false, default: 0
    add_column :listings, :lng, :float, null: false, default: 0
  end
end
