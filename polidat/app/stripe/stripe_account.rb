class StripeAccount
    include Rails.application.routes.url_helpers
    attr_reader :account

    def initialize(account)
      @account = account
    end

    def default_url_options
        Rails.application.config.action_mailer.default_url_options
    end

    def authorize_account
        return if @account.stripe_id.present?
    end

    # create the account in Stripe, update the polidat account with the returned stripe_id
    def create_account
        return if @account.stripe_id.present?

        stripe_account = Stripe::Account.create({
            type: 'express',
            country: 'US',
            email: @account.user.email,
            business_type: 'company',
            
            capabilities: {
                card_payments: {requested: true},
                transfers: {requested: true}
                ## TODO: unfortunately, Stripe requires a sales cycle before you can use these features
                # treasury: {requested: true},
                # card_issueing: {requested: true}
            }
        })

        @account.update(
            stripe_id: stripe_account.id
        )
    end

    def onboarding_url
        Stripe::AccountLink.create({
            account: account.stripe_id,
            refresh_url: accounts_url,
            return_url: accounts_url,
            type: 'account_onboarding',
            collect: 'eventually_due',
        }).url
    end
end

