import getStripe from '@/utils/get-stripe';
import { trpc } from '@/utils/trpc';
import {
  useStripe,
  useElements,
  Elements,
  CardElement,
} from '@stripe/react-stripe-js';
import { type StripeCardElement } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useEffect, type FormEvent } from 'react';

const Checkout = () => {
  const { data: session } = useSession();
  return (
    <div className='flex min-h-full flex-col items-center justify-center'>
      <Elements stripe={getStripe()}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const { data, mutate: createPaymentIntent } =
    trpc.user.createPaymentIntent.useMutation();

  useEffect(() => {
    createPaymentIntent({
      ammount: 3000,
      destination_account_id: 'acct_1MKlN8BTGLQ1ssOq',
      on_belhaf_of_account_id: session?.user?.account_id as string,
    });
  }, [createPaymentIntent, session?.user?.account_id]);

  const handleSubmit = async (e: FormEvent) => {
    console.log('DATA: ', data?.client_secret);
    e.preventDefault();
    if (!stripe || !elements) return;
    const result = await stripe.confirmCardPayment(
      data?.client_secret as string,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
          billing_details: {
            name: session?.user?.full_name,
          },
        },
      }
    );

    if (result.error) {
      console.error('Checkout form error: ', result.error.message);
      alert(`Checkout form error: ${result.error.message}`);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('SUCCESS PAYMENT INTENT');
        alert('SUCCESS PAYMENT INTENT');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className='w-[500px] p-3'>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export default Checkout;
