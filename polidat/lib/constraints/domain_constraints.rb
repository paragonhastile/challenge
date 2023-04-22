class DomainConstraint
    def self.matches?(request)
        Store.find_by_request(request).exists?
    end
end