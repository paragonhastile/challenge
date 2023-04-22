Rails.application.routes.draw do
  get 'products/index'
  get 'products/show'
  get 'products/new'
  get 'products/edit'
  devise_for :users
  post '/webhooks/:source', to: 'webhooks#create'
  root 'static_pages#root'
  resource :dashboard
  resources :accounts
  resources :products
end
