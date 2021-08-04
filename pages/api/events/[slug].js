// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {events} = require('./data.json')

export default function handler(req, res) {
  console.log(req.query); // get log in the server cmd and not in the developer console in the browser!
  const singleEvent = events.filter(event=>event.slug===req.query.slug)
  if(req.method==='GET') {
      res.status(200).json(singleEvent)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ // 405 - method not allowed
      message: `method ${req.method} is not allowed`})
  }
}
