from flask import Flask, jsonify
from flask import request
from flask_api import status
import requests
import time
import sys
import urllib.request
import json
import finnhub
from bs4 import BeautifulSoup
from flask_cors import CORS
from models.priceResult import PriceResult  
from models.finviz import Finviz
from models.tipranks import TipRanks
from models.wsj import Wsj

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

finnhub_client = finnhub.Client(api_key="c26mmgqad3i8b33nt2cg")

def scrapeFinviz(stockSymbol):
    finvizRes = Finviz('0')
    upperSymbol = stockSymbol.upper()
    try:
        finvizURL = 'https://finviz.com/quote.ashx?t={}&ty=l&ta=0&p=d&b=1'.format(upperSymbol)
        page = urllib.request.Request(finvizURL,headers={"User-Agent": "Mozilla/5.0"})
        response = urllib.request.urlopen(page)
        soup = BeautifulSoup(response, "html.parser")
        results = soup.findAll("td")
        if len(results) > 0:
            for index, result in enumerate(results):
                targetPriceLabel = result.find(string="Target Price")
                if targetPriceLabel:
                    finvizRes.price = result.next_sibling.find(text=True)
            return finvizRes
        return "Not Found" 
    except urllib.error.HTTPError:
      print ('Hello Error')
      return "Not Found"
        

def scrapeTipranks(stockSymbol):
    # tipRanksApiResponse = requests.get("https://www.tipranks.com/api/stocks/getData/?name=TSLA&benchmark=1&period=3&break=1623087888929")
    # print(tipRanksApiResponse.json())
    tipRanks = TipRanks('0','0','0')
    lowerSymbol = stockSymbol.lower()
    try:
        tipranksURL = 'https://www.tipranks.com/stocks/{}/forecast'.format(lowerSymbol)
        page = urllib.request.Request(tipranksURL, headers={"User-Agent": "Mozilla/5.0"})
        response = urllib.request.urlopen(page)
        soup = BeautifulSoup(response, "html.parser")
        results = soup.findAll("span")
        if len(results) > 0:
            for index, result in enumerate(results):
                targetPriceLabelLowest = result.find(string="Lowest Price Target")
                targetPriceLabelAvg = result.find(string="Average Price Target")
                targetPriceLabelLow = result.find(string="Highest Price Target")
                if targetPriceLabelLowest:
                    tipRanks.low = result.next_sibling.find(text=True)
                if targetPriceLabelAvg:
                    tipRanks.mid = result.next_sibling.find(text=True)
                if targetPriceLabelLow:
                    tipRanks.high = result.next_sibling.find(text=True)
            return tipRanks
        return "Not Found"    
    except urllib.error.HTTPError:
      print ('Hello Error')        
    return "Not Found";    



def scrapeWsj(stockSymbol):
    wsj = Wsj('0','0','0')
    upperSymbol = stockSymbol.upper()
    try:
        wsjURL = 'https://www.wsj.com/market-data/quotes/{}/research-ratings'.format(upperSymbol)
        page = urllib.request.Request(wsjURL, headers={"User-Agent": "Mozilla/5.0"})
        response = urllib.request.urlopen(page)
        soup = BeautifulSoup(response, "html.parser")
        results = soup.findAll("td")
        if len(results) > 0:
            for index, result in enumerate(results):
                targetPriceLabelHigh = result.find(string="High")
                # targetPriceLabelMedium = result.find(string="Median")
                targetPriceLabelLow = result.find(string="Low")
                targetPriceLabelAvg = result.find(string="Average")
                if targetPriceLabelHigh:
                    wsj.high = result.findNext('td').text
                # if targetPriceLabelMedium:
                #     wsj.mid = result.findNext('td').text
                if targetPriceLabelLow:
                    wsj.low = result.findNext('td').text
                if targetPriceLabelAvg:
                    wsj.mid = result.findNext('td').text
            return wsj
        return "Not Found"           
    except urllib.error.HTTPError:
        print ('Hello Error')
    return "Not Found"    




@app.route("/")
def hello():
    return "Server Loaded"


@app.route('/loadstocks')
def loadStocks():
    stocksList = requests.get(
        'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c26mmgqad3i8b33nt2cg'
    )
    return jsonify(stocksList.json())


def getCompanyLogoUrl(companyName):
    url = "assets/images/TPC.svg"
    if(companyName):    
        queryUrl = "https://autocomplete.clearbit.com/v1/companies/suggest?query={}".format(companyName)
        companies = requests.get(queryUrl)
        companiesArr = json.loads(companies.text)
        if len(companiesArr) > 0:
            for index, result in enumerate(companiesArr):
                if companyName in result['domain']:
                    url = result['logo'] + "?size=200"
                    break
    return url

@app.route("/getipo", methods=['POST'])
def getIpoCalender():
    request_data = request.get_json()
    fromDate = request_data['from']
    toDate = request_data['to']
    ipoArray = finnhub_client.ipo_calendar(_from=fromDate, to=toDate)    
    finalIpoArray = list(filter(lambda stock: stock['exchange'] != None,ipoArray['ipoCalendar']))
    return jsonify(finalIpoArray),200


def getStockCurrentPrice(stockSymbol):
    stockApiResponse = finnhub_client.quote(stockSymbol)
    return "$" + str(stockApiResponse['c'])


@app.route("/searchstock", methods=['POST'])
def searchStock():
    if request.method == 'POST':
        priceResult = PriceResult(None,None,None,None,None)
        request_data = request.get_json()
        stockSymbol = request_data['stockSymbol']
        companyName = request_data['companyName']
        priceResult.currentPrice = getStockCurrentPrice(stockSymbol)
        priceResult.companyLogoSrc = getCompanyLogoUrl(companyName.lower())
        finviz = scrapeFinviz(stockSymbol)
        if(finviz != "Not Found"):
            priceResult.finviz = json.dumps(finviz.__dict__)
        tipranks = scrapeTipranks(stockSymbol)
        if (tipranks != "Not Found"):
            priceResult.tipRanks = json.dumps(tipranks.__dict__)
        wsj = scrapeWsj(stockSymbol)
        if (wsj != "Not Found"):
            priceResult.wsj = json.dumps(wsj.__dict__)
        if (priceResult.finviz == None and priceResult.tipRanks == None and priceResult.wsj == None):
            return "Record not found",status.HTTP_400_BAD_REQUEST
        priceResult = json.dumps(priceResult.__dict__)
        # print(priceResult)    
        return jsonify(priceResult),200  
        # return "Hello",200      
    return "Record not found",status.HTTP_400_BAD_REQUEST


if __name__ == '__main__':
    app.run(port=5002)
