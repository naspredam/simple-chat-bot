import React, { useState } from 'react';
import './interactionField.less';

interface InteractionFieldProps {
    readonly setNewPostInput: (postText: string) => void;
}

export const InteractionField = ({ setNewPostInput }: InteractionFieldProps) => {
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <>
            <div className={'interaction-field-content'}>
                <input className={'interaction-field'}
                       type={'text'}
                       value={inputValue}
                       onKeyDown={({ key }) => {
                           if(key === 'Enter') {
                               setNewPostInput(inputValue);
                               setInputValue('');
                           }
                       }}
                       onChange={({target}) => setInputValue(target.value)}/>
            </div>
        </>
    );
}