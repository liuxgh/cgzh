import re

filepath = 'src/data/mockData.ts'
with open(filepath, 'r') as f:
    content = f.read()

# E.g. CN202310892341.2 -> CN116892341B
def replacer(match):
    # Just invent a random looking 9 digit number starting with 11 for the publication number
    # using the last 7 digits of the application number
    digits = match.group(2)
    return f"CN116{digits[-6:]}B"

content = re.sub(r'CN(20\d{2})1(\d{7})\.\d', replacer, content)

with open(filepath, 'w') as f:
    f.write(content)
print("Updated mockData.ts")
