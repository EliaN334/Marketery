import { env } from '@/env/server.mjs';
import { type NextApiRequest, type NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_API_SECRET, {
  apiVersion: '2022-11-15',
});

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

    res.status(200).json({
      client_secret: paymentIntent.client_secret,
    });
  }
}
