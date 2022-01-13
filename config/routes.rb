Rails.application.routes.draw do
  resources :users, only: %i[index show create]

  resources :places, only: %i[index show create destroy]

  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/signup', to: 'users#create'

  # get '*path',
  #     to: 'fallback#index',
  #     constraints: ->(req) { !req.xhr? && req.format.html? }
end
