filepath = 'src/data/targetEnterprisesData.ts'
with open(filepath, 'r') as f:
    content = f.read()

# Replace any occurrence of } followed by whitespaces then { in the array with }, {
import re
content = re.sub(r'\}\s*\{', '},\n  {', content)

with open(filepath, 'w') as f:
    f.write(content)
