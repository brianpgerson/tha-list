class List < ActiveRecord::Base
  validates_presence_of :name, :owner_id

  has_many :listings

  belongs_to :owner,
    foreign_key: :owner_id,
    primary_key: :id,
    class_name: "User"

end
