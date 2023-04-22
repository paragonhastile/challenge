require 'constraints/domain_constraint'

Rails.application.routes.draw do
  devise_for :users
  post '/webhooks/:source', to: 'webhooks#create'
  root 'static_pages#root'

  # constraints DomainConstraint do
  #   scope module: :stores do
  #     resources :products
  #     root to: 'products#index', as: 'store_root'
  #   end
  # end

  resource :dashboard
  resources :accounts
  resources :products
  resource :store
end
