json.array! @listings do |listing|
  json.name listing.name
  json.description  listing.description
end
