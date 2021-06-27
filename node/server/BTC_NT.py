import cryptocompare

price = cryptocompare.get_price('BTC', currency='USD')
price = price['BTC']['USD']
print(price)