class Listing < ActiveRecord::Base
  validates_presence_of :name, :description, :owner_id
  after_initialize :ensure_description

  private

  def ensure_description
    @description ||= "I didn't add a description for this one!"
  end

end
