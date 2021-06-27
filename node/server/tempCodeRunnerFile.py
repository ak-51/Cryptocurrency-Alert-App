import cryptocompare

price = str(cryptocompare.get_price('BTC', currency='USD'))
price = price[-10:-2]
print(price)