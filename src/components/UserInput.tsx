import React from 'react';
import './UserInput.css';

export interface IUIProps {
	onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	text: string;
}

export const UserInput : React.FC<IUIProps> = (props : IUIProps) : JSX.Element => {
	return (
		<div className='user-input'>
			<h2 id='input-label'> Input word here: </h2>
			<input type='text' onChange={props.onChangeHandler} value={props.text} />
		</div>
	);
}