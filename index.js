// sentences problem
// $str = 'Fry me a Beaver. Fry me a Beaver! Fry me a Beaver? Fry me Beaver no. 4?! Fry me many Beavers... End';
// $sentences = preg_split('/(?<=[.?!])\s+(?=[a-z])/i', $str);
// print_r($sentences);
//

// i look here:
/*

http://www.morim.com/memento%20binyanim.htm
he.wikipedia.org/wiki/דקדוק_עברי
he.wikipedia.org/wiki/שורשן

לפי:
he.wikipedia.org/wiki/גזרה_(דקדוק)

"בבלשנות השמית מקובל לתאר את המורפולוגיה כמתבססת 
על מורפמות מופשטות (צורנים) המכונות "שורשים". 
על פי התאוריה הזו, שורש טיפוסי הוא בן שלושה יסודות,
הוא משתלב במערכת נוספת של מורפמות המכונות "בניינים" או "משקלים" 
ליצירת מילים. 
ברוב השורשים שלושת יסודות השורש הם שלושה עיצורים;
הגזרות הן קבוצות השורשים שבהם לאחד או יותר משלושת העיצורים
יש מאפיינים חריגים, או שאין בהם שלושה עיצורים כלל."

זה אומר שיש לי בניינים או משקלים
שמורכבים משורשים
שורשים בדרך כלל מאותיות עם צליל קשה - עיצורים
ואם יש אותיות היווי זה שורשים מיוחדים
ויש הטייות על השורש במקרים כאלה
 

לפי:
he.wikipedia.org/wiki/בניינים_בעברית


יש 7 שיטות לשימוש בהטייה של זמן ולבחירה של שם גוף

המטרה היא להביא את כל המצבים לעבר ונסתר שזה שם גוף הוא למשל הפעיל

http://www.safa-ivrit.org/

and try to make rules from it

*/

/*
 this function goes overs an array of words. and converts every each word into an array of ambiguations.
 each subfunction processes the whole word array for each word and appends ambiguations to bottom of array.
*/

function lemmafilter(sentencewords)
{
 for(var i=0;i<sentencewords.length;i++)
 {
  var word_ambis=[];word_ambis.push(unniqqud(sentencewords[i])); // optianally to give additional points for niqqud after a sucsessful match, sometimes people use only one niqqud accent not al of them, for each niqqud to add a point of relieability,
  
  unverb(word_ambis);
  ungender(word_ambis);
  unplural(word_ambis);
  
  sentencewords[i]=word_ambis.join('|');
 }
 
 return sentencewords;
}
function un_hefil(word_ambis)
{
 //בניין הִפְעִיל
 //הטיית הפועל בבניין זה בכל הגופים לפי השורש ל.ב.ש
 //שם הפועל - לְהַלְבִּיש
 for(var i=0;i<word_ambis.length;i++)
 {
  var word=word_ambis[i];
  var m=null;
  //עבר
  if(m=word.match(//)=='ל')word_ambis.push(word.substring(1,word.length)+'ה');
  if(word.substring(0,2)=='הת')word_ambis.push(word.substring(1,word.length)+'ה');
  if(word.substring(0,2)=='מת')word_ambis.push(word.substring(1,word.length)+'ה');
 }
}

function unverb(word_ambis)
{
 for(var i=0;i<word_ambis.length;i++)
 {
  var word=word_ambis[i];
  if(word[0]=='ל')word_ambis.push(word.substring(1,word.length)+'ה');
  if(word.substring(0,2)=='הת')word_ambis.push(word.substring(1,word.length)+'ה');
  if(word.substring(0,2)=='מת')word_ambis.push(word.substring(1,word.length)+'ה');
 }
}

function unplural(word_ambis)
{
 for(var i=0;i<word_ambis.length;i++)
 {
  var word=word_ambis[i];
  if(word.substring(word.length-2,word.length)=='ים')word_ambis.push(word.substring(0,word.length-2)+'י');
  if(word.substring(word.length-2,word.length)=='יות')word_ambis.push(word.substring(0,word.length-3)+'ת');
 }
}

function ungender(word_ambis)
{
 for(var i=0;i<word_ambis.length;i++)
 {
  var word=word_ambis[i];
  if(word.substring(word.length-2,word.length)=='ם')word_ambis.push(word.substring(0,word.length-1));
  if(word.substring(word.length-2,word.length)=='ות')word_ambis.push(word.substring(0,word.length-2));
 }
}

function unniqqud(rawString)
{
 return rawString.replace(/[\u0591-\u05C7]/g,"")
 /*
	var newString = '';
	for(j=0; j<rawString.length; j++) {
		if(rawString.charCodeAt(j)<1425 || rawString.charCodeAt(j)>1479)
		{ newString = newString + rawString.charAt(j); }
	}
	return(newString);*/
}
