const fs = require('fs');
const path = require('path');

const target = path.join(process.cwd(), 'assets/secure/whitepaper_v1.0.pdf');
console.log('CWD:', process.cwd());
console.log('Target:', target);

if (fs.existsSync(target)) {
    console.log('✅ File found!');
} else {
    console.error('❌ File NOT found via fs.existsSync');
    
    // Try listing dir
    const dir = path.dirname(target);
    if (fs.existsSync(dir)) {
        console.log('Directory exists. Contents:', fs.readdirSync(dir));
    } else {
        console.log('Directory does NOT exist:', dir);
    }
}
