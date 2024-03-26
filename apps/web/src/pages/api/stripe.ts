import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAINBASEURL;


const stripeHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    console.warn("respone body", req.body);

    let resBody = req.body;

    res.setHeader('Access-Control-Allow-Credentials', 'true');

    const session = await stripe.checkout.sessions.create({
      line_items: resBody,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ session: session })
  }
  else {
    res.status(405).json
  }


}

export default stripeHandler;