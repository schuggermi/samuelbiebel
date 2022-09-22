const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

ROUTER.get('/kontakt', (req, res) => {
  res.render('contact.ejs');
});

ROUTER.post('/kontakt', async (req, res) => {
  console.log(req.body);
    await sendMail('client', JSON.stringify(req.body.firstName), JSON.stringify(req.body.lastName), JSON.stringify(req.body.email), JSON.stringify(req.body.message));
    // await sendMail('admin', JSON.stringify(req.body.firstName), JSON.stringify(req.body.lastName), JSON.stringify(req.body.email), JSON.stringify(req.body.message));
    res.sendStatus(304);
});

module.exports = ROUTER;
