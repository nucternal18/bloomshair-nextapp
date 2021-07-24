/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie';
import { SERVER_URL } from '../../../config';

export default async (req, res) => {
  const { id } = req.query;
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    const { review } =
      req.body;

    const { token } = cookie.parse(req.headers.cookie);

    const response = await fetch(
      `${SERVER_URL}/api/products/${id}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review,
        }),
      }
    );



    if (response.ok) {
      res.status(200).json({ message: 'Review created successfully' });
    } else {
      res.status(403).json({ message: 'Review not created' });
    }
  } else if (req.method === 'GET') {
    const response = await fetch(
      `${SERVER_URL}/api/products/${id}`)
    const data = await response.json();

     if (response.ok) {
       res.status(200).json({data});
     } else {
       res.status(403).json({ message: 'Review not created' });
     }
  }  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
