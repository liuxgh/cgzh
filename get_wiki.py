import urllib.request
import urllib.parse
import json

def get_image(title):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=300"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode())
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                print(f"{title}: {pages[page_id]['thumbnail']['source']}")
            else:
                print(f"{title}: No thumbnail")
    except Exception as e:
        print(f"Error {title}: {e}")

get_image("Hohai University")
get_image("Southeast University")
get_image("Jiangnan University")
get_image("Soochow University (Suzhou)")
get_image("Nanjing University of Science and Technology")
