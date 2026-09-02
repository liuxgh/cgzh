import re

filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# 1. State
content = content.replace("useState<'report' | 'official_letter' | 'call_script'>('report')", "useState<'official_letter' | 'call_script'>('official_letter')")

# 2. Report Button
content = re.sub(r'<button\s+onClick=\{\(\) => setActiveTab\(\'report\'\)\}[\s\S]*?AI 推荐靶向企业全景画像 \(Top 8\)</span>\s*</button>', '', content)

# 3. Report Content
content = re.sub(r'\{\s*activeTab === \'report\' && \([\s\S]*?\}\s*\)\s*\}\s*\{\/\* TAB 2', '{/* TAB 2', content)

# 4. Tab 2 and Tab 3 names
content = content.replace('定制《产学研科技成果对接推介公函》', '吉林大学科技成果转化推介公函')
content = content.replace('电话沟通与走访切入点指南', '吉大成果转化老师上门走访与电话沟通切入指南')
content = content.replace('吉大成果转化老师上门走访与电话沟通切入指南 (Talking Points)', '吉大成果转化老师上门走访与电话沟通切入指南')

# 5. Add Mail button to Official Letter
# Let's find:
#                     <span>{copied ? '已复制公函全文' : '一键复制公函文本'}</span>
#                   </button>
#                 </div>
# And replace with:
#                     <span>{copied ? '已复制公函全文' : '一键复制公函文本'}</span>
#                   </button>
#                   <button className="px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm">
#                     <Mail className="w-3.5 h-3.5" />
#                     <span>一键发送邮件给企业</span>
#                   </button>
#                 </div>
import_mail = 'Mail' in content
if not import_mail:
    content = content.replace('import {', 'import { Mail,', 1)

content = content.replace("<span>{copied ? '已复制公函全文' : '一键复制公函文本'}</span>\n                  </button>\n                </div>", "<span>{copied ? '已复制公函全文' : '一键复制公函文本'}</span>\n                  </button>\n                  <button className=\"px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm\">\n                    <Mail className=\"w-3.5 h-3.5\" />\n                    <span>一键发送邮件给企业</span>\n                  </button>\n                </div>")

with open(filepath, 'w') as f:
    f.write(content)
print("Applied fixes to AiEnterpriseAgent.tsx")
