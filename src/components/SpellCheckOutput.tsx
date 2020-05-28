import labeledParagraph from '../utils/Labeler';
import React from 'react';
import './SpellCheckOutput.css';

export interface ISCOutProps {
	original: string;
	corrected: string;
}

export const SpellCheckOutput : React.FC<ISCOutProps> = ({original, corrected} : ISCOutProps) : JSX.Element => {
	return (
		<div className='output'>
			{labeledParagraph(original, corrected)}
		</div>
	);
}