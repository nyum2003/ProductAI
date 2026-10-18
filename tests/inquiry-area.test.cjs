const {test}=require('node:test');const assert=require('node:assert/strict');
const {StageFit:{assess,extract,defaults,samples}}=require('../engine.js');
test('room area equal to venue size fits, larger requirement fails',()=>{assert.equal(assess({...samples[0],desiredSquareFootage:3500},defaults).ok,true);assert.equal(assess({...samples[0],desiredSquareFootage:3501},defaults).ok,false)});
test('an unspecified request does not invent a space requirement',()=>{assert.equal(assess(samples[0],defaults).ok,true);assert.equal(extract('We need a room for 200 guests.').desiredSquareFootage,'')});
test('specified request needs a known venue area and valid positive number',()=>{assert.equal(assess({...samples[0],desiredSquareFootage:2500},{...defaults,squareFootage:undefined}).ok,false);for(const area of [0,-1,'bad'])assert.equal(assess({...samples[0],desiredSquareFootage:area},defaults).ok,false)});
test('extracts square-foot units without confusing them with attendance',()=>{for(const text of ['Need 2,500 sq ft','Need 2500 sqft','Need 2500 square feet'])assert.equal(extract(text).desiredSquareFootage,2500);assert.equal(extract('Expecting 240 guests and need 2,500 sq ft.').turnout,240)});
