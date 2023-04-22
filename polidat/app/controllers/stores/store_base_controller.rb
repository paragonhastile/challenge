module Stores
    class StoreBaseController < ApplicationController
      layout 'stores'
      before_action :current_store
  
      def current_store
        #memoize the store
        @store ||= Store.find_by_request(request)
      end
    end
end