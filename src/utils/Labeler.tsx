import React from 'react';
/*
This is a utility class to label different portions of a spell-checked words.  Right now it just shows
where the corrected word and original word do and don't align.  It doesn't highlight corrections made.

Ideally I'd like to add an extra color (probably some light grey) to show where deletions are made and
update to algorithm so that instead of showing alignment, it shows corrections.  In this case, we actually
need to check if a fix was made insertion.  For example realy => really is adding an extra l, but the y is not
a correction.  At the moment we'd get the output: 

<span style={{color : 'black'}}>real</span><span style={{color: 'red'}}>ly</span>

That's not really the output we want though.  This seems pretty obviously solvable using DP. It'll be some small modification
to an edit distance algorithm, so I will probably get to fixing it soon.  Right now I'm trying to focus on practicing React 
with TypeScript and it doesn't seem like fixing this will further those goals.
*/

interface IWordColorMap {
	word : string;
	wordColor : object;
}

const label = (original : string, corrected : string) : Array<IWordColorMap> => {
	const wcSegments : Array<IWordColorMap> = [];
	
	let currentSegment : IWordColorMap = {
		word: corrected[0],
		wordColor: original[0] === corrected[0] ? {color: 'black'} : {color: 'red'}
	};

	for(let i = 1; i < corrected.length; ++i) {
		if(original.length <= i || original[i] !== corrected[i]) {
			
			if(currentSegment.wordColor === {color: 'red'}) {
				currentSegment.word = currentSegment.word + corrected[i];
			} else {
				wcSegments.push(currentSegment);
				currentSegment = {
					word: corrected[i],
					wordColor: {color: 'red'}
				};
			}

		} else {

			if(currentSegment.wordColor === {color: 'black'}) {
				currentSegment.word = currentSegment.word + corrected[i];
			} else {
				wcSegments.push(currentSegment);
				currentSegment = {
					word: corrected[i],
					wordColor: {color: 'black'}
				}
			}

		}
	}

	wcSegments.push(currentSegment);

	return wcSegments;
}

const toJSX = (wcmap : Array<IWordColorMap>) : JSX.Element => {
	return (
		<p className='correction'>
			{wcmap.map(wcpair => <span style={wcpair.wordColor}>{wcpair.word}</span>)}
		</p>
	);
}

const labeledParagraph =(original : string, corrected : string) : JSX.Element => {
	return toJSX(label(original, corrected));
}

export default labeledParagraph;