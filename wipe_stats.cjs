const fs = require('fs');

function replaceFile(path, replacerFn) {
  let content = fs.readFileSync(path, 'utf8');
  content = replacerFn(content);
  fs.writeFileSync(path, content, 'utf8');
}

// 1. App.tsx: already done? wait, the user said "后面也是佰腾网 | 吉林大学科技成果转化专区". 
// Wait! Let me check the App.tsx again. Maybe I left the old title in `<title>` or somewhere?
// The user said: "站脚佰腾网 | 吉林大学... 改对了，但站头还是不对，头部也一样用佰腾网的logo... 后面也是 佰腾网 | 吉林大学科技成果转化专区".
// My previous script patched `src/App.tsx`. Let me look at it.
