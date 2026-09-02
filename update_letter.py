import re

filepath = 'src/components/AiEnterpriseAgent.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Fix the button wrapping
button_html = """
                  <button
                    onClick={() => handleCopyText(`【吉林大学科技开发中心"""

new_button_html = """
                  <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyText(`【吉林大学科技开发中心"""

content = content.replace(button_html, new_button_html)

end_buttons_html = """
                  <button className="px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm">
                    <Mail className="w-3.5 h-3.5" />
                    <span>一键发送邮件给企业</span>
                  </button>
                </div>"""

new_end_buttons_html = """
                  <button className="px-3.5 py-1.5 bg-[#003d80] hover:bg-blue-900 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm">
                    <Mail className="w-3.5 h-3.5" />
                    <span>一键发送邮件给企业</span>
                  </button>
                  </div>
                </div>"""

content = content.replace(end_buttons_html, new_end_buttons_html)

# Add enterprise name
content = content.replace("尊敬的战略合作企业技术研发管理部门：", "尊敬的{initialEnterprise ? initialEnterprise.name : '战略合作企业'}技术研发管理部门：")
content = content.replace("致：各战略合作企业技术研发中心及决策管理团队", "致：{initialEnterprise ? initialEnterprise.name : '战略合作企业'} 技术研发中心及决策管理团队")
content = content.replace("与贵司技术布局的战略契合点：", "与{initialEnterprise ? initialEnterprise.shortName : '贵司'}技术布局的战略契合点：")

with open(filepath, 'w') as f:
    f.write(content)
print("Updated letter template.")
