const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
var spawn = require('child_process').spawn;

var BTC_price;
const BTC = () => {
  const x = spawn('python', ['server/BTC_NT.py']);
  x.stdout.on('data', data => {
      test = data.toString();
  });

  x.stderr.on('data', (data) => {
      console.log('err results: %j', data.toString('utf8'))
  });
  x.stdout.on('end', function(){
      BTC_price = test;
  });
};

var ETH_price;
const ETH = () => {
  const y = spawn('python', ['server/ETH_NT.py']);
  y.stdout.on('data', data => {
      test = data.toString();
  });

  y.stderr.on('data', (data) => {
      console.log('err results: %j', data.toString('utf8'))
  });
  y.stdout.on('end', function(){
      ETH_price = test;
  });
};

var USDT_price;
const USDT = () => {
  const z = spawn('python', ['server/USDT_NT.py']);
  z.stdout.on('data', data => {
      test = data.toString();
  });

  z.stderr.on('data', (data) => {
      console.log('err results: %j', data.toString('utf8'))
  });
  z.stdout.on('end', function(){
      USDT_price = test;
  });
};

BTC();
ETH();
USDT();

app.get("/api", (req, res) => {
  res.json({ btc: BTC_price, eth: ETH_price, usdt: USDT_price });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.use(express.json());

app.post('/api', (request, response) => {
  const val = request.body.TGVAL;
  const Email = request.body.Email;
  const curr = request.body.Curr;
  const price = request.body.Value;
  const prcs = spawn('python', ['server/script.py']);
  const abc = [val, Email, curr, price];
  prcs.stdin.write(JSON.stringify(abc));
  prcs.stdin.end();
  prcs.stdout.on('data', (data) => {
    result = data.toString();
  });
  prcs.stderr.on('data', (data) => {
    console.log('err results: %j', data.toString('utf8'))
  });
  prcs.stdout.on('end', function(){
    console.log(result);
  });
})