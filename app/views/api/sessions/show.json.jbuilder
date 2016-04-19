json.user do
  json.username @user.username
  json.session_token @user.session_token
  json.id @user.id
  json.created_at @user.created_at
end
