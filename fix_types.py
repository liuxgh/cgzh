import re
with open("src/types.ts", "r") as f:
    text = f.read()

text = re.sub(r"'enterprise-profile'\s*\|\s*\|\s*'overview'", "'enterprise-profile' | 'overview'", text)

with open("src/types.ts", "w") as f:
    f.write(text)
