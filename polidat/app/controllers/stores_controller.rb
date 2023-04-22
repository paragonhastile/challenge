class StoresController < ApplicationController
    before_action :authenticate_user!
    layout 'application'

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
