import React from 'react';

interface TotalProps {
    exerciseCount: number;
}

const Total: React.FC<{ courseParts: TotalProps[] }> = ({ courseParts }) => {
    return <>
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry: number, part) => carry + part.exerciseCount, 0)}
        </p>
    </>
}

export default Total;