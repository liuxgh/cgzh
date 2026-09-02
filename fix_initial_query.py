with open('src/components/TechSearchHub.tsx', 'r') as f:
    content = f.read()

content = content.replace("const [hasMatched, setHasMatched] = useState(!!initialQuery);", "const [hasMatched, setHasMatched] = useState(!!query);")

with open('src/components/TechSearchHub.tsx', 'w') as f:
    f.write(content)
