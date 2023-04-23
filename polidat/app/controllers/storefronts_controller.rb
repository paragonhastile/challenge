class StorefrontsController < ApplicationController
  layout 'storefront'

  before_action :current_store

  def current_store
    @storefront ||= Store.find(params[:id])
  end

  def default_url_options
    Rails.application.config.action_mailer.default_url_options
  end

  def index
  end

  def show
    @products = current_store.products.order(created_at: :desc)
  end

  def checkout
    if params.has_key? 'priceid' and not params['priceid'].blank? and params.has_key? 'productid' and not params['productid'].blank?

      product = current_store.products.find(params['productid'])
      if product


        # TODO: there are some nuances to this feature method due to it being a consolidated call and its unclear in the stripe documentation, when you specify a destination account its somewhat unclear what affect that has on the context of the api call
        # for example, you can configure to have the connected account collect the payment and then transfer the application fee to the platform account which is what is being done below, 
        # or you can do 'destination charges' which is where the platform account collects the payment and then transfers the application fee to the connected account which is specified by the payment_intent_data.transfer_data.destination attribute
        # my experience was if you want to make this call you need to be in the context of the connected account by passing a second param containing the stripe account id of the connected account.
        # you want to be in the connected account context if that connected account has created products with prices in order to get the price id of the price which is required for execution.
        # a person would intuitively think they would then need to specify the platform account as the destination account in order to collect the application fee but this is not the case as that account is not accepted by the api call
        # since no desitination account is specified by the below configuration and the fee still hits the platform account, it must be that the api keys are used to determine the destination account which is the platform account even though the context of the call is the is the connected account.

        checkout_session = Stripe::Checkout::Session.create({
            mode: 'payment',
            line_items: [
              {price: product.stripe_price_id, quantity: 1},
            ],
            payment_intent_data: {
              application_fee_amount: (product.priceraw / 100) * 10,
            },
            success_url: storefronts_url + '/' + params[:id] + '/checkout/' + '{CHECKOUT_SESSION_ID}' + '/confirmation',
            # cancel_url: 'https://example.com/cancel',
        }, {
            stripe_account: @storefront.user.account.stripe_id
        })

        redirect_to checkout_session.url, allow_other_host: true, status: :see_other

      end
    end
  end 

  # def confirmation
  #   if params.has_key? 'session' and not params['session'].blank?

  #     @checkout_session = Stripe::Checkout::Session.retrieve(params['session'])
  #   end

  # end

  def confirmation

    # TODO: this should be the easiest call to work but it appears that even by passing in the stripe account id of the connected account to force the context of the session, 
    # the api call is still made in the context of the platform account and the session cannot be found - is this the stripe api key? what else could be overriding this context?
    #checkout_session = Stripe::Checkout::Session.retrieve(params[:session])
    checkout_session = Stripe::Checkout::Session.retrieve({
      id: params[:session]
    }, {
      stripe_account: @storefront.user.account.stripe_id
    })
  end

end
