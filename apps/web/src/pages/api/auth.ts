// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import passport from 'passport';

type Data = {
    success: boolean,
    message: string
}

const customers = [
    {
        "id": "63eaced8-09aa-4f6c-bc60-a119ac8be314",
        "firstName": "Karen",
        "lastName": "Willms",
        "isActive": true,
        "email": "email@email.com",
        "password": "password123"
    },
    {
        "id": "84c778b9-587b-4852-9fe1-0b6d2dfe7f34",
        "firstName": "Beverly",
        "lastName": "Donnelly",
        "isActive": true,
        "email": "email2@email.com",
        "password": "password321"
    }
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    let resBody = req.body;

    // TODO: call service to validate customer login
    const userFound = customers.find(x => x.email === resBody.email && x.password === resBody.password);


    console.log("resBody: ", resBody);
    if (userFound) {
        res.status(200).json({ success: true, message: "login successful" });
    }
    res.status(401).json({ success: false, message: "login failed" });
}



