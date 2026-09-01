import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def search(name):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(name)}&prop=pageimages&format=json&pithumbsize=500"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req, context=ctx)
        data = json.loads(response.read().decode())
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                print(f"{name}: {pages[page_id]['thumbnail']['source']}")
            else:
                print(f"{name}: No thumbnail")
    except Exception as e:
        print(f"{name}: Error {e}")

search("Hohai University")
search("Southeast University")
search("Jiangnan University")
search("Soochow University")
search("Nanjing University of Science and Technology")
