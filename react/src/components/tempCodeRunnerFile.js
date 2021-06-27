request({
        method:'GET',
        url:'https://www.marketwatch.com/investing/cryptocurrency/btcusd?mod=home-page',
    }, (err, res, body) => {
        if(err) return console.error(err);
        let $ = cheerio.load(body);
        console.log($("h3.intraday__price bg-quote").text())
    })