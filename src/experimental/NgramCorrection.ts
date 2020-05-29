import {correction, allCandidates} from '../utils/SpellingCorrector';
import {dataString} from './dataString';
import {ILanguageModel, LanguageModel} from './NgramModel';

type correctionFinder = (word: string) => Array<string>;
type backupSpellCheck = (word: string) => string;

interface LanguageModelSpellChecker {
	predict : (sentence : string) => string;
}

class BigramSpellChecker implements LanguageModelSpellChecker {
	
	private lm : ILanguageModel;
	private findCorrections : correctionFinder;
	private fallbackCorrection : backupSpellCheck;

	constructor(trainingString : string, findCorrections : correctionFinder, fallbackCorrection : backupSpellCheck) {
		this.lm = new LanguageModel(2, true);
		this.findCorrections = findCorrections;
		this.fallbackCorrection = fallbackCorrection;
		this.lm.train(trainingString);
	}

	// To avoid excess load times, I'm assuming all words but the last word are correct
	// guaranteeing the optimal spelling correction involves checking every arrangment
	// of corrections for each word.  There's likely a way to avoid this with using DP, 
	// beam search or both.
	predict(sentence : string) : string {
		sentence = '<s> ' + sentence;
		
		const sentenceArr = sentence.split(' ');
		const indexOfLastWord = sentenceArr.length - 1;
		
		const prefix = sentenceArr.slice(0,indexOfLastWord).join(' ');
		const predictWord = sentenceArr[indexOfLastWord];
		
		const candidates = this.findCorrections(predictWord);
		let bestCandidate : string | undefined = undefined;
		let bestProbability = 0;
		for(let candidate of candidates) {
			let currentScore = this.lm.score(`${prefix} ${candidate}`);
			if(bestProbability < currentScore) {
				bestCandidate = candidate;
				bestProbability = currentScore;
			}
		}

		if(bestCandidate) {
			return bestCandidate;
		} else {
			// Since the language model uses UNK tokens and laplace smoothing, it's highly unlikely this case happens
			console.log('WARN: used fallback correction because all probabilities were zero');
			console.log('WARN: using fallback correction is likely indicative of an error in the lm class');
			return this.fallbackCorrection(predictWord);
		}
	}
}

const bigramChecker = new BigramSpellChecker(dataString, allCandidates, correction);

export default bigramChecker;