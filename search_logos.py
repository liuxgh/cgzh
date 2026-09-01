import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

universities = ["河海大学", "东南大学", "江南大学", "苏州大学", "南京理工大学"]

for uni in universities:
    url = f"https://zh.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(uni)}&prop=pageimages&format=json&pithumbsize=300"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req, context=ctx)
        data = json.loads(response.read().decode())
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                print(f"{uni}: {pages[page_id]['thumbnail']['source']}")
            else:
                print(f"{uni}: No thumbnail")
    except Exception as e:
        print(f"{uni}: Error {e}")
