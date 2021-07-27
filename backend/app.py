from flask import Flask, jsonify
from flask import request
from flask_api import status
import requests
import time
import sys
import urllib.request
import json
from bs4 import BeautifulSoup
from flask_cors import CORS
from models.priceResult import PriceResult
from models.finviz import Finviz
from models.tipranks import TipRanks

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


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
                    print ('Made it')
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
    upperSymbol = stockSymbol.upper()
    wsjURL = 'https://www.wsj.com/market-data/quotes/{}/research-ratings'.format(upperSymbol)
    page = urllib.request.Request(wsjURL, headers={"User-Agent": "Mozilla/5.0"})
    response = urllib.request.urlopen(page)
    soup = BeautifulSoup(response, "html.parser")
    results = soup.findAll("td")
    for index, result in enumerate(results):
        targetPriceLabelHigh = result.find(string="High")
        targetPriceLabelMedium = result.find(string="Median")
        targetPriceLabelLow = result.find(string="Low")
        targetPriceLabelAvg = result.find(string="Average")
        if targetPriceLabelHigh:
            print(result.findNext('td').text)
        if targetPriceLabelMedium:
            print(result.findNext('td').text)
        if targetPriceLabelLow:
            print(result.findNext('td').text)
        if targetPriceLabelAvg:
            print(result.findNext('td').text)


def getCompanyLogo():
    return ""; 


@app.route("/")
def hello():
    return "Server Loaded"


@app.route('/loadstocks')
def loadStocks():
    stocksList = requests.get(
        'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c26mmgqad3i8b33nt2cg'
    )
    return jsonify(stocksList.json())


@app.route("/searchstock", methods=['POST'])
def searchStock():
    if request.method == 'POST':
        priceResult = PriceResult(None,None,None)
        request_data = request.get_json()
        stockSymbol = request_data['stockSymbol']
        finviz = scrapeFinviz(stockSymbol)
        if(finviz != "Not Found"):
            priceResult.finviz = finviz
        tipranks = scrapeTipranks(stockSymbol)
        if (tipranks != "Not Found"):
            priceResult.tipRanks = tipranks
        if (priceResult.finviz == None and priceResult.tipRanks == None and priceResult.wsj == None):
            return "Record not found",status.HTTP_400_BAD_REQUEST
        priceResult = json.dumps(scrapeFinviz(priceResult).__dict__)
        return jsonify(priceResult),200    
    return "Record not found",status.HTTP_400_BAD_REQUEST


if __name__ == '__main__':
    app.run(port=5002)
