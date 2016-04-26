class List < ActiveRecord::Base
  validates_presence_of :name, :owner_id

  belongs_to :owner,
    foreign_key: :owner_id,
    primary_key: :id,
    class_name: "User"

  has_many :listings

  has_many :user_lists, dependent: :destroy

  has_many :users, through: :user_lists, source: :user

end
