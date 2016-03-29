json.list do
  json.id @list.id
  json.name @list.name
  json.owner_id @list.owner_id
  json.subscriber_ids @list.subscriber_ids
end
