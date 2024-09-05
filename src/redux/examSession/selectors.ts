export const selectIsLoading = (state: any) => state.examSession.isLoading;

export const selectUserSession = (state: any) => state.examSession.userSession;
export const selectIpAddress = (state: any) =>
  state.examSession.userSession.ipaddress;
export const selectIsActiveSession = (state: any) =>
  state.examSession.isActiveSession;

export const selectIsTerminal = (state: any) =>
  state.examSession.isTerminalPage;
export const selectIsLoadingTerminal = (state: any) =>
  state.examSession.isLoadingTerminal;
export const selectErrorTerminalRequest = (state: any) =>
  state.examSession.errorTerminalReq;

export const selectCheckAllResult = (state: any) =>
  state.examSession.allResultTask;
export const selectScoreCheckResult = (state: any) =>
  state.examSession.examScore;

export const selectOneTaskResultRequest = (state: any) =>
  state.examSession.oneResultTask;
export const selectActiveSetsExamIndex = (state: any) =>
  state.examSession.activeSetsExamIndex;

export const isFetchDescripAndSolution = (state: any) =>
  state.examSession.isFetchDescripAndSolution;
export const selectDecsriptionsExam = (state: any) =>
  state.examSession.decsriptions.tasks;
export const selectSolutionsExam = (state: any) =>
  state.examSession.solutions.solutions;

export const selectTaskData = (state: any) => state.examSession.taskData;
