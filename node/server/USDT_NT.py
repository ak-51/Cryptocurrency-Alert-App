import cryptocompare

price = cryptocompare.get_price('USDT', currency='USD')
price = price['USDT']['USD']
print(price)