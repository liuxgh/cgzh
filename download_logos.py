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
    'public/hhu.png': 'https://www.hhu.edu.cn/images/logo.png',
    'public/seu.png': 'https://www.seu.edu.cn/_upload/tpl/0a/65/2661/template2661/images/logo.png',
}

os.makedirs('public', exist_ok=True)
for filename, url in urls.items():
    download(url, filename)
