// sentences problem
// $str = 'Fry me a Beaver. Fry me a Beaver! Fry me a Beaver? Fry me Beaver no. 4?! Fry me many Beavers... End';
// $sentences = preg_split('/(?<=[.?!])\s+(?=[a-z])/i', $str);
// print_r($sentences);
//

// i look here: http://www.safa-ivrit.org/  and try to make rulles from it

/*
 this function goes overs an array of words. and converts every each word into an array of ambiguations.
 each subfunction processes the whole word array for each word and appends ambiguations to bottom of array.
*/

function lemmafilter(sentencewords)
{
 for(var i=0;i<sentencewords.length;i++)
 {
  var word_ambis=[];word_ambis.push(sentencewords[i]);
  
  unverb(word_ambis);
  ungender(word_ambis);
  unplural(word_ambis);
  
  sentencewords[i]=word_ambis.join('|');
 }
 
 return sentencewords;
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
