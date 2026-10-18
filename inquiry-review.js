/* Topic detection is deliberately conservative and always shows source text. */
(function(root){
 const topics=[
  {key:'date',label:'Event date',pattern:/\b20\d{2}-\d{2}-\d{2}\b|\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}\b/i,question:'What date are you requesting, and are there alternative dates that work?'},
  {key:'turnout',label:'Expected turnout',pattern:/\b(?:expected?\s+(?:turnout|attendance)|expecting\s+\d|\d[\d,]*\s+(?:guests|attendees)|turnout\s*:)/i,question:'How many guests do you expect to attend?'},
  {key:'budget',label:'Venue budget',pattern:/\$\s*\d|\bbudget\b/i,question:'What budget have you set aside for the venue and event services?'},
  {key:'end',label:'Show finish / curfew',pattern:/\b(?:finish|ends?|wrap|curfew)\b[^.!?\n]{0,55}\d{1,2}:\d{2}/i,question:'What time will the show finish, including any encore?'},
  {key:'desiredSquareFootage',label:'Desired square footage',pattern:/\b\d[\d,.]*\s*(?:sq\.?\s*ft\.?|sqft|square\s*(?:feet|foot))\b/i,question:'Do you require a minimum room area? If so, how many square feet?'},
  {key:'tech',label:'Equipment needs',pattern:/\b(?:PA|lighting|microphones?|projector|backline|equipment)\b/i,question:'What sound, lighting, backline, or other equipment do you need?'},
  {key:'loadIn',label:'Load-in and soundcheck',pattern:/\b(?:load[ -]?in|sound[ -]?check)\b/i,question:'What load-in and soundcheck times do you need?'},
  {key:'doors',label:'Doors and show start',pattern:/\b(?:doors|show\s+starts?|start\s+time)\b/i,question:'When should doors open, and when will the performance start?'},
  {key:'rider',label:'Full technical rider',pattern:/\b(?:technical\s+rider|tech\s+rider|stage\s+plot|input\s+list)\b/i,question:'Can you share your technical rider, stage plot, and input list?'},
  {key:'demand',label:'Artist draw / past attendance',pattern:/\b(?:past\s+(?:show|ticket|attendance)|previous\s+(?:show|attendance)|ticket\s+sales|sold[ -]?out|streaming\s+audience)\b/i,question:'Can you share recent attendance or ticket sales for comparable local shows?'},
  {key:'ticketPrice',label:'Ticket price',pattern:/\b(?:ticket\s+price|tickets?\s+(?:at|cost|priced)|admission\s+price)\b/i,question:'What ticket price are you planning, and are there different ticket tiers?'},
  {key:'deal',label:'Preferred deal structure',pattern:/\b(?:flat\s+(?:rate|rental|fee)|door\s+split|revenue\s+split|base\s+payment|hybrid|guarantee)\b/i,question:'Do you prefer a flat venue fee, a door split, or a base payment plus a split?'}
 ];
 function review(q){
  const body=String(q.body||'');
  return topics.map(topic=>{
   const match=topic.pattern.exec(body);
   let source='';
   if(match){const start=Math.max(0,Math.max(body.lastIndexOf('\n',match.index),body.lastIndexOf('. ',match.index),body.lastIndexOf('! ',match.index),body.lastIndexOf('? ',match.index))+1);const tail=body.slice(match.index+match[0].length);const stop=tail.search(/[.!?](?:\s|$)|\n/);const end=stop<0?Math.min(body.length,match.index+120):match.index+match[0].length+stop+1;source=body.slice(start,end).trim();if(source.length>180)source=source.slice(0,177)+'…';}
   const uncertain=match&&/\b(?:TBD|unknown|undecided|not\s+(?:sure|yet|confirmed)|will\s+(?:send|confirm)|to\s+be\s+(?:confirmed|determined))\b/i.test(source);
   const saved=q[topic.key]!==undefined&&q[topic.key]!==null&&q[topic.key]!=='';
   const status=match?(uncertain?'review':'mentioned'):(saved?'recorded':'missing');
   return {key:topic.key,label:topic.label,status,source,value:saved?q[topic.key]:'',question:topic.question};
  });
 }
 root.StageFitInquiryReview={review};
})(typeof module!=='undefined'?module.exports:window);
