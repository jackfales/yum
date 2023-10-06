// TODO FIX FOR LOGIN PAGE
import { Auth } from 'aws-amplify'

export default async function login(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { username, password } = JSON.parse(req.body);

  try {
    const user = await Auth.signIn(username, password);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.toString() });
  }
}