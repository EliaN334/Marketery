import { env } from '@/env/server.mjs';
import { loadStripe, type Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.STRIPE_API_SECRET);
  }
  return stripePromise;
};

export default getStripe;
