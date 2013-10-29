// sentences problem
// $str = 'Fry me a Beaver. Fry me a Beaver! Fry me a Beaver? Fry me Beaver no. 4?! Fry me many Beavers... End';
// $sentences = preg_split('/(?<=[.?!])\s+(?=[a-z])/i', $str);
// print_r($sentences);
//
// $0.value.replace(/[\u0590-\u05C7]/g,"")
//
// 
/*

links:


he.wikipedia.org/wiki/דקדוק_עברי
he.wikipedia.org/wiki/שורשן
http://www.safa-ivrit.org/

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

i look here:
http://www.morim.com/memento%20binyanim.htm
and try to make rules from it

i have an excel file, in it i copy a table from that website, then i make it not 3 columns but single column one after another.
then i replace nikud in it (add same formatting:when i pace the column without nikud also i copy and pace special formatting only on it with the style of the column with nikud)

in chrome browser i paste into any textarea on the internet(http://regexlib.com/RETester.aspx) and right click on it and from menu click inspect element. in console i write $0 . is the selected element (text box) 
$0.value.replace(/[\u0590-\u05C7]/g,"")
i copy the result from console to a notepad then from notepad to excel

then i replace the shoresh in the list without nikud with regex matches as a column of the regex match

$0.value.replace(/לבש/g,"(.+)").replace(/לב/g,"(.+)").replace(/ש/g,"(.)")

then i make an if statment  (i have 2 version of statments if there are 2 matches i connect them together otherwise i use the first only)  
the if statment contains regesp replace to original form of the poal past-he , probably i will change it to something else later
then i add comments on comments lines with br then i replace the br to new lines \r\n
then i place the rules here in a function


to test just paste the text with nikkud from the columns and see the result all the same in test.html file 

// til now this is without gzerot// gzerot can be a

/// names are not recognized probably will be by noticeing a word after poal or before poal if poal has savil


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
  
  un_hefil(word_ambis);
  //ungender(word_ambis);
  //unplural(word_ambis);
  
  sentencewords[i]=word_ambis.join('|');
 }
 
 return sentencewords;
}

/*
simple function

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

*/

function un_hefil(word_ambis)
{
 //בניין הִפְעִיל
 //הטיית הפועל בבניין זה בכל הגופים לפי השורש ל.ב.ש
 //שם הפועל - לְהַלְבִּיש
 for(var i=0;i<word_ambis.length;i++)
 {
  var word=word_ambis[i];
  var m=null;
 //  - בניין הִפְעִיל
 // עבר + הוא + למד בהתחלה - שם הפועל - לְהַלְבִּיש
//עבר
 // הִלְבַּשְׁתִּי - מדבר (אני)
if(m=word.match(/ה(.+)תי/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתָּ - נוכח (אתה)
if(m=word.match(/ה(.+)ת/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתְּ - נוכחת (את)
if(m=word.match(/ה(.+)ת/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישׁ - נסתר (הוא)
if(m=word.match(/ה(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישָׁה - נסתרת (היא)
if(m=word.match(/ה(.+)י(.)ה/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְנוּ - מדברים (אנו)
if(m=word.match(/ה(.+)נו/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתֶּם - נוכחים (אתם)
if(m=word.match(/ה(.+)תם/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתֶּן - נוכחות (אתן)
if(m=word.match(/ה(.+)תן/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישוּ - נסתרים (הם)
if(m=word.match(/ה(.+)י(.)ו/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישוּ - נסתרות (הן)
if(m=word.match(/ה(.+)י(.)ו/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // מַלְבִּיש / מַלְבִּישָׁה - מדבר (אני) זכר
if(m=word.match(/מ(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּיש / מַלְבִּישָׁה - מדבר (אני) נקבה
if(m=word.match(/מ(.+)י(.)ה/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁ - נוכח (אתה)
if(m=word.match(/מ(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישָׁה - נוכחת (את)
if(m=word.match(/מ(.+)י(.)ה/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁ - נסתר (הוא)
if(m=word.match(/מ(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישָׁה - נסתרת (היא)
if(m=word.match(/מ(.+)י(.)ה/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישִׁים - מדברים (אנו)
if(m=word.match(/מ(.+)י(.)ים/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישִׁים - נוכחים (אתם)
if(m=word.match(/מ(.+)י(.)ים/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁוֹת - נוכחות (אתן)
if(m=word.match(/מ(.+)י(.)ות/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישִׁים - נסתרים (הם)
if(m=word.match(/מ(.+)י(.)ים/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁוֹת - נסתרות (הן)
if(m=word.match(/מ(.+)י(.)ות/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
//עתיד
 // אַלְבִּישׁ - מדבר (אני)
if(m=word.match(/א(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּישׁ - נוכח (אתה)
if(m=word.match(/ת(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּישִׁי - נוכחת (את)
if(m=word.match(/ת(.+)י(.)י/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יַלְבִּישׁ - נסתר (הוא)
if(m=word.match(/י(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּיש - נסתרת (היא)
if(m=word.match(/ת(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // נַלְבִּישׁ - מדברים (אנו)
if(m=word.match(/נ(.+)י(.)/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּישׁוּ - נוכחים (אתם)
if(m=word.match(/ת(.+)י(.)ו/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבֵּשְׁנָה - נוכחות (אתן)
if(m=word.match(/ת(.+)נה/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יַלְבִּישׁוּ - נסתרים (הם)
if(m=word.match(/י(.+)י(.)ו/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבֵּשְׁנָה - נסתרות (הן)
if(m=word.match(/ת(.+)נה/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//ציווי
 // - - מדבר (אני)
//-
 // הַלְבֵּשׁ - נוכח (אתה)
if(m=word.match(/ה(.+)/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הַלְבִּישִׁי - נוכחת (את)
if(m=word.match(/ה(.+)י(.)י/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתר (הוא)
//-
 // - - נסתרת (היא)
//-
 // - - מדברים (אנו)
//-
 // הַלְבִּישׁוּ - נוכחים (אתם)
if(m=word.match(/ה(.+)י(.)ו/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הַלְבֵּשְׁנָה - נוכחות (אתן)
if(m=word.match(/ה(.+)נה/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתרים (הם)
//-
 // - - נסתרות (הן)
//-
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
