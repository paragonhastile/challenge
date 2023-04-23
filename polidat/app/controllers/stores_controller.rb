class StoresController < ApplicationController

    layout 'authorized'

    before_action :authenticate_user!

    def show
        @store = current_user.store
    end

    def edit
        @store = current_user.store
    end

    private

    def store_params
        params.require(:store).permit(
            :domain,
            :subdomain
        )
    end

end
