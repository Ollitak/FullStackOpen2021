import React from 'react';

const Header = ({ courseName }: {courseName: string}) => {
  return <h1>{courseName}</h1>
};

interface contentProps {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts } : {courseParts: contentProps}) => {
  return (
    <div>
      {courseParts.name} {courseParts.exerciseCount}
    </div>
  )
};

const Total = ({ courseParts } : {courseParts: contentProps[]}) => {
  return (
    <div>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
  
}

const App = () => {
  const courseName = "HalfStack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts[0]}/>
      <Content courseParts={courseParts[1]}/>
      <Content courseParts={courseParts[2]}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;