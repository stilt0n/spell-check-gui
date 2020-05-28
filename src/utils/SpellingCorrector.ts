/*
This is basically just a TypeScript translation of Peter Norvig's 
spelling correction blog post here: 

norvig.com/spell-correct.html

An interesting future expansion would be to add a language model
to this spelling correction system.  At the moment the goal is to
get more practice with TypeScript and React though.

Another note:

One of the fun things about norvig's post was demonstrating how few
lines of code you need to write a very simple spellchecker.  When I
decided to write a version of the spelling corrector in JavaScript
my main goal was to see if I could keep my code as small as Norvig's
Python version.  There are probably a ton of more readable ways to
write this code.  The intent of this project is more to be as faithful
to the original Python as possible though, so readability is less of a
concern.  In that sense, it's kind of silly to remake it in typescript
*/

// The Node.js version I made reads big.txt as a file.  But you can't do this from the browser.
// I could also make a server just for this purpose, but that seems like a lot of extra effort
// so I'm just importing the whole file in string form.
import {bigtxt_string} from './bigtxt_templateString';
const _ = require('lodash');
// for old non-browser version // const fs = require('fs');

// WORDS would be a Counter object in Python.  This interface basically just encodes that fact
interface ICounter {
	[index: string] : number;
}

// From what I can tell it seems like this method might be too new to work well with TS types
// The typing for it should be (text : string) => Array<string>
const getWords = (text : any) => [...text.matchAll(/\w+/g)];
//the words in big.txt and their frequency
// original // const WORDS : ICounter = _.countBy(getWords(fs.readFileSync('big.txt').toString().toLowerCase()));
const WORDS : ICounter = _.countBy(getWords(bigtxt_string.toLowerCase()));
//count number of words in big.txt
const N : number = Object.values(WORDS).reduce((total : number, wordCount : number) => total + wordCount);
//calculate the probability of the word
const P = (word : string) : number => (WORDS[word] ? WORDS[word] : 0) / N;
//find and return the candidate with the highest probability
const correction = (word : string) : string => candidates(word).reduce((best, cur) => best = P(cur) > P(best) ? cur : best, word);
//if word is known assume it's correct, otherwise check edits and then if no valid edits, assume word
const candidates = (word : string) : Array<string> => known([word]) || known(edits1(word)) || known(edits2(word)) || [word];
//check if the word exists in our language corpus
const known = (words : Array<string>) => {
	let k = words.filter(w => WORDS[w]);
	return k.length ? k : false;
}
//Edit operations --
const findSplits = (word : string) : Array<Array<string>> => {
	let s = [];
	for(let i = 0; i < word.length + 1; i++) {
		s.push([word.slice(0,i), word.slice(i)]);
	}
	return s;
}

const findReplaces = (splits : Array<Array<string>>, letters : Array<string>) : Array<string> => {
	let r = []
	for (let s of splits) {
		if(s[1]) {
			for(let l of letters) {
				r.push(s[0] + l + s[1].slice(1));
			}
		}
	}
	return r;
}

const findInserts = (splits : Array<Array<string>>, letters : Array<string>) : Array<string> => {
	let i = [];
	for(let s of splits) {
		for(let l of letters) {
			i.push(s[0] + l + s[1]);
		}
	}
	return i;
}
//--
//return all possible edits of distance one
const edits1 = (word : string) : Array<string> => {
	const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
	let splits = findSplits(word);
	let deletes = splits.filter(s => s[1]).map(s => s[0] + s[1].slice(1));
	let transposes = splits.filter(s => s[1].length > 1).map(s => s[0] + s[1][1] + s[1][0] + s[1].slice(2));
	let replaces = findReplaces(splits, letters);
	let inserts = findInserts(splits, letters);
	return [...deletes, ...transposes, ...replaces, ...inserts];
}
//all possible edits of distance two
const edits2 = (word : string) : Array<string> => _.flatten(edits1(word).map(w => edits1(w)));

export default correction;