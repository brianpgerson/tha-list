class Listing < ActiveRecord::Base
  validates_presence_of :name, :description, :list_id, :lat, :lng
  after_initialize :ensure_description

  belongs_to :list

  def self.in_bounds(boundaries)
    listings = Listing.where("lat BETWEEN #{boundaries['southWest']['lat']} AND #{boundaries['northEast']['lat']}")
                      .where("lng BETWEEN #{boundaries['southWest']['lng']} AND #{boundaries['northEast']['lng']}")
    listings
  end

  private

  def ensure_description
    @description ||= "I didn't add a description for this one!"
  end

end
