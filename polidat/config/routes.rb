Rails.application.routes.draw do
  devise_for :users
  post '/webhooks/:source', to: 'webhooks#create'
  root 'static_pages#root'
  resource :dashboard
  resources :accounts
end
