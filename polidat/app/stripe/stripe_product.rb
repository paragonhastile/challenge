class StripeProduct
    attr_reader :params, :product

    def initialize(params, product)
      @params = params
      @product = product
    end

    # create the product and the price in Stripe, update the polidat product with the returned stripe_id and price_id
    def create_product

        # if stripe_id is present, then the product has already been created
        return if product.stripe_id.present?
    
        # *based on docs stripe previously required two separate calls to create product and price, but now you can do it in one call
        stripe_product = Stripe::Product.create({
          name: product.name,
          description: product.description,
          metadata: {
            user_id: product.user_id,
            product_id: product.id
          },
          default_price_data: {
            currency: params[:default_price_data][:currency],
            unit_amount: (params[:default_price_data][:amount].to_f * 100).to_i
          },
          expand: ['default_price'],
        }, {
          stripe_account: product.user.account.stripe_id
        })
    
        product.update(
          stripe_id: stripe_product.id,
          data: stripe_product.to_json,
          stripe_price_id: stripe_product.default_price.id,
        )
    end


end