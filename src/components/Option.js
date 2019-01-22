import React from 'react';

export const Option = ({name, onClick, highlighted}) => (
    <li onClick = {onClick} className={(highlighted?'highLighted':'') + ' option'}>
        {name}
    </li>
)