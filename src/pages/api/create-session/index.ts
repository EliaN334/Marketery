import { env } from '@/env/server.mjs';
import { type NextApiRequest, type NextApiResponse } from 'next';
import type Stripe from 'stripe';
import { type RequestBodyData } from '@/types/global';

// eslint-disable-next-line
const stripe: Stripe = require('stripe')(env.STRIPE_API_SECRET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        const { products } = req.body as RequestBodyData;
        const session = await stripe.checkout.sessions.create({
          line_items: products,
          mode: 'payment',
          success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: 'http://localhost:3000?cancel=true',
        });
        return res.status(200).json(session);
      } catch (e) {
        console.error(e);
        return res.status(400).json({ error: e });
      }
    default:
      return res.status(400).json({
        error: 'Method not supported',
      });
  }
}
