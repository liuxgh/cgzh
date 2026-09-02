import re
filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

pattern = r"<span>佰腾 AI 智能体正在进行多维跨数据库穿透检索与关联推理\.\.\.</span>"
replacement = "<span>{agentMode === 'search' ? '佰腾 AI 智能体正在进行多维跨数据库穿透检索与关联推理...' : '佰腾 AI 智能体正在自动撰写定制化科技成果转化推荐函...'}</span>"
content = re.sub(pattern, replacement, content)

with open(filepath, 'w') as f:
    f.write(content)
