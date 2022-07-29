from django.shortcuts import render

import json
import requests

secret_key ='sQi%2FzMQ3vue0d1rD%2FvPtCe2OgezQc37UYHrqZnNakgkK%2B1ugwK%2BWAkj74lu4Kpz1WbP3s%2FlJYG%2B9Utm%2BCZVSJg%3D%3D'



def home(request):

    url ='http://api.data.go.kr/openapi/tn_pubr_public_toilet_api?serviceKey='+secret_key+'&pageNo=0&numOfRows=100&type=json'

    response = requests.get(url)
    resdata = response.text
    obj = json.loads(resdata)
    response = requests.get(url)
    resdata = response.text
    obj = json.loads(resdata)
    docs = obj['response']
    docs_t = docs['body']
    final = docs_t['items']

    
    return render(request, "index.html", {'final' : final})




def review(request):
    return render(request, "review.html")
 
def search(request):
    return render(request, "search.html")
 