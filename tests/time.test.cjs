const {test}=require('node:test');const assert=require('node:assert/strict');
const {StageFit:{formatTime,parseTime,extract,assess,defaults,samples}}=require('../engine.js');
test('AM/PM correctly handles midnight, noon, and evening',()=>{assert.equal(formatTime('00:00'),'12:00 AM');assert.equal(formatTime('12:00'),'12:00 PM');assert.equal(formatTime('23:30'),'11:30 PM');assert.equal(parseTime('12:00 AM'),'00:00');assert.equal(parseTime('12:00 PM'),'12:00');assert.equal(parseTime('10:30 pm'),'22:30')});
test('invalid time entry is rejected',()=>{for(const t of ['13:00 PM','0:30 AM','12:60 PM','22:30'])assert.equal(parseTime(t),null)});
test('import accepts AM/PM and feasibility displays it',()=>{assert.equal(extract('Show ends 10:30 PM').end,'22:30');assert.match(assess(samples[0],defaults).checks[2].detail,/10:30 PM.*11:00 PM/)});
