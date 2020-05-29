/* This trains a Ngram Language Model to use for more
advanced spelling correction

Since this language model is just for spelling correction
it doesn't have any methods for generating sentences
*/

import {Counter, ICounter} from './CounterUtility';
const _ = require('lodash');

const preprocess = (counts : ICounter, sentence : string) : string => sentence.split(' ').map(w => counts.count(w) > 1 ? '<UNK>' : w).join(' ');

const preprocessSentences = (counts : ICounter, sentences : Array<string>) : Array<string> => sentences.map(s => preprocess(counts, s));

const getNgrams = (sentences : Array<string>, n : number) : Array<string> => {
	const ngrams = [];
	for(let sentence of sentences) {
		if(sentence.length) {
			let words = sentence.split(' ');
			for(let i = 0; i < words.length - n + 1; ++i) {
				ngrams.push(words.slice(i, i+n).join(' '));
			}
		}
	}
	return ngrams;
}


export interface ILanguageModel {
	train(file_as_string : string) : void;
	score(sentence : string) : number;
}

export class LanguageModel {
	private n : number;
	private useLaplace : boolean;
	private ngramCounts : ICounter;
	private minusOneCounts : ICounter | number;
	private wordCounts : ICounter;

	constructor(n : number, useLaplace : boolean) {
		this.n = n;
		this.useLaplace = useLaplace;
		this.ngramCounts = new Counter();
		this.minusOneCounts = n > 1 ? new Counter() : 0;
		this.wordCounts = new Counter();
	}

	train(file_as_string : string) : void {
		let sentences = file_as_string.split('\n');

		this.wordCounts.update(_.flatten(sentences.map(sentence => sentence.split(' '))));
		sentences = preprocessSentences(this.wordCounts, sentences);

		this.ngramCounts.update(getNgrams(sentences, this.n));
		if(typeof this.minusOneCounts !== 'number') {
			this.minusOneCounts.update(getNgrams(sentences, this.n - 1));
		} else {
			// the denominator for our probability is the word count if n is 1
			this.minusOneCounts = Object.values(this.wordCounts).reduce((sum, cur) => sum + cur, 0);
		}
	}

	score(sentence : string) {
		let p = 0;
		// handles all cases but unigrams
		if(typeof this.minusOneCounts !== 'number') {
			sentence = preprocess(this.wordCounts, sentence);
			let ngrams = getNgrams([sentence], this.n);
			let minusOne = getNgrams([sentence], this.n - 1);
			let addNumerator = this.useLaplace ? 1 : 0;
			let addDenominator = this.useLaplace ? this.minusOneCounts.length() : 0;
			for(let i = 0; i < ngrams.length; ++i) {
				let numerator = this.ngramCounts.count(ngrams[i]) + addNumerator;
				let denominator = this.minusOneCounts.count(minusOne[i]) + addDenominator;
				if(numerator === 0 || denominator === 0) {
					return 0;
				} else {
					p += Math.log(numerator/denominator);
				}
			}
		} else {
			sentence = preprocess(this.wordCounts, sentence);
			let unigrams = sentence.split(' ');
			let addNumerator = this.useLaplace ? 1 : 0;
			let addDenominator = this.useLaplace ? this.ngramCounts.length() : 0;
			for(let word of unigrams) {
				let numerator = this.ngramCounts.count(word) + addNumerator;
				let denominator = this.minusOneCounts + addDenominator;
				if(numerator === 0 || denominator === 0) {
					return 0;
				} else {
					p += Math.log(numerator/denominator);
				}
			}
		}

		return p;
	}

}