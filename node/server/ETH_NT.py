import cryptocompare

price = cryptocompare.get_price('ETH', currency='USD')
price = price['ETH']['USD']
print(price)