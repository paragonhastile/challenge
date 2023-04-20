## Solution

A solution to the Rev challenge will be a marketplace platform called PoliDat. PoliDat is a marketplace platform for setting up storefronts to share, query and "chat" with political datasets using the power of artificial intelligence models. * An attempt will be made (time permitting) to be consistent with the Revv described stack by using Ruby on Rails as a monolith for the consumer portal and if time permits a serverless microservice REST API with a React admin portal. No attempt will be made to do queueing with Sidekiq or SQS or solve for any other production scale level concerns as the main stated objective of the challenge is to show familiarity with Stripe integration. *No attempt will be made to deliver the actual dataset onboarding, chunking for vector storage, ML model application, predictive analytics or AI chat as the main stated objective of the challenge is to show familiarity with Stripe integration.

The business economics of PoliDat are the following:
- Sellers pay a fee to PoliDat to host their storefront of political data with built in predictive analytics and AI tools.
- Buyers pay a usage fee to Sellers to analyze storefront data with advanced predictive analytics and AI tools.
- Sellers share a percentage of the usage fee with PoliDat.

The high level use cases of the PoliDat marketplace are the following:
- Seller registers for storefront
- Seller creates account with Stripe Connect for payouts
- Seller creates dataset(s) in storefront and offers dataset(s) for sale
- Buyer shops for datasets
- Buyer purchases dataset(s) by making payment
- Platform accepts payment from buyer and credits seller account and platform fee account
- Platform makes payout of credit balance to seller  

A solution (due:04/23/23) to the Rev challenge problem will be a MVC web app, built with Ruby on Rails and manually deployed (no CICD setup) to AWS Elasticbeanstalk and RDS. The app will process buyer payments, seller payouts and PoliDat fees with Stripe. The app will consist of the following resources.

**Seller Components**
- Dashboard (seller dashboard)
	- GET Seller Payment Balances
		- Available, Instance Available, Pending
	- GET Seller Financial Account Balances
		- Cash, Inbound Pending, Outbound Pending
	- PUT Virtual Card (for payouts)
- Accounts (manage seller accounts)
	- Register
		- PUT Get Started
		- PUT Verify Phone Number
		- PUT Verify Personal Details
		- PUT Terms of Service
		- PUT Review and Finish
	- GET Account Info
		- AccountId, IsChargesEnabled, IsPayoutsEnabled, Financial Account Id, External Account Id
	- PUT Update Financial Account Id (callback)
	- PUT Update External Account Id (callback)
- Products (manage seller datasets)
	- PUT Create Product
		- Name, Description, Image, Price, Data 
	- PUT Product Attachment
		- Name
- Store
	- GET Store Info
		- View, Subdomain, Primary Color, Secondary Color
- Customers
	- GET Customer List
		- Item: Email, Stripe Id
	- GET Customer By Id
		- Email, Stripe Id, Name

**Buyer Components**
- Store (store front)
	- PUT Login (Stripe auth)
		- email address
	- PUT Login Confirmation (email link)
	- GET Product List
		- Item
			- Name, Description, Price
	- GET Product By Id
		- Item
			- Name, Description, Price
	- Checkout
		- PUT Payment Info
			- email, card details
		- GET Order Confirmation
	- GET Orders
	- GET Order By Id

A extended solution (if time allows) to the Rev challenge problem will be a frontend React admin portal with a backend serverless event based microservice solution with a REST API, built with Typescript on Node, SAM infrasturcture as code and deployed manually (no CICD setup) to AWS Lambda and Dynamo.