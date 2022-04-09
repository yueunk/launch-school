"use strict";

function generateClassRecordSummary(scores) {
  return {
    studentGrades: gradesSummary(scores),
    exams: examSummary(scores),
  };
}

function gradesSummary(scores) {
  let grades = [];

  Object.keys(scores).forEach(student => {
    let score = scores[student].scores;
    grades.push(formatGrade(weighted(score), letterGrade(weighted(score))));
  });

  return grades;
}

function formatGrade(score, letter) {
  return `${score} (${letter})`;
}

function letterGrade(score) {
  if (score < 60) return 'F';
  else if (score < 69) return 'E';
  else if (score < 77) return 'D';
  else if (score < 85) return 'C';
  else if (score < 93) return 'B';
  else return 'A';
}

function weighted(score) {
  const EXAM_WEIGHT = 0.65;
  const EXERCISE_WEIGHT = 0.35;

  let examScores = score.exams;
  let weightedExamScore = avg(examScores) * EXAM_WEIGHT;

  let exerciseScoreArr = score.exercises;
  let weightedExerciseScore = sum(exerciseScoreArr) * EXERCISE_WEIGHT;

  return Math.round(weightedExamScore + weightedExerciseScore);
}

function avg(arr) {
  return sum(arr) / arr.length;
}

function sum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

function examSummary(scores) {
  let studentExamScores = [];
  Object.keys(scores).forEach(student => {
    studentExamScores.push(scores[student].scores.exams);
  });

  let eachExamScores = rowToCol(studentExamScores);
  return eachExamScores.map(eachSet => {
    return {
      average: avg(eachSet),
      minimum: Math.min(...eachSet),
      maximum: Math.max(...eachSet),
    };
  });
}

function rowToCol(nestedArr) {
  let result = [];

  for (let idx = 0; idx < nestedArr[0].length; idx += 1) {
    nestedArr.forEach(subarr => {
      if (result[idx] === undefined) result[idx] = [subarr[idx]];
      else result[idx].push(subarr[idx]);
    });
  }

  return result;
}

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

generateClassRecordSummary(studentScores);