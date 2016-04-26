Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :new, :show, :update]
    resources :lists, only: [:index, :create, :new, :show, :update, :destroy] do
      resources :listings, only: [:index]
    end
    resources :listings, only: [:create, :update, :show, :destroy]
  end
  get 'api/session/auth', :to => 'api/sessions#authenticate'
  get 'api/searchusers', :to => 'api/users#search'
  post 'api/userlists', :to => 'api/lists#add_user'
end
