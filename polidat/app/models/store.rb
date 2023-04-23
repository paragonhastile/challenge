class Store < ApplicationRecord
    belongs_to :user
    has_many :products, through: :user

    def self.find_by_request(request)
      puts "Finding by request"
  
      where(domain: request.domain)
        .or(where(subdomain: request.subdomain))
        .first
    end
end
