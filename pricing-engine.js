(function(root){
 function calculate(p){
  const numeric=['capacity','ticket','fee','low','expected','high','operations','staff','security','equipment','rental','share','guarantee','floor'];
  if(numeric.some(k=>!Number.isFinite(Number(p[k]))||Number(p[k])<0))throw Error('Enter non-negative numbers for all pricing assumptions.');
  const n=Object.fromEntries(numeric.map(k=>[k,Number(p[k])]));
  if(!Number.isInteger(n.capacity)||n.capacity<1||['low','expected','high'].some(k=>!Number.isInteger(n[k])))throw Error('Capacity and attendance must be whole numbers.');
  if(n.low>n.expected||n.expected>n.high||n.high>n.capacity)throw Error('Use low ≤ expected ≤ high attendance, within room capacity.');
  if(n.share>100||n.fee>n.ticket)throw Error('Venue share must be 0–100% and ticket fees cannot exceed the ticket price.');
  const cents=value=>Math.round((value+Number.EPSILON)*100)/100;
  const cost=cents(n.operations+n.staff+n.security+n.equipment);
  const deals=['rental','split','guarantee'].map(id=>{
   const rows=['low','expected','high'].map(key=>{const attendance=n[key],gross=cents(attendance*n.ticket),fees=cents(attendance*n.fee),net=cents(gross-fees);
    const income=cents(id==='rental'?n.rental:id==='split'?net*n.share/100:Math.max(n.guarantee,net*n.share/100));
    return {key,attendance,gross,fees,net,income,contribution:cents(income-cost),promoter:cents(net-income)};});
   const yieldPerGuest=(n.ticket-n.fee)*n.share/100;
   function attendanceFor(goal){if(id==='rental')return n.rental>=cost+goal?0:null;if(id==='guarantee'&&n.guarantee>=cost+goal)return 0;return yieldPerGuest>0?Math.max(0,Math.ceil((cost+goal)/yieldPerGuest)):null;}
   return {id,rows,cost,breakEven:attendanceFor(0),targetAttendance:attendanceFor(n.floor),meetsFloor:rows[0].contribution>=n.floor};
  });
  const ranked=[...deals].sort((a,b)=>b.rows[0].contribution-a.rows[0].contribution||b.rows[1].contribution-a.rows[1].contribution);
  return {deals,cost,bestDownside:ranked[0].id};
 }
 root.StageFitPricing={calculate};
})(typeof module!=='undefined'?module.exports:window);
