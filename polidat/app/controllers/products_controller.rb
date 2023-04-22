class ProductsController < ApplicationController
  
  def index
    @products = current_user.products.order(created_at: :desc)
  end

  def show
  end

  def new
  end

  def create
    @product = current_user.products.new(product_params)
    if @product.save
      service = StripeProduct.new(params, @product)
      service.create_product
      redirect_to products_path
    else
      render :new
    end
  end

  def edit
  end

  private

    def product_params
      params.require(:product).permit(:name, :description)
    end

end
