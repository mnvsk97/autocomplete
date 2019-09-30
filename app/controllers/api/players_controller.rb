module API
    class PlayersController < ApplicationController
        skip_before_action :verify_authenticity_token
        def index
            # players = Player.pluck(:name).uniq
            players = Player.pluck(:id, :name, :position, :team).uniq
            render json: {players: players} 
        end
        
        def create
            player = Player.create(name: 'Sai')
            render json: player
        end

        def get_suggestions
            suggestions = Player.where("name ~* ?", "^#{params[:name]}").pluck(:name, :position, :team)
            render json: {suggestions: suggestions}
        end

    end
end