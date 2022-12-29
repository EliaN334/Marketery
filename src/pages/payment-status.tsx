import getStripe from '@/utils/get-stripe';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);
  const { query } = useRouter();
  useEffect(() => {
    if (!stripe) return;

    const client_secret = query.payment_intent_client_secret as string;

    stripe.retrievePaymentIntent(client_secret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Success! Payment recieved');
          break;
        case 'processing':
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;
        case 'requires_payment_method':
          setMessage('Payment failed. Please try another payment method.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe, query.payment_intent_client_secret]);

  return <div>{message}</div>;
};

const Wrapper = () => {
  const { query } = useRouter();
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret: query.payment_intent_client_secret as string,
      }}
    >
      <PaymentStatus />
    </Elements>
  );
};

export default Wrapper;
