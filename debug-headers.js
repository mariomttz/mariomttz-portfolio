const fs = require('fs');
const content = fs.readFileSync('public/_headers', 'utf-8');

console.log('=== File content (first 500 chars) ===');
console.log(JSON.stringify(content.substring(0, 500)));

console.log('\n=== Testing global section regex ===');
const globalSectionRegex = /^\/\*\s*$[\s\S]*?(?=^\/[^*]|\n\n|$)/gm;
const globalMatch = globalSectionRegex.exec(content);

if (globalMatch) {
  console.log('Global section found:');
  console.log(JSON.stringify(globalMatch[0]));
} else {
  console.log('Global section NOT found');
}

console.log('\n=== Testing header regex in global section ===');
if (globalMatch) {
  const headerRegex = /^\s*X-Frame-Options:\s*(.+?)$/gm;
  const headerMatch = headerRegex.exec(globalMatch[0]);
  if (headerMatch) {
    console.log('X-Frame-Options found:', headerMatch[1]);
  } else {
    console.log('X-Frame-Options NOT found');
    console.log('Trying to find all lines in global section:');
    const lines = globalMatch[0].split('\n');
    lines.forEach((line, i) => {
      console.log(`Line ${i}: ${JSON.stringify(line)}`);
    });
  }
}
