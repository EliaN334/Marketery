import { type NextApiRequest, type NextApiResponse } from 'next';
import type Stripe from 'stripe';

// eslint-disable-next-line
const stripe: Stripe = require('stripe')(process.env.STRIPE_API_SECRET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 300,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({
      client_secret: paymentIntent.client_secret,
    });
  }
}
