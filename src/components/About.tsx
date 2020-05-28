import React from 'react';
import './About.css';

const About = () : JSX.Element => {
	return (
		<div className='about'>
			<h1> About this App: </h1>
			<p className='info-card'> This app is a front-end adaptation of <a href='https://norvig.com/spell-correct.html'> Peter Norvig's Python spell check. </a>
			I found his post a while ago and thought it was really cool how little code you need to write in order to write a simple spelling
			corrector.  I wanted to see if I could use modern JavaScript to write a similarly small spelling corrector, <a href='https://github.com/stilt0n/Spell-Check'>
			which I have here.</a> This is currently a remake of that spelling corrector in TypeScript and with an added React front-end to make it
			a little nicer to interact with.
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
			Then there are some improvements to the actual correction that would be fun to make.  This version is extremely simple in that it only corrects 
			a single word.  It will only make up to two edits, and it assumes that any valid edit with edit distance <em>n</em> is infinitely more likely than
			a valid edit with edit distance <em>n + 1.</em>  I think some of these assumptions can be relaxed by adding a language model.  For example you could
			use a trigram language model, find all edits to a word with edit distance less than 3 and then choose the corrected version of your sentence that minimizes
			the sentence's perplexity according to your trigram model.  This would also give you the ability to assess if a word is mispelled or simply an unknown
			word.<br/><br/>
			I guess the style could use some work too...</p>
		</div>
	);
}

export default About;