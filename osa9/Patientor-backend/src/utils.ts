/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry, EntryWithoutId, EntryType, HealthCheckRating, SickLeave, Discharge } from './types/patient';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (dateOfBirth: unknown): string => {
  if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date");
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown): EntryType => {
  if(!type || !isType(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const parseDiagnosisCode = (code: unknown): string => {
  if(!code || !isString(code)) {
    throw new Error("Incorrect or missing code");
  }
  return code;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
  if(!diagnosisCodes) {
    return undefined;
  }

  if(!Array.isArray(diagnosisCodes)) {
    throw new Error("Not an array");
  }

  const mappedCodes = diagnosisCodes.map(code => {
    return parseDiagnosisCode(code);
  });

  return mappedCodes;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(!rating || !isHealthCheckRating((rating))){
    throw new Error("Incorrect or missing healthcheckrating");
  }
  return rating;
}; 

const parseEmployerName = (employer: unknown): string => {
  if(!employer || !isString(employer)) {
    throw new Error("Incorrect or missing code");
  }
  return employer;
};

const isSickLeave = (startDate: unknown, endDate: unknown): SickLeave => {
  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate)
  };
};


const parseSickleave = (sickLeave: any): SickLeave | undefined =>  {
  if(!sickLeave) {
    return undefined;
  }
  return isSickLeave(sickLeave.startDate, sickLeave.endDate);
};

const parseCriteria = (criteria: unknown): string => {
  if(!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing code");
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  if(!discharge) {
    throw new Error("Discharge missing");
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  };
};


export const toNewEntry = (entry: any): EntryWithoutId => {
  const base = {
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    type: parseType(entry.type),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
  };

  switch(entry.type){
    case "HealthCheck":
      return {
        ...base,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        ...base,
        type: EntryType.OccupationalHealthcare,
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickleave(entry.sickLeave)
      };
    case "Hospital":
      return {
        ...base,
        type: EntryType.Hospital,
        discharge: parseDischarge(entry.discharge)
      };
    default:
      // should not go here as the type is validated before switch-block
      throw new Error("switch case defaulted");
  }
};

export default toNewPatientEntry;