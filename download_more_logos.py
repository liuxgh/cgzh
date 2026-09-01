import urllib.request
import os
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download(url, filename):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as response, open(filename, 'wb') as out_file:
            out_file.write(response.read())
            print(f"Downloaded: {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

urls = {
    'public/jiangnan.png': 'https://www.jiangnan.edu.cn/images/logo.png',
    'public/suda.png': 'https://www.suda.edu.cn/images/logo.png',
    'public/njust.png': 'https://www.njust.edu.cn/images/logo.png'
}

os.makedirs('public', exist_ok=True)
for filename, url in urls.items():
    download(url, filename)
