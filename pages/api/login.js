export default async function handler(req, res) {
    const data = JSON.parse(req.body)

    let username = data["username"]
    let password = data["password"]

    console.log(username)
    console.log(password)

    res.redirect(307, '/')
  }