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
        const { account_id, products } = req.body as RequestBodyData;
        const { url } = await stripe.checkout.sessions.create({
          line_items: products.map((product) => ({
            price: product.price_id,
            quantity: product.quantity,
          })),
          mode: 'payment',
          success_url: 'http://localhost:3000?success=true',
          cancel_url: 'http://localhost:3000?cancel=true',
          payment_intent_data: {
            application_fee_amount: 123,
            transfer_data: {
              destination: account_id,
            },
          },
        });
        return res.status(200).json({ url });
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
