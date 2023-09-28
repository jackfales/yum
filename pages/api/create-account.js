import { Auth } from 'aws-amplify'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();

  const { username, password, lastName, firstName } = JSON.parse(req.body);

  try {
    await Auth.signUp({
      username,
      password,
      attributes: {
        given_name: firstName,         
        family_name: lastName,
        preferred_username: username
      }
    });
    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.toString() });
  }
}