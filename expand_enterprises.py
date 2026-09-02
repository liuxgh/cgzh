import re
import json
import random

filepath = 'src/data/targetEnterprisesData.ts'
with open(filepath, 'r') as f:
    content = f.read()

# We need to find the TARGET_ENTERPRISES_DATA array and duplicate elements.
# It's an exported const.
match = re.search(r'export const TARGET_ENTERPRISES_DATA: TargetEnterprise\[\] = \[([\s\S]+?)\];', content)
if not match:
    print("Could not parse array")
    exit(1)

array_content = match.group(1)

# We can't simply json.loads because it's JS (unquoted keys, trailing commas, comments).
# But we can just create synthetic ones in Python and append them.
# Let's write a regex parser or just generate from scratch and append to the TS file.
