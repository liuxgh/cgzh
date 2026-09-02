import re
import random

surnames = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐']
first_names = ['伟', '强', '磊', '洋', '勇', '军', '杰', '涛', '超', '明', '刚', '平', '辉', '鹏', '华', '飞', '鑫', '波', '斌', '浩', '宇', '帅', '星', '宁', '林', '栋', '建', '峰', '健', '博', '凯', '龙']

with open('src/data/targetEnterprisesData.ts', 'r') as f:
    content = f.read()

def repl_name(match):
    name = match.group(1)
    new_name = random.choice(surnames) + random.choice(first_names)
    return f"name: '{new_name}'"

new_content = re.sub(r"name:\s*'([^']+)'", repl_name, content)

with open('src/data/targetEnterprisesData.ts', 'w') as f:
    f.write(new_content)
