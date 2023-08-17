import { JobStatus } from '../../enums/candidate.enum';

export const getFilter = (startDate: string, stopDate: string) => {
  //get current interval filter
  if (!startDate && !stopDate) {
    return {
      dateFilter: {},
      filter: {},
      previousDateFilter: {},
      previousFilter: {},
    };
  }
  const dateFilter = {
    createdAt: {
      $gte: startDate as string,
      $lte: stopDate as string,
    },
  };

  const filter = { ...dateFilter, jobStatus: JobStatus.HIRED };

  // current dates
  let start = new Date(startDate as string);
  let stop = new Date(stopDate as string);

  //@ts-ignore
  let interval = stop - start;
  //@ts-ignore
  const prevDate = start - interval;
  // previous date interval
  //@ts-ignore
  let previousStart = new Date(prevDate).toISOString();
  let previousStop = start.toISOString();

  // previous date filter
  const previousDateFilter = {
    createdAt: {
      $gte: previousStart as string,
      $lt: previousStop as string,
    },
  };

  // date of hire filter
  const previousFilter = {
    hiredAt: {
      $gte: previousStart as string,
      $lt: previousStop as string,
    },
  };

  return { dateFilter, filter, previousDateFilter, previousFilter };
};

export interface IPercent {
  numberOfCandidates: number;
  numberOfHires: number;
  prevNumberOfCandidates: number;
  prevNumberOfHires: number;
}

export const getPercent = (values: IPercent) => {
  //candidate percent increase or decrease
  let candidatePercent =
    ((values.numberOfCandidates - values.prevNumberOfCandidates) /
      values.prevNumberOfCandidates) *
    100;

  //hire percent increase or decrease
  let hirePercent =
    ((values.numberOfHires - values.prevNumberOfHires) /
      values.prevNumberOfHires) *
    100;

  console.log(hirePercent, candidatePercent);

  if (candidatePercent === Infinity) {
    candidatePercent = 0;
  }

  if (hirePercent === Infinity) {
    hirePercent = 0;
  }

  return { candidatePercent, hirePercent };
};
