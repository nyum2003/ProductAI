const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function setup(){const context={document:{getElementById:()=>({})},localStorage:{getItem:()=>null}};vm.createContext(context);const code=fs.readFileSync(path.join(__dirname,'../research.js'),'utf8');vm.runInContext(code.replace(/draw\(\);\s*$/,''),context);return context;}
test('empty research does not imply customer evidence',()=>{const c=setup();const s=vm.runInContext('summary([])',c);assert.equal(s.qualified,0);assert.equal(s.successful,0);assert.equal(s.median,null)});
test('proxy sessions are excluded and target failures remain in the denominator',()=>{const c=setup();const s=vm.runInContext("summary([{role:'Team member / proxy',minutes:1,outcome:'Completed without help',edits:'No edits'},{role:'Target venue owner / booking manager',minutes:10,outcome:'Completed without help',edits:'Light edits'},{role:'Target venue owner / booking manager',minutes:12,outcome:'Completed with help',edits:'Major edits'}])",c);assert.equal(s.qualified,2);assert.equal(s.successful,1);assert.equal(s.median,11)});
