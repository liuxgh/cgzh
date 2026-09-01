const fs = require('fs');
let code = fs.readFileSync('src/components/EnterpriseLandingPage.tsx', 'utf8');

// Update logos
code = code.replace("logo: 'hhu_mock'", "logo: '/hhu.svg'");
code = code.replace("logo: 'seu_mock'", "logo: '/seu.png'");
code = code.replace("logo: 'jiangnan_mock'", "logo: '/jiangnan.png'");
code = code.replace("logo: 'suda_mock'", "logo: '/suda.png'");
code = code.replace("logo: 'njust_mock'", "logo: '/njust.svg'");

// Remove the jlu specific rendering
const old_render = `{uni.id === 'jlu' ? (
                    <img src={uni.logo} alt={uni.name} className="h-full object-contain" />
                 ) : (
                    <div className="h-12 px-5 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-black text-xl rounded-xl flex items-center justify-center tracking-widest shadow-inner">
                      {uni.name}
                    </div>
                 )}`;

const new_render = `<img src={uni.logo} alt={uni.name} className="h-full w-auto object-contain max-w-[200px]" />`;
code = code.replace(old_render, new_render);

// Optimize the grid UI
// Change grayscale to something less aggressive
code = code.replace("'bg-slate-50 border-slate-200 opacity-75 grayscale'", "'bg-slate-50 border-slate-200 opacity-80 grayscale-[30%]'");
code = code.replace("'bg-slate-50 border-slate-200 opacity-75 grayscale'", "'bg-slate-50 border-slate-200 opacity-80 grayscale-[30%]'");

// Add Hover effect for coming_soon
code = code.replace("'bg-slate-50 border-slate-200 opacity-80 grayscale-[30%]'", "'bg-slate-50 border-slate-200 opacity-80 hover:opacity-100 grayscale-[40%] hover:grayscale-0 transition-all duration-300'");

// Update "即将接入" label to look nicer
code = code.replace(
    'className="absolute top-6 right-6 px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg shadow-inner"',
    'className="absolute top-6 right-6 px-3 py-1.5 bg-slate-100 text-slate-500 border border-slate-200 text-xs font-bold rounded-lg shadow-sm"'
);

// Optimize Hero Section
// Make it look a bit more modern
code = code.replace(
    'bg-slate-900 text-white p-8 sm:p-14 shadow-xl border border-slate-800',
    'bg-slate-900 text-white p-10 sm:p-16 shadow-2xl border border-slate-800 overflow-hidden group'
);

code = code.replace(
    'className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"',
    'className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors duration-700 rounded-full blur-[120px] pointer-events-none"'
);

code = code.replace(
    'className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"',
    'className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-700 rounded-full blur-[100px] pointer-events-none"'
);

fs.writeFileSync('src/components/EnterpriseLandingPage.tsx', code);
console.log('Updated EnterpriseLandingPage.tsx');
