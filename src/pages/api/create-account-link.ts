import { getServerAuthSession } from '@/server/common/get-server-auth-session';
import { type NextApiResponse, type NextApiRequest } from 'next';
import type Stripe from 'stripe';

// eslint-disable-next-line
const stripe: Stripe = require('stripe')(process.env.STRIPE_API_SECRET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await getServerAuthSession({ req, res });
    try {
      if (!session?.user) throw new Error('You must be signed in');
      const { account_id } = req.query;
      const accountLink = await stripe.accountLinks.create({
        account: account_id as string,
        refresh_url: `${process.env.NEXTAUTH_URL}/api/create-account-link?account_id=${account_id}`,
        return_url: `${process.env.NEXTAUTH_URL}?return=true`,
        type: 'account_onboarding',
      });
      return res.redirect(accountLink?.url);
    } catch (e) {
      console.error('`create-account-link.ts GET`: ', e);
      return res.status(400).json({ error: e });
    }
  } else {
    res.setHeader('Allow', 'GET');
    return res.status(400).send(`Method "${req.method}" not supported`);
  }
}
