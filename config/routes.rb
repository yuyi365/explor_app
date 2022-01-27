Rails.application.routes.draw do
  resources :users, only: %i[index show create update]

  resources :places, only: %i[index show create destroy]

  # patch '/updatepassword/:id', to: 'users#update_password'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/signup', to: 'users#create'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
