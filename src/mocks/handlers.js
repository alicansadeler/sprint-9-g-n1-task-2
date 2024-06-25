// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(
    'https://6540a96145bedb25bfc247b4.mockapi.io/api/login',
    ({ request }) => {
      return HttpResponse.json(responseData);
    }
  ),
];

export const responseData = [
  {
    createdAt: '2023-11-08T18:21:53.919Z',
    name: 'Erdem Guntay',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/915.jpg',
    password: '9fxIH0GXesEwH_I',
    email: 'erdem.guntay@wit.com.tr',
    token: 'no$7a#G^[V',
    user: 'Erdem78',
    id: '1',
  },
];
