Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    resources :players, only: [:index, :create] do
      collection do
        post :get_suggestions
      end
    end
  end
  # match '*path', to: 'pages#index', via: :all
end