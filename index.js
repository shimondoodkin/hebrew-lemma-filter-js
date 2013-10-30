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

$0.value.replace(/BR/g,"\r\n")

then i place the rules here in a function


to test just paste the text with nikkud from the columns and see the result all the same in test.html file 

// til now this is without gzerot// gzerot can be a

/// names are not recognized probably will be by noticeing a word after poal or before poal if poal has savil


*/

/*
 this function goes overs an array of words. and converts every each word into an array of ambiguations.
 each subfunction processes the whole word array for each word and appends ambiguations to bottom of array.
*/
/*
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
*/
function lemmafilter(text)
{
 return text.replace(/[^\s.,:\/\\]+/g,function(m){
  console.log(m)
  var word_ambis=[unniqqud(m)];//first element in array // optianally to give additional points for niqqud after a sucsessful match, sometimes people use only one niqqud accent not al of them, for each niqqud to add a point of relieability,
  for(var i=0,l=word_ambis.length;i<l;i++)
  {
   var word=word_ambis[i];
   un_poal_hefil(word,word_ambis);
   un_poal_hufal(word,word_ambis);
   un_poal_nifal(word,word_ambis);
   un_poal_kal(word,word_ambis);
   un_poal_kaved_piel(word,word_ambis);
   un_poal_kaved_pual(word,word_ambis);
   un_poal_kaved_hitpael(word,word_ambis);
   //ungender(word_ambis);
   //unplural(word_ambis);
  }
  return word_ambis.join('|');
 });
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

function un_poal_hefil(word,word_ambis)
{
  var m=null;

 //בניין הִפְעִיל
 //הטיית הפועל בבניין זה בכל הגופים לפי השורש ל.ב.ש
 // עבר + הוא + למד בהתחלה - שם הפועל - לְהַלְבִּיש

//עבר
 // הִלְבַּשְׁתִּי - מדבר (אני)
if(m=word.match(/^ה(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתָּ - נוכח (אתה)
if(m=word.match(/^ה(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתְּ - נוכחת (את)
if(m=word.match(/^ה(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישׁ - נסתר (הוא)
if(m=word.match(/^ה(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישָׁה - נסתרת (היא)
if(m=word.match(/^ה(.+)י(.)ה$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְנוּ - מדברים (אנו)
if(m=word.match(/^ה(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתֶּם - נוכחים (אתם)
if(m=word.match(/^ה(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבַּשְׁתֶּן - נוכחות (אתן)
if(m=word.match(/^ה(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישוּ - נסתרים (הם)
if(m=word.match(/^ה(.+)י(.)ו$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הִלְבִּישוּ - נסתרות (הן)
if(m=word.match(/^ה(.+)י(.)ו$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // מַלְבִּיש / מַלְבִּישָׁה - מדבר (אני) זכר
if(m=word.match(/^מ(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּיש / מַלְבִּישָׁה - מדבר (אני) נקבה
if(m=word.match(/^מ(.+)י(.)ה$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁ - נוכח (אתה)
if(m=word.match(/^מ(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישָׁה - נוכחת (את)
if(m=word.match(/^מ(.+)י(.)ה$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁ - נסתר (הוא)
if(m=word.match(/^מ(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישָׁה - נסתרת (היא)
if(m=word.match(/^מ(.+)י(.)ה$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישִׁים - מדברים (אנו)
if(m=word.match(/^מ(.+)י(.)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישִׁים - נוכחים (אתם)
if(m=word.match(/^מ(.+)י(.)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁוֹת - נוכחות (אתן)
if(m=word.match(/^מ(.+)י(.)ות$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישִׁים - נסתרים (הם)
if(m=word.match(/^מ(.+)י(.)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // מַלְבִּישׁוֹת - נסתרות (הן)
if(m=word.match(/^מ(.+)י(.)ות$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
//עתיד
 // אַלְבִּישׁ - מדבר (אני)
if(m=word.match(/^א(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּישׁ - נוכח (אתה)
if(m=word.match(/^ת(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּישִׁי - נוכחת (את)
if(m=word.match(/^ת(.+)י(.)י$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יַלְבִּישׁ - נסתר (הוא)
if(m=word.match(/^י(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּיש - נסתרת (היא)
if(m=word.match(/^ת(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // נַלְבִּישׁ - מדברים (אנו)
if(m=word.match(/^נ(.+)י(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבִּישׁוּ - נוכחים (אתם)
if(m=word.match(/^ת(.+)י(.)ו$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבֵּשְׁנָה - נוכחות (אתן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יַלְבִּישׁוּ - נסתרים (הם)
if(m=word.match(/^י(.+)י(.)ו$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // תַּלְבֵּשְׁנָה - נסתרות (הן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//ציווי
 // - - מדבר (אני)
//-
 // הַלְבֵּשׁ - נוכח (אתה)
if(m=word.match(/^ה(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הַלְבִּישִׁי - נוכחת (את)
if(m=word.match(/^ה(.+)י(.)י$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתר (הוא)
//-
 // - - נסתרת (היא)
//-
 // - - מדברים (אנו)
//-
 // הַלְבִּישׁוּ - נוכחים (אתם)
if(m=word.match(/^ה(.+)י(.)ו$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // הַלְבֵּשְׁנָה - נוכחות (אתן)
if(m=word.match(/^ה(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתרים (הם)
//-
 // - - נסתרות (הן)
//-
}

function un_poal_hufal(word,word_ambis)
{
  var m=null;
 //  - בניין הֻפְעַל
 //  - לפי השורש ל.ב.ש
//עבר
 // הֻלְבַּשְׁתִּי - מדבר (אני)
if(m=word.match(/^ה(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבַּשְׁתָּ - נוכח (אתה)
if(m=word.match(/^ה(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבַּשְׁתְּ - נוכחת (את)
if(m=word.match(/^ה(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבַּשׁ - נסתר (הוא)
if(m=word.match(/^ה(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבְּשָׁה - נסתרת (היא)
if(m=word.match(/^ה(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבַּשְנוּ - מדברים (אנו)
if(m=word.match(/^ה(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבַּשְׁתֶם - נוכחים (אתם)
if(m=word.match(/^ה(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבַּשְׁתֶן - נוכחות (אתן)
if(m=word.match(/^ה(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבְּשׁוּ - נסתרים (הם)
if(m=word.match(/^ה(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הֻלְבְּשׁוּ - נסתרות (הן)
if(m=word.match(/^ה(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // מֻלְבָּש - מדבר (אני)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבָּש - נוכח (אתה)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבֶּשֶׁת - נוכחת (את)
if(m=word.match(/^מ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבָּש - נסתר (הוא)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבֶּשֶׁת - נסתרת (היא)
if(m=word.match(/^מ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבָּשִׁים - מדברים (אנו)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבָּשִׁים - נוכחים (אתם)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבָּשׁוֹת - נוכחות (אתן)
if(m=word.match(/^מ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבָּשִׁים - נסתרים (הם)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מֻלְבָּשׁוֹת - נסתרות (הן)
if(m=word.match(/^מ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//עתיד
 // אֻלְבַּשׁ - מדבר (אני)
if(m=word.match(/^א(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תֻּלְבַּשׁ - נוכח (אתה)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תֻּלְבְּשִׁי - נוכחת (את)
if(m=word.match(/^ת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יֻלְבַּשׁ - נסתר (הוא)
if(m=word.match(/^י(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תֻּלְבַּשׁ - נסתרת (היא)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נֻלְבַּשׁ - מדברים (אנו)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תֻּלְבְּשוּ - נוכחים (אתם)
if(m=word.match(/^ת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תֻּלְבַּשְׁנַה - נוכחות (אתן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יֻלְבְּשׁוּ - נסתרים (הם)
if(m=word.match(/^י(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תֻּלְבַּשְׁנַה - נסתרות (הן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))

}

function un_poal_nifal(word,word_ambis)
{
  var m=null;
// בניין נִפְעַל
// הטיית הפועל בבניין זה בכל הגופים לפי השורש פ.ק.ד
// שם הפועל - לְהִפָּקֵד
//עבר
 // נִפְקַדְתִּי - מדבר (אני)
if(m=word.match(/^נ(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקַדְתָ - נוכח (אתה)
if(m=word.match(/^נ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקַדְת - נוכחת (את)
if(m=word.match(/^נ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקַד - נסתר (הוא)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקְדָה - נסתרת (היא)
if(m=word.match(/^נ(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקַדְנוּ - מדברים (אנו)
if(m=word.match(/^נ(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקַדְתֶּם - נוכחים (אתם)
if(m=word.match(/^נ(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקַדְתֶּן - נוכחות (אתן)
if(m=word.match(/^נ(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקְדוּ - נסתרים (הם)
if(m=word.match(/^נ(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקְדוּ - נסתרות (הן)
if(m=word.match(/^נ(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // נִפְקָד - מדבר (אני)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקָד - נוכח (אתה)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקֶדֶת - נוכחת (את)
if(m=word.match(/^נ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקָד - נסתר (הוא)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקֶדֶת - נסתרת (היא)
if(m=word.match(/^נ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקָדִים - מדברים (אנו)
if(m=word.match(/^נ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקָדִים - נוכחים (אתם)
if(m=word.match(/^נ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקָדוֹת - נוכחות (אתן)
if(m=word.match(/^נ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקָדִים - נסתרים (הם)
if(m=word.match(/^נ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפְקָדוֹת - נסתרות (הן)
if(m=word.match(/^נ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//עתי(.)
 // אֶפָּקֵד - מדבר (אני)
if(m=word.match(/^א(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּפָּקֵד - נוכח (אתה)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּפָּקְדִּי - נוכחת (את)
if(m=word.match(/^ת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִפָּקֵד - נסתר (הוא)
if(m=word.match(/^י(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּפָּקֵד - נסתרת (היא)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִפָּקֵד - מדברים (אנו)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּפָּקְדּוּ - נוכחים (אתם)
if(m=word.match(/^ת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּפָּקֶדְנָה - נוכחות (אתן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִפָּקְדּוּ - נסתרים (הם)
if(m=word.match(/^י(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּפָּקֶדְנָה - נסתרות (הן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//ציווי
 // - - מדבר (אני)
//-
 // הִפָּקֵד - נוכח (אתה)
if(m=word.match(/^ה(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִפָּקְדִי - נוכחת (את)
if(m=word.match(/^ה(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתר (הוא)
//-
 // - - נסתרת (היא)
//-
 // - - מדברים (אנו)
//-
 // הִפָּקְדּוּ - נוכחים (אתם)
if(m=word.match(/^ה(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִפָּקֵדְנָה - נוכחות (אתן)
if(m=word.match(/^ה(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתרים (הם)
//-
 // - - נסתרות (הן)
//-
}


function un_poal_kal(word,word_ambis)
{
  var m=null;
//עבר
 // כָּתַבְתִּי - מדבר (אני)
if(m=word.match(/^(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כָּתַבְתָּ - נוכח (אתה)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כָּתַבְתְּ - נוכחת (את)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כָּתַב - נסתר (הוא)
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כָּתְבָה - נסתרת (היא)
if(m=word.match(/^(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כָּתַבְנוּ - מדברים (אנו)
if(m=word.match(/^(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כְּתַבְתֶּם - נוכחים (אתם)
if(m=word.match(/^(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כְּתַבְתֶּן - נוכחות (אתן)
if(m=word.match(/^(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כָּתְבוּ - נסתרים (הם)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // כָּתְבוּ - נסתרות (הן)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))


//הווה
 // כּוֹתֵב - יחיד
if(m=word.match(/^(.)ו(.+)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // כּוֹתֶבֶת - יחידה
if(m=word.match(/^(.)ו(.+)ת$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // כּוֹתְבִים - רבים
if(m=word.match(/^(.)ו(.+)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // כּוֹתְבוֹת - רבות
if(m=word.match(/^(.)ו(.+)ות$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))


//הווה
 // כָּתוּב - יחיד
if(m=word.match(/^(.+)ו(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // כְּתוּבָה - יחידה
if(m=word.match(/^(.+)ו(.)ה$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // כְּתוּבִים - רבים
if(m=word.match(/^(.+)ו(.)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // כְּתוּבוֹת - רבות
if(m=word.match(/^(.+)ו(.)ות$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))


//עתיד
 // אֶלְמַד - מדבר (אני)
if(m=word.match(/^א(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּלְמַד - נוכח (אתה)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּלְמְדִי - נוכחת (את)
if(m=word.match(/^ת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִלְמַד - נסתר (הוא)
if(m=word.match(/^י(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּלְמַד - נסתרת (היא)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִלְמַד - מדברים (אנו)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּלְמְדוּ - נוכחים (אתם)
if(m=word.match(/^ת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּלְמַדְנָה - נוכחות (אתן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִלְמְדוּ - נסתרים (הם)
if(m=word.match(/^י(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּלְמַדְנָה - נסתרות (הן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//ציווי
 // - - מדבר (אני)
//-
 // לְמַד - נוכח (אתה)
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // לִמְדִי - נוכחת (את)
if(m=word.match(/^(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתר (הוא)
//-
 // - - נסתרת (היא)
//-
 // - - מדברים (אנו)
//-
 // לִמְדוּ - נוכחים (אתם)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // לְמַדְנָה - נוכחות (אתן)
if(m=word.match(/^(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתרים (הם)
//-
 // - - נסתרות (הן)
//-


//עתיד
 // אֶשְבֹּר - מדבר (אני)
if(m=word.match(/^א(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּשְבֹּר - נוכח (אתה)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּשְבְּרִי - נוכחת (את)
if(m=word.match(/^ת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִשְבֹּר - נסתר (הוא)
if(m=word.match(/^י(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּשְבֹּר - נסתרת (היא)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִשְבֹּר - מדברים (אנו)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּשְבְּרוּ - נוכחים (אתם)
if(m=word.match(/^ת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּשְבֹּרְנָה - נוכחות (אתן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִשְבְּרוּ - נסתרים (הם)
if(m=word.match(/^י(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּשְבֹּרְנָה - נסתרות (הן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//ציווי
 // - - מדבר (אני)
//-
 // שְפֹט - נוכח (אתה)
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // שִפְטִי - נוכחת (את)
if(m=word.match(/^(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתר (הוא)
//-
 // - - נסתרת (היא)
//-
 // - - מדברים (אנו)
//-
 // שִפְטוּ - נוכחים (אתם)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // שְפֹטְנָה - נוכחות (אתן)
if(m=word.match(/^(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתרים (הם)
//-
 // - - נסתרות (הן)
//-



//הווה
 // יָשֶן - יחיד
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְשֵנָה - יחידה
if(m=word.match(/^(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְשֵנִים - רבים
if(m=word.match(/^(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְשֵנוֹת - רבות
if(m=word.match(/^(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))


//עבר
 // יָכֹלְתִּי - מדבר (אני)
if(m=word.match(/^(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכֹלְתָּ - נוכח (אתה)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכֹלְתְּ - נוכחת (את)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכֹל - נסתר (הוא)
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכְלָה - נסתרת (היא)
if(m=word.match(/^(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכֹלְנוּ - מדברים (אנו)
if(m=word.match(/^(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכָלְתֶּם - נוכחים (אתם)
if(m=word.match(/^(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכָלְתֶּן - נוכחות (אתן)
if(m=word.match(/^(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכְלוּ - נסתרים (הם)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכְלוּ - נסתרות (הן)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // יָכוֹל - מדבר (אני)
if(m=word.match(/^(.+)ו(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכוֹל - נוכח (אתה)
if(m=word.match(/^(.+)ו(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכוֹלָה - נוכחת (את)
if(m=word.match(/^(.+)ו(.)ה$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יָכוֹל - נסתר (הוא)
if(m=word.match(/^(.+)ו(.)$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכוֹלָה - נסתרת (היא)
if(m=word.match(/^(.+)ו(.)ה$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכוֹלִים - מדברים (אנו)
if(m=word.match(/^(.+)ו(.)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכוֹלִים - נוכחים (אתם)
if(m=word.match(/^(.+)ו(.)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכוֹלוֹת - נוכחות (אתן)
if(m=word.match(/^(.+)ו(.)ות$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכוֹלִים - נסתרים (הם)
if(m=word.match(/^(.+)ו(.)ים$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
 // יְכוֹלוֹת - נסתרות (הן)
if(m=word.match(/^(.+)ו(.)ות$/))word_ambis.push((m[1]+m[2]).replace(/(.+)(.)$/,'ה$1י$2'))
}

function un_poal_kaved_piel(word,word_ambis)
{
  var m=null;
// בניין פִּעֵל (בניין כבד)
// הטיית הפועל בבניין זה בכל הגופים לפי השורש ס.פ.ר
 //  - שם הפועל - לְסַפֵּר
if(m=word.match(/^$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//עבר
 // סִפַּרְתִּי - מדבר (אני)
if(m=word.match(/^(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפַּרְתָּ - נוכח (אתה)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפַּרְתְּ - נוכחת (את)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפֵּר - נסתר (הוא)
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפְּרָה - נסתרת (היא)
if(m=word.match(/^(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפַּרְנוּ - מדברים (אנו)
if(m=word.match(/^(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפַּרְתֶּם - נוכחים (אתם)
if(m=word.match(/^(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפַּרְתֶּן - נוכחות (אתן)
if(m=word.match(/^(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפְּרוּ - נסתרים (הם)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סִפְּרוּ - נסתרות (הן)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // מְסַפֵּר - מדבר (אני)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפֵּר - נוכח (אתה)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפֶּרֶת - נוכחת (את)
if(m=word.match(/^מ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפֵּר - נסתר (הוא)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפֶּרֶת - נסתרת (היא)
if(m=word.match(/^מ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפְּרִים - מדברים (אנו)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפְּרִים - נוכחים (אתם)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפְּרוֹת - נוכחות (אתן)
if(m=word.match(/^מ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפְּרִים - נסתרים (הם)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסַפְּרוֹת - נסתרות (הן)
if(m=word.match(/^מ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//עתיד
 // אֲסַפֵּר - מדבר (אני)
if(m=word.match(/^א(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסַפֵּר - נוכח (אתה)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסַפְּרִי - נוכחת (את)
if(m=word.match(/^ת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְסַפֵּר - נסתר (הוא)
if(m=word.match(/^י(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסַפֵּר - נסתרת (היא)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נְסַפֵּר - מדברים (אנו)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסַפְּרוּ - נוכחים (אתם)
if(m=word.match(/^ת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסַפֵּרְנָה - נוכחות (אתן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְסַפְּרוּ - נסתרים (הם)
if(m=word.match(/^י(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסַפֵּרְנָה - נסתרות (הן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//ציווי
 // - - מדבר (אני)
//-
 // סַפֵּר - נוכח (אתה)
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סַפְּרִי - נוכחת (את)
if(m=word.match(/^(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתר (הוא)
//-
 // - - נסתרת (היא)
//-
 // - - מדברים (אנו)
//-
 // סַפְּרוּ - נוכחים (אתם)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סַפְּרְנָה - נוכחות (אתן)
if(m=word.match(/^(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתרים (הם)
//-
 // - - נסתרות (הן)
//-
}

function un_poal_kaved_pual(word,word_ambis)
{
  var m=null;
// בניין פֻּעַל (בניין כבד)
// הטיית הפועל בבניין זה בכל הגופים לפי השורש ס.פ.ר
//עבר
 // סֻפַּרְתִּי - מדבר (אני)
if(m=word.match(/^(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפַּרְתָּ - נוכח (אתה)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפַּרְתְּ - נוכחת (את)
if(m=word.match(/^(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפַּר - נסתר (הוא)
if(m=word.match(/^(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפְּרַה - נסתרת (היא)
if(m=word.match(/^(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפַּרְנוּ - מדברים (אנו)
if(m=word.match(/^(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפַּרְתֶּם - נוכחים (אתם)
if(m=word.match(/^(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפַּרְתֶּן - נוכחות (אתן)
if(m=word.match(/^(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפְּרוּ - נסתרים (הם)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // סֻפְּרוּ - נסתרות (הן)
if(m=word.match(/^(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // מְסֻפָּר - מדבר (אני)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפָּר - נוכח (אתה)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפֶּרֶת - נוכחת (את)
if(m=word.match(/^מ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפָּר - נסתר (הוא)
if(m=word.match(/^מ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפֶּרֶת - נסתרת (היא)
if(m=word.match(/^מ(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפָּרִים - מדברים (אנו)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפָּרִים - נוכחים (אתם)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפָּרוֹת - נוכחות (אתן)
if(m=word.match(/^מ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפָּרִים - נסתרים (הם)
if(m=word.match(/^מ(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מְסֻפָּרוֹת - נסתרות (הן)
if(m=word.match(/^מ(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//עתיד
 // אֲסֻפַּר - מדבר (אני)
if(m=word.match(/^א(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסֻפַּר - נוכח (אתה)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסֻפְּרִי - נוכחת (את)
if(m=word.match(/^ת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְסֻפַּר - נסתר (הוא)
if(m=word.match(/^י(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסֻפַּר - נסתרת (היא)
if(m=word.match(/^ת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נְסֻפַּר - מדברים (אנו)
if(m=word.match(/^נ(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסֻפְּרוּ - נוכחים (אתם)
if(m=word.match(/^ת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסֻפַּרְנָה - נוכחות (אתן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יְסֻפְּרוּ - נסתרים (הם)
if(m=word.match(/^י(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תְּסֻפַּרְנָה - נסתרות (הן)
if(m=word.match(/^ת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
}

function un_poal_kaved_hitpael(word,word_ambis)
{
  var m=null;
// בניין הִתְפַּעֵל (בניין כבד)
// הטיית הפועל בבניין זה בכל הגופים לפי השורש ל.ב.ש
// שם הפועל - לְהִתְלַבֵּש
//עבר
 // הִתְלַבַּשְתִּי - מדבר (אני)
if(m=word.match(/^הת(.+)תי$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבַּשְתָּ - נוכח (אתה)
if(m=word.match(/^הת(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבַּשְתְּ - נוכחת (את)
if(m=word.match(/^הת(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבֵּש - נסתר (הוא)
if(m=word.match(/^הת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבְּשָה - נסתרת (היא)
if(m=word.match(/^הת(.+)ה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבַּשְנוּ - מדברים (אנו)
if(m=word.match(/^הת(.+)נו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבַּשְתֶּם - נוכחים (אתם)
if(m=word.match(/^הת(.+)תם$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבַּשְתֶּן - נוכחות (אתן)
if(m=word.match(/^הת(.+)תן$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבְּשוּ - נסתרים (הם)
if(m=word.match(/^הת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבְּשוּ - נסתרות (הן)
if(m=word.match(/^הת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//הווה
 // מִתְלַבֵּש - מדבר (אני)
if(m=word.match(/^מת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבֵּש - נוכח (אתה)
if(m=word.match(/^מת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבֶּשֶת - נוכחת (את)
if(m=word.match(/^מת(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבֵּש - נסתר (הוא)
if(m=word.match(/^מת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבֶּשֶת - נסתרת (היא)
if(m=word.match(/^מת(.+)ת$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבְּשִים - מדברים (אנו)
if(m=word.match(/^מת(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבְּשִים - נוכחים (אתם)
if(m=word.match(/^מת(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבְּשוֹת - נוכחות (אתן)
if(m=word.match(/^מת(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבְּשִים - נסתרים (הם)
if(m=word.match(/^מת(.+)ים$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // מִתְלַבְּשוֹת - נסתרות (הן)
if(m=word.match(/^מת(.+)ות$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//עתיד
 // אֶתְלַבֵּש - מדבר (אני)
if(m=word.match(/^את(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּתְלַבֵּש - נוכח (אתה)
if(m=word.match(/^תת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּתְלַבְּשִי - נוכחת (את)
if(m=word.match(/^תת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִתְלַבֵּש - נסתר (הוא)
if(m=word.match(/^ית(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּתְלַבֵּש - נסתרת (היא)
if(m=word.match(/^תת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // נִתְלַבֵּש - מדברים (אנו)
if(m=word.match(/^נת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תתלבשו - נוכחים (אתם)
if(m=word.match(/^תת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּתְלַבֵּשְנָה - נוכחות (אתן)
if(m=word.match(/^תת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // יִתְלַבְּשוּ - נסתרים (הם)
if(m=word.match(/^ית(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // תִּתְלַבֵּשְנָה - נסתרות (הן)
if(m=word.match(/^תת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
//ציווי
 // - - מדבר (אני)
//-
 // הִתְלַבֵּש - נוכח (אתה)
if(m=word.match(/^הת(.+)$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבְּשִי - נוכחת (את)
if(m=word.match(/^הת(.+)י$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתר (הוא)
//-
 // - - נסתרת (היא)
//-
 // - - מדברים (אנו)
//-
 // הִתְלַבְּשוּ - נוכחים (אתם)
if(m=word.match(/^הת(.+)ו$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // הִתְלַבֵּשְנָה - נוכחות (אתן)
if(m=word.match(/^הת(.+)נה$/))word_ambis.push(m[1].replace(/(.+)(.)$/,'ה$1י$2'))
 // - - נסתרים (הם)
//-
 // - - נסתרות (הן)
//-

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
