import React from 'react';

const Header = ({ courseName }: {courseName: string}) => {
  return <h1>{courseName}</h1>
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseExtended {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseExtended {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part } : {part: CoursePart}) => {
  switch(part.type){
      case "normal":
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            {part.description}
          </p>
        )
      case "groupProject":
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            project exercises {part.groupProjectCount}
          </p>
        )
      case "submission":
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br/>
            {part.description}
            submit to {part.exerciseSubmissionLink}
          </p>
        )
        case "special":
          return (
            <p>
              <b>{part.name} {part.exerciseCount}</b>
              <br/>
              {part.description}
              <br/>
              required skills:  {part.requirements.join(',')}
            </p>
          )
      default:
        return assertNever(part);
  }
};

const Content = ({ courseParts } : {courseParts: CoursePart[]}) => {
  return (
     <div>
       {courseParts.map((p,id) => <Part key={id} part={p}/> )}
    </div>
  )
};

const Total = ({ courseParts } : {courseParts: CoursePart[]}) => {
  return (
    <div>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
  
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;