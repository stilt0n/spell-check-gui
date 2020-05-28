import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import spellcheck from '../utils/SpellingCorrector';
import {SpellCheckOutput} from '../components/SpellCheckOutput';
import {UserInput} from '../components/UserInput';
import About from '../components/About';


const App : React.FC = () : JSX.Element => {
	const [inputText, setInputText] = useState('korrectud');

	const handleInputTextChange = (e : React.ChangeEvent<HTMLInputElement>) => {
		setInputText(e.target.value);
	}

	return (
		<div className='App'>
			<div className='main'>
				<h1 className='description'> Type something to get a correction </h1>
				<div className='correction'>
					<SpellCheckOutput original={inputText} corrected={spellcheck(inputText)} />
				</div>
				<UserInput onChangeHandler={handleInputTextChange} text={inputText}/>
			</div>
			<About />
		</div>
	);
}

export default App;