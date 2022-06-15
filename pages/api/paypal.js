export default async function handler(req, res) {
  res.send(process.env.NEXT_APP_PAYPAL_CLIENT_ID)
}
