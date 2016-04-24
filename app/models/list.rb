class List < ActiveRecord::Base
  validates_presence_of :name

  has_many :listings

  has_many :user_lists

  has_many :users, through: :user_lists, source: :user

end
