# For context
- In Github: To understand the challenge problem solution view:
	- https://github.com/paragonhastile/challenge/blob/main/problem.md
	- https://github.com/paragonhastile/challenge/blob/main/solution.md
# Using
* Ruby version 3.2.2
* Rails 7.0.4.3
* Sidekiq 7.0.9
# Steps to run locally
- In IDE Console: execute the following:
	- Cmd: git clone [https://github.com/paragonhastile/challenge.git](https://github.com/paragonhastile/challenge.git)
- In IDE Console: execute the following:
	- Cmd: `cd polidat`
	- Cmd: `bundle`
	- Update the secret key for my test Stripe account in your encrypted rails credentials file
	    - Cmd: `EDITOR="code --wait" rails credentials:edit`
	    - Add the following lines 
-   ```yaml
    stripe:
      secret: sk_test_51MxvlXL7moJMlUXdjifnTDpIdBkSM6eSzkcoqb5kGkFBz9z4ogTN8Eha3eDvcANlu1e1OYgY7C9UjpUp6gmDXKRO00qZa8VzJo
    ```
    
	- Cmd: npm i
	- Cmd: bin/rails db:migrate RAILS_ENV=development
    

- Open browser: goto: https://dashboard.stripe.com/test/developers
- Log into Stripe account and click “Delete all test data…” button at bottom of Developer > Overview view
- Open browser: goto: [http://localhost:3000](http://localhost:3000)
	- Goto: [http://localhost:3000/users/sign_up](http://localhost:3000/users/sign_up)
		- Fill in the form and “Sign up”
	- Goto: [http://localhost:3000/accounts](http://localhost:3000/accounts)
	- Connect Stripe Account by clicking button
	- Go through Stripe workflow
		- After you complete the Stripe workflow you will be returned to the /accounts view
	- Refresh: [http://localhost:3000/accounts](http://localhost:3000/accounts) until you see “Charges enabled?” and “Payouts enabled?” update with values of “true”
- Goto: [http://localhost:3000/products](http://localhost:3000/products)
	- Click on “Add datasets” button to goto: [http://localhost:3000/products/new](http://localhost:3000/products/new)
	- Fill in the form and “Save dataset”
	- Click on “Add datasets” button again and goto: [http://localhost:3000/products/new](http://localhost:3000/products/new) again
	- Fill in the form and “Save dataset” a second time to create two products

- Goto: [http://localhost:3000/store](http://localhost:3000/store)**
	- Copy the value from the “View” label which will take you to the storefront url associated with your store http://localhost:3000/storefronts/:id
 
- Open a new browser:
- Paste the storefront link http://localhost:3000/storefronts/:id into the browser bar
- Click on the “Buy” button of the dataset you will buy.
    

- You will be routed to a Stripe checkout page
    

- Enter the following
	- Email: {TEST EMAIL}
	- Card information:
		- 4242 4242 4242 4242
		- 08/24
		- 223
	- Name on card
		- Tyler Durdan
	- Country or region
		- United States
		- 43243
	- Leave the save checkbox unchecked
	- Click the pay button
- You should land on a thank-you page
    

- Open browser: goto: [https://dashboard.stripe.com/test/connect/accounts/overview](https://dashboard.stripe.com/test/connect/accounts/overview)
	- In the “Connected accounts” list of accounts click on the account with the name of the store you entered when registering for Polidat
	- Check that the amount of the purchase you made is in the Activity > Account Balances > Total balance (minus fees of course)
	- Stripe navigation click on the “Balances” tab and make sure your are at the following url: [https://dashboard.stripe.com/test/balance/overview](https://dashboard.stripe.com/test/balance/overview)
	- Confirm 10% of the amount of the purchase you made is in the “USD balance” section
