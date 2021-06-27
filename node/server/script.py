import sys, json, numpy as np
import smtplib
import cryptocompare
import time

lines = sys.stdin.readlines()
lines = json.loads(lines[0])
np_lines = np.array(lines)
targetVal = np_lines[0]
email = np_lines[1]
currency = np_lines[2]
currentVal = np_lines[3]
currentVal = currentVal[17:]

targetVal = float(targetVal)
email = str(email)
currentVal = float(currentVal)
currency = str(currency)

def send_mail(currency, targetVal, currentVal, email, z):
    if(currency == "BTC"):
        currency = "Bitcoin"
    elif(currency == "ETH"):
        currency = "Ethereum"
    elif(currency == "USDT"):
        currency = "Tether"

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login('crypto.alert.ak@gmail.com', 'abq1231m;qwe')

    subject = "CRYPTO ALERT"
    if(z == 3):
        body = f"The price of {currency} is now {targetVal}!\nEarlier it was {currentVal}.\n\nThis crypto alert was brought to you by Aditya Kumar's application. Find out more on https://github.com/ak-51?tab=repositories.\nThis is an auto-generated email."
    
    elif(z == 2):
        body = f"The price of {currency} has now increased to {targetVal}!\nEarlier it was {currentVal}.\n\nThis crypto alert was brought to you by Aditya Kumar's application. Find out more on https://github.com/ak-51?tab=repositories.\nThis is an auto-generated email."
    
    elif(z == 1):
        body = f"The price of {currency} has now decreased to {targetVal}!\nEarlier it was {currentVal}.\n\nThis crypto alert was brought to you by Aditya Kumar's application. Find out more on https://github.com/ak-51?tab=repositories.\nThis is an auto-generated email."

    msg = f"Subject: {subject}\n\n{body}"

    server.sendmail('crypto.alert.ak@gmail.com',email, msg)

    server.quit()

x = 1
while(x == 1):
    pc = cryptocompare.get_price(currency, currency='USD')
    pc = pc[currency]['USD']
    pc = float(pc)
    if(currentVal > targetVal):
        if(pc <= targetVal):
            targetVal = "$" + str(targetVal)
            currentVal = "$" + str(currentVal)
            z = 1
            send_mail(currency, targetVal, currentVal, email, z)
            x = 0
    
    elif(currentVal < targetVal):
        if(pc >= targetVal):
            targetVal = "$" + str(targetVal)
            currentVal = "$" + str(currentVal)
            z = 2
            send_mail(currency, targetVal, currentVal, email, z)
            x = 0
    
    elif(currentVal == targetVal):
        targetVal = "$" + str(targetVal)
        currentVal = "$" + str(currentVal)
        z = 3
        send_mail(currency, targetVal, currentVal, email, z)
        x = 0
        
    time.sleep(1)

print("Email has been sent")