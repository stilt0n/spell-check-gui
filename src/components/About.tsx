import React from 'react';
import './About.css';

const About = () : JSX.Element => {
	return (
		<div className='about'>
			<h1> About this App: </h1>
			<p className='info-card'> This app is a front-end adaptation of <a href='https://norvig.com/spell-correct.html'> Peter Norvig's Python spelling corrector. </a>
			I found his post a while ago and thought it was really cool how little code you need to write in order to write a simple spelling
			corrector.  I wanted to see if I could use modern JavaScript to write a similarly small spelling corrector, <a href='https://github.com/stilt0n/Spell-Check'>
			which I have here.</a> This is currently a remake of that spelling corrector in TypeScript and with an added React front-end to make it
			a little nicer to interact with.
			<br/><br/>
			There are currently two spelling correction versions:<br/><br/>
			The simple version is the original Norvig spelling corrector (adapted to TypeScript).  You can see Norvig's post for more detail on how it works.
			A quick summary of how it works: given a word, if the word matches a word in your corpus, you're done.  If not, check any word within edit distance
			1.  If any such words exist in your corpus, choose the most common one.  If not, repeat for edit distance 2.  If no words exist within this distance
			then throw up your hands and assume the user knew what they were doing.
			<br/><br/>
			The experimental version finds every valid word within edit distance 2.  Then it uses a bigram language model which I trained on three classics from 
			<a href='https://www.gutenberg.org/'>project gutenberg</a> to decide the most probable correction given the previous words.  Right now the model only
			corrects the final word in your sentence and assumes all other words are correct.  If a previous word is mispelled, the model should still work since
			it incorporates UNK tokens for unknown words, but it's likely to hurt the prediction.  The model also makes use of sentence begin tokens so even when
			it is evaluating a single word, the correction should sometimes be different from the simple corrector's because the probability that the correction
			starts a sentence is taken into account.  I've called the version 'experimental' because I haven't done much to test its output.  The code compiles
			and seems not to crash, but I haven't had time to check that the results are what you'd expect.
			</p>
			<br/><br/>
			<h2> Plans for Improvement </h2>
			<p className='info-card'> I have a few plans to improve the app.  Right now I've been focusing on learning TypeScript/React and so it didn't seem immediately
			useful to implement these improvements straight away.  First: currently my front-end highlights spelling corrections by looking at where
			the alignment between the original and the corrected versions differ and assuming that is due to correction.  This is, of course, not
			really true.<br/><br/>
			For example, my app will highlight the correction speling => spelling as:<br/><br/> 
			<em className='about-example'>spel<span style={{color:'red'}}>ling</span></em><br/><br/>
			but the actual correction that took place was inserting an extra 'l'.  So a more accurate highlight would be:<br/><br/>
			<em className='about-example'>spel<span style={{color:'red'}}>l</span>ing</em><br/><br/>

			One way to solve this would be to keep track of what corrections are being made when they happen.  I think another approach would likely be 
			some sort of a modification of an edit distance algorithm. <br/><br/>
			There will probably be some more changes made to the language model corrector in the near future.  At moment I haven't had the chance to
			test the model much.  I also think it would cool to have it correct the whole sentence, but I haven't gotten around to that yet.</p>
		</div>
	);
}

export default About;