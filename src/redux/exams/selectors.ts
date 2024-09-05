export const selectAllExams = (state: any) => state.exams.exams;
export const selectIsExamsFetched = (state: any) => state.exams.examsFetched;
export const selectActiveExamLoadTime = (state: any) =>
  state.exams.activeExamLoadTime;
