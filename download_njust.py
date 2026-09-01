import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://upload.wikimedia.org/wikipedia/en/5/52/Nanjing_University_of_Science_and_Technology_logo.png"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, context=ctx) as response, open('public/njust.png', 'wb') as out_file:
        out_file.write(response.read())
        print("Downloaded njust.png")
except Exception as e:
    print(f"Failed: {e}")
