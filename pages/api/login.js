// TODO FIX FOR LOGIN PAGE
import { Auth } from 'aws-amplify'

export default async function login(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { username, password } = JSON.parse(req.body);

  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
}