filepath = 'src/components/PatentSimilarSearchHub.tsx'
with open(filepath, 'r') as f:
    content = f.read()

target = "const [searchKeyword, setSearchKeyword] = useState<string>('');"
if target in content:
    content = content.replace(target, "const [searchKeyword, setSearchKeyword] = useState<string>('');\n  const [currentPage, setCurrentPage] = useState<number>(1);\n  const itemsPerPage = 10;")
    with open(filepath, 'w') as f:
        f.write(content)
    print("Fixed pagination state.")
else:
    print("Target still not found")
