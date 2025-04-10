const Settings = {
  api: {
    urlEncode: "application/x-www-form-urlencoded",
    getEditInitiative: "/editInitiative/getEditInitiative",
    getPeriods: "/acctselect/getAcctSelect",
    updateInitiative: "/editInitiative/getUpdateInitiative",
    deleteInitiative: "/editInitiative/getDeleteInitiative",
  },
  fieldLabels: {
    initiativeName: "Initiative Name: ",
    responsible: "Responsible: ",
    initiativeYear: "Initiative Year: ",
    revenueStream: "Revenue Stream: ",
    initiativeAction: "Initiative/Action: ",
    objective: "Objective: ",
    executionPlan: "Execution Plan: ",
    resultsLearnings: "Results/Learnings: ",
    additionalComments: "Additional Comments: ",
  },
  toolTips: {
    responsible:
      "Which Marriott contact is responsible/accountable for this specific initiative?",
    initiativeYear: "What is the date of the initiation of the initiative?",
    executionPlan:
      "List Individual Task Names and dates, Team members responsible and task descriptions here.",
  },
  btnLabels: {
    update: "Update",
    delete: "Delete",
    close: "Close",
  },
  alert: {
    loading: "Please wait loading...",
    initiativeNameBlankAlert: "Inititative Name is a required fielid",
    charExceedingAlert: "You are allowed to enter up to 1024 characters.",
    charExceedingAlertOnUpdate: "text cannot exceed 1024 characters.",
  },
  editAccInitiativeActionParam: "AccountPerspective",
};
export default Settings;
