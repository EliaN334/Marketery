import getStripe from '@/utils/get-stripe';
import { trpc } from '@/utils/trpc';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { type FormEvent, useState } from 'react';

const Checkout = () => {
  const { data } = trpc.user.createPaymentIntent.useQuery();
  return (
    <div className='flex min-h-full flex-col items-center justify-center'>
      {data?.client_secret && (
        <Elements
          stripe={getStripe()}
          options={{
            clientSecret: data?.client_secret as string,
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/payment-status',
      },
    });

    if (error) setError(error.message as string);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button>submit</button>
      {error && <div className='text-red-500'>{error}</div>}
    </form>
  );
};

export default Checkout;
