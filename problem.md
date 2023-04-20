# Revv Technical Challenge

## Intro

Welcome to Revv's technical challenge. 

Congrats, making it this far means you've impressed us. This exercise is your chance to show off your skills to other developers at Revv, and also for us to give you a brief introduction into what we do.

Please read this document completely. We recognize that you're busy and will need some time to complete this - do let us know about your timeframe estimate.

## About Revv

Revv is a donation platform built on top of Stripe Connect. Stripe Connect allows developers to easily build a "marketplace" application. This means that multiple sellers can accept payments by connecting their Stripe accounts to a central "platform account". The "platform account" can then take an application fee from payments made to any of the seller accounts ("connected accounts").

The principle behind Revv is the same as any marketplace application, except that rather than selling goods or services, Revv allows non-profits and other causes to accept donations.  

## The Challenge

Your task is to build a basic storefront application by integrating Stripe Connect into a full-stack app. For simplicity's sake, your marketplace does not need to have more than one seller.

Here are the requirements of the app:

As a seller:
- I can connect my stripe account to the store.
- I can add, edit and delete products from the store.
- I can view purchases made on the store as 'payments' in my Stripe account (connected account).
- When a purchase is made, the store itself (platform account) earns a 10% fee on the price of the product. 

As a buyer:
- I can view all the products that are currently being sold on the store.
- I can view details about a specific product.
- I can purchase a product by entering my card details.
- After a successful purchase, I am shown a thank you page that has details of my purchase.  (For bonus points: I also receive an email.)

Remember, we are more interested in your ability to effectively integrate Stripe's API than we are in your CSS or JS prowess. It's up to you how much time you want to spend on the appearance/theme/branding of your storefront, but it should look presentable and be user friendly. You won't be penalized for using CSS frameworks or templates. You will be penalized for 500 errors. :)

## Hints

Here are some pointers to get you started:

- Stripe has a nice [Quickstart](https://stripe.com/docs/payments/quickstart) app available

- Give the [Connect docs](https://stripe.com/docs/connect) a good read. You will need to set up two Stripe accounts for this app, an application owner ("platform account") and a seller ("standard account"). You will need to connect the seller to the application owner using the OAuth flow. You will be using [standard accounts](https://stripe.com/docs/connect/standard-accounts) to do this.

- You will be processing payments in test mode on your application, since your application will likely not have an SSL certificate. In order to charge a credit card, Stripe must first validate the card, return a one-time use token, and pass that token to your application through your payment form. The easiest way to achieve this is to use Stripe's out-of-the-box payment form, [Stripe Checkout](https://stripe.com/docs/payments/checkout). However, you could also obtain and submit the token manually using [Stripe Elements](https://stripe.com/docs/payments/elements). (you may find that simpler to understand or might simply want more customization). Here's a [list](https://stripe.com/docs/testing#cards) of test cards we should be able to use on your app.

- You can make [Direct Charges](https://stripe.com/docs/connect/direct-charges) directly on the connected Stripe account, or [Destination Charges](https://stripe.com/docs/connect/destination-charges) on the platform account and transfer the remaining funds to the connected Stripe account. For this challenge, you do not necessarily need to create Customers within stripe.

- Do not forget to take a 10% fee on the charges so that your application makes money! Direct Charges and Destination Charges handle fees in different ways.

- Try not to use other solutions out there - we want to see your process from inception to deployment.

## What are we looking for?

In no particular order:

- legible, meaningful and concise code
- coding style and best practices 
- ability to read, understand api docs and implement effectively
- ability to use git effectively and create meaningful commits, helpful README etc
- ability to take an idea from inception to deliverable 
- ability to use third-party plugins effectively and where appropriate
- ability to write meaningful tests
- ability to write CSS / JS cleanly

## Deliverables

- Your app must be deployed to a public facing URL (or include instructions to run locally)
- Source code must be viewable on Github/BitBucket
- We'll need access to the application owner and seller Stripe accounts that you create - please provide the credentials.
- Documentation on your software engineering process (nothing crazy, a markdown README in the repository is sufficient)

## Good luck!

If you have further questions, clarifications, or just need some help, feel free to email kyle@revv.co. 

 