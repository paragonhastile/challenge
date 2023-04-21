module ApplicationHelper

    def menu_items
        [{
        name: 'Dashboard',
        path: dashboard_path,
        }, {
        name: 'Accounts',
        path: '/accounts'
        }, {
        name: 'Products',
        path: '/products',
        }, {
        name: 'Store',
        path: '/store',
        }, {
        name: 'Customers',
        path: '/customers',
        }].map do |item|
        {
            name: item[:name],
            path: item[:path],
            active: current_page?(item[:path])
        }
        end

    end

end