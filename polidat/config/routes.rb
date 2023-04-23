Rails.application.routes.draw do
  devise_for :users
  post '/webhooks/:source', to: 'webhooks#create'
  root 'static_pages#root'

  resource :dashboard
  resources :accounts
  resources :products
  resource :store
  resources :storefronts
  get 'storefronts/:id', to: 'storefronts#show'
  post 'storefronts/:id/checkout', to: 'storefronts#checkout'
end
