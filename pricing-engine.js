(function(root){
 const cents=n=>Math.round((n+Number.EPSILON)*100)/100;
 function salesBounds(p){
  const yieldPerGuest=(Number(p.ticket)-Number(p.fee))*Number(p.share)/100;
  const required=yieldPerGuest>0?Math.ceil(Number(p.baseline)/yieldPerGuest):null;
  return {min:required,max:Number(p.capacity),feasible:required!==null&&required<=Number(p.capacity)};
 }
 function suggest(p){
  const cost=Number(p.operations)+Number(p.staff)+Number(p.security)+Number(p.equipment);
  const payout=Math.ceil(Math.max(Number(p.baseline),cost/(1-Number(p.marginTarget)/100))*100)/100;
  const net=(Number(p.ticket)-Number(p.fee))*Number(p.expected);
  const share=net>0?Math.ceil(payout/net*1000)/10:100;
  const base=Number(p.baseline);
  const baseShare=net>0?Math.ceil(Math.max(0,payout-base)/net*1000)/10:100;
  return {rental:payout,base,share:Math.min(100,share),baseShare:Math.min(100,baseShare),unreachable:net<payout};
 }
 function calculate(p){
  const keys=['capacity','sqft','ticket','fee','low','expected','high','operations','staff','security','equipment','baseline','rental','share','base','baseShare','minSales','marginLow','marginHigh','marginTarget'];
  if(keys.some(k=>p[k]===''||p[k]==null||!Number.isFinite(Number(p[k]))||Number(p[k])<0))throw Error('Complete all inputs with non-negative numbers.');
  const n=Object.fromEntries(keys.map(k=>[k,Number(p[k])]));
  if(n.capacity<1||n.sqft<1||['capacity','low','expected','high','minSales'].some(k=>!Number.isInteger(n[k])))throw Error('Capacity, sales minimum, and attendance must be whole numbers; square footage must be positive.');
  if(n.low>n.expected||n.expected>n.high||n.high>n.capacity)throw Error('Use low ≤ expected ≤ high attendance, within room capacity.');
  if(n.share>100||n.baseShare>100||n.fee>n.ticket)throw Error('Shares must be 0–100%; ticket fees cannot exceed ticket price.');
  if(n.marginLow>n.marginTarget||n.marginTarget>n.marginHigh||n.marginHigh>80)throw Error('Profit range must contain the target margin and stay within 0–80%.');
  if(n.rental<n.baseline||n.base<n.baseline)throw Error('Flat Rate and the Hybrid base cannot be below the Flat Rate baseline.');
  const bounds=salesBounds(n);
  if(n.minSales>n.capacity||n.minSales<1||(bounds.feasible&&n.minSales<bounds.min))throw Error('Minimum Expected Sales must be within the calculated feasible ticket range.');
  const cost=cents(n.operations+n.staff+n.security+n.equipment);
  const splitEligible=bounds.feasible&&n.expected>=n.minSales;
  const deals=['rental','split','base','hybrid'].map(id=>{
   const rows=['low','expected','high'].map(key=>{
    const attendance=n[key],gross=cents(attendance*n.ticket),fees=cents(attendance*n.fee),net=cents(gross-fees);
    const split=cents(net*n.share/100),baseSplit=cents(n.base+net*n.baseShare/100);
    const branch=id==='hybrid'&&attendance>=n.minSales&&split>n.rental?'Door split':'Flat Rate';
    const income=id==='rental'?n.rental:id==='split'?split:id==='base'?baseSplit:branch==='Door split'?split:n.rental;
    const contribution=cents(income-cost),margin=income>0?contribution/income*100:null;
    return {key,attendance,gross,fees,net,income:cents(income),contribution,margin,promoter:cents(net-income),belowMinimum:attendance<n.minSales,branch};
   });
   return {id,rows,cost,eligible:id!=='split'||(splitEligible&&rows[1].income>=n.baseline),meetsFloor:rows[0].income>=n.baseline&&rows[0].margin!==null&&rows[0].margin>=n.marginLow,expectedInRange:rows[1].margin!==null&&Math.round(rows[1].margin*10)/10>=n.marginLow&&Math.round(rows[1].margin*10)/10<=n.marginHigh};
  });
  return {deals,cost,bounds,splitEligible,profitRange:[cents(cost/(1-n.marginLow/100)-cost),cents(cost/(1-n.marginHigh/100)-cost)],bestDownside:[...deals].sort((a,b)=>b.rows[0].contribution-a.rows[0].contribution)[0].id};
 }
 root.StageFitPricing={calculate,suggest,salesBounds};
})(typeof module!=='undefined'?module.exports:window);
