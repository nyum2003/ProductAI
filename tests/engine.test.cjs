const {test}=require('node:test');
const assert=require('node:assert/strict');
const {StageFit:{defaults:v,samples,assess,extract}}=require('../engine.js');
test('sample fits and uses approved itemized rates',()=>{const a=assess(samples[0],v);assert.equal(a.ok,true);assert.equal(a.total,1920)});
test('capacity and curfew boundaries are inclusive',()=>{assert.equal(assess({...samples[0],turnout:350,end:'23:00'},v).ok,true);assert.equal(assess({...samples[0],turnout:351},v).ok,false);assert.equal(assess({...samples[0],end:'23:01'},v).ok,false)});
test('blocked and already booked dates fail',()=>{assert.equal(assess(samples[1],v).checks[0].ok,false);assert.equal(assess(samples[0],v,[{id:'other',date:samples[0].date,status:'booked'}]).checks[0].ok,false)});
test('unknown and incompatible equipment need review',()=>{assert.equal(assess({...samples[0],tech:'projector'},v).ok,false);assert.equal(assess({...samples[0],tech:'',date:'',turnout:0,end:''},v).ok,false)});
test('extracts supported email details and preserves unknowns',()=>{assert.deepEqual(extract('2026-11-20 expecting 240 guests, $2,500. PA and lighting. Ends 22:30.'),{desiredSquareFootage:'',date:'2026-11-20',turnout:240,budget:2500,end:'22:30',tech:'PA, lighting'});assert.equal(extract('Let’s play soon').date,'')});
