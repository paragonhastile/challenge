Rails.application.routes.draw do
  devise_for :users
  post '/webhooks/:source', to: 'webhooks#create'
  root 'static_pages#root'

  resource :dashboard
  resources :accounts
  get "accounts/connect", to: "accounts#connect", as: :stripe_connect
  resources :products
  resource :store
  resources :storefronts
  get 'storefronts/:id', to: 'storefronts#show'
  post 'storefronts/:id/checkout', to: 'storefronts#checkout'
  get 'storefronts/:id/checkout/:session/confirmation', to: 'storefronts#confirmation'
end
