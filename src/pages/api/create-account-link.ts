import { env } from '@/env/server.mjs';
import { getServerAuthSession } from '@/server/common/get-server-auth-session';
import { type NextApiResponse, type NextApiRequest } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(env.STRIPE_API_SECRET, {
  apiVersion: '2022-11-15',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await getServerAuthSession({ req, res });
    try {
      if (!session?.user) throw new Error('You must be signed in');
      const { account_id } = req.query;
      if (!account_id) res.status(400).send('Please provide an `account_id`');
      const accountLink = await stripe.accountLinks.create({
        account: account_id as string,
        refresh_url: `${process.env.NEXTAUTH_URL}/api/create-account-link?account_id=${account_id}`,
        return_url: `${process.env.NEXTAUTH_URL}?return=true`,
        type: 'account_onboarding',
      });
      res.redirect(accountLink?.url);
    } catch (e) {
      console.error('`create-account-link.ts GET`: ', e);
      res.status(400).json({ error: e });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(400).send(`Method "${req.method}" not supported`);
  }
}
