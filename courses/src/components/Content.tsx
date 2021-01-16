import React from 'react';

interface ContentProps {
    name: string;
    exerciseCount: number;
}

const Content: React.FC<{courseParts: ContentProps[]}> = ({ courseParts }) => {
    return <>
        {courseParts.map(part => (
            <p key={part.name}>{part.name} {part.exerciseCount}</p>
        ))}
    </>
}

export default Content;