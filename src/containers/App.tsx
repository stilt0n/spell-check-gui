import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import {correction} from '../utils/SpellingCorrector';
import {SpellCheckOutput} from '../components/SpellCheckOutput';
import {UserInput} from '../components/UserInput';
import About from '../components/About';
import  bigramChecker from '../experimental/NgramCorrection';

interface IJSXFunctionMap {
	[index: string] : () => JSX.Element;
}

const App : React.FC = () : JSX.Element => {
	const [inputText, setInputText] = useState('korrectud');
	const [version, setVersion] = useState('simple');

	const handleInputTextChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
		setInputText(e.target.value);
	}

	const handleVersionChange = () : void => {
		if(version === 'simple') {
			setVersion('experimental');
		} else {
			setVersion('simple');
		}
	}

	const renderSimple = () : JSX.Element => {
		return (
			<div className='main'>
				<h1 className='description'> Type something to get a correction </h1>
				<div className='correction'>
					<SpellCheckOutput original={inputText} corrected={correction(inputText)} />
				</div>
				<UserInput onChangeHandler={handleInputTextChange} text={inputText}/>
			</div>
		);
	}

	const renderExperimental = () : JSX.Element => {
		return (
			<div className='main'>
				<h1 className='description'> Type something to get a correction </h1>
				<div className='correction'>
					<SpellCheckOutput original={inputText} corrected={bigramChecker.predict(inputText)} />
				</div>
				<UserInput onChangeHandler={handleInputTextChange} text={inputText}/>
			</div>
		);	
	}
	
	const renderMap : IJSXFunctionMap = {
		'simple' : renderSimple,
		'experimental' : renderExperimental
	};

	return (
		<div className='App'>
			{renderMap[version]()}
			<div className='version'>
				<p className='version-info'>{`Spelling Correction Version: ${version}`}</p>
				<button className='version-button' onClick={handleVersionChange}>switch version</button>
			</div>
			<About />
		</div>
	);
}

export default App;