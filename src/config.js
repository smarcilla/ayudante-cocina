export const EXAM_CONFIG = {
  blocks: {
    default: [
      { id: "general", label: "Parte General", numQuestions: 28 },
      { id: "especifico", label: "Parte Específica", numQuestions: 32 },
    ],
  },
  timeMinutes: {
    default: 60,
    options: [30, 60, 90, 115],
  },
  penalty: {
    default: 0.33,
    options: [0, 0.25, 0.33, 0.5],
  },
};
