class DashboardsController < ApplicationController

  layout 'authorized'

  before_action :authenticate_user!
  
  def show
  end
end
