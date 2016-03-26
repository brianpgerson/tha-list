Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :new, :show, :update]
    resources :listings, only: [:create, :update, :show, :destroy, :index]
  end
  get 'api/session/auth', :to => 'api/sessions#authenticate'
end
