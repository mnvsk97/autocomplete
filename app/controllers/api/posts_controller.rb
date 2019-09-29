module API
    class PostsController < ApplicationController
        def index
            players = Player.pluck(:name).uniq
            render json: {players: players} 
        end
        def create
            render json: {params: params}
        end
    end
end