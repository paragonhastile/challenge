class StoresController < ApplicationController
    before_action :authenticate_user!
    layout 'application'

    def show
        @store = current_user.store
    end

end
