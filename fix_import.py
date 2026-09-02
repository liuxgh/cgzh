with open('src/components/EnterpriseProfilePage.tsx', 'r') as f:
    content = f.read()

content = content.replace("import React\nimport { CopyableText } from './CopyableText';, { useState } from 'react';", "import React, { useState } from 'react';\nimport { CopyableText } from './CopyableText';")

with open('src/components/EnterpriseProfilePage.tsx', 'w') as f:
    f.write(content)
