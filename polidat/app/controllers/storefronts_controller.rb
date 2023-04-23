class StorefrontsController < ApplicationController
  layout 'storefront'

  before_action :current_store

  def current_store
    @storefront ||= Store.find(params[:id])
  end

  def index
  end

  def show
    @products = current_store.products.order(created_at: :desc)
  end

  def checkout
    if params.has_key? 'priceid' and not params['priceid'].blank?

      checkout_session = Stripe::Checkout::Session.create({
          success_url: 'https://example.com/success',
          line_items: [
            {price: params['priceid'], quantity: 1},
          ],
          mode: 'payment'
      }, {
          stripe_account: @storefront.user.account.stripe_id
      })

      redirect_to checkout_session.url, allow_other_host: true, status: :see_other
    end
  end 

end
