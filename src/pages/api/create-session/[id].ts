import type Stripe from 'stripe';
import { type NextApiRequest, type NextApiResponse } from 'next';

// eslint-disable-next-line
const stripe: Stripe = require('stripe')(process.env.STRIPE_API_SECRET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  try {
    if (!id.startsWith('cs_')) {
      throw new Error('Incorrect Checkout session id');
      const checkout_session = await stripe.checkout.sessions.retrieve(id);
      res.status(200).json(checkout_session);
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}
