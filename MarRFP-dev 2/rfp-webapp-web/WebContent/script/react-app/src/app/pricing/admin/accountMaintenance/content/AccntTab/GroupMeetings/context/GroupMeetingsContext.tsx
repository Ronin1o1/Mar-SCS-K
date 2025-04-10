import React, { useContext, useState } from "react";
import AccountListContext from "../../../../context/AccountListContext";
import API from "../service/Api";
//import Utils from "../../../../../utils/Utils";
import Settings from "../static/Settings";
//import ReactDOM from "react-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../../../../../common/components/ApplicationContext";

const GroupMeetingsContext = React.createContext({});

export const GroupMeetingsContextProvider = (props) => {
  const accountContext = useContext(AccountListContext);
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [emptyDataAlert, setEmptyDataAlert] = useState(false);

  const prepareQuestions = (limit, max_len) => {
    const questionData = [];
    for (let i = 0; i < limit; i++) {
      questionData.push({
        question_id: 0,
        question_seq: i + 1,
        question: "",
        edie_column_label: "",
        typedescription: "Free Form",
        typeid: "1",
        hasrecs: "N",
        max_len: max_len,
        customAnswers: null,
        ansEdited: null,
      });
    }
    return questionData;
  };

  const [state, setState] = useState({
    formChgStatus: false,
    specificQuestionsData: {
      accountSpecQuestions: [
        {
          question_id: null,
          question_seq: null,
          question: null,
          edie_column_label: null,
          typedescription: null,
          typeid: null,
          hasrecs: null,
          max_len: null,
          customAnswers: null,
          ansEdited: null,
        },
      ],
      selectedSpecificQues: {
        question_id: null,
        question_seq: null,
        question: null,
        edie_column_label: null,
        typedescription: null,
        typeid: null,
        hasrecs: null,
        max_len: null,
        customAnswers: ["", "", "", "", "", ""],
        ansEdited: null,
      },
      selectedSpecificQuesList: [
        {
          question_id: null,
          question_seq: null,
          question: null,
          edie_column_label: null,
          typedescription: null,
          typeid: null,
          hasrecs: null,
          max_len: null,
          customAnswers: null,
          ansEdited: null,
        },
      ],
      max_questions: 30,
      accountInfo: {
        accountid: null,
        accountname: "ABB",
        accountpricingtype: "C",
        accountrecid: 284425,
        accounttypedescription: null,
        duedate: null,
        groupmeetings: "N",
        hotel_display: "N",
        period: 2022,
        top_account: "N",
        strAccountrecid: "284425",
      },
      initialData: prepareQuestions(30, ""),
      questionsListData: prepareQuestions(30, null),
      questionsTypeList: [
        {
          typeid: null,
          typedescription: null,
        },
      ],
      initialAnswerList: ["", "", "", "", "", ""],
      editAnswerList: ["", "", "", "", "", ""],
      selectedAnswer: {
        id: null,
        value: null,
      },
    },
    fileUpload: {
      placeholder: "No files selected",
      id: "fileId",
      title: "Import Account Group Meetings Questions",
    },
    selectedFileupload: {
      placeholder: "No files selected",
      id: "fileId",
      title: "Import Account Group Meetings Questions",
      //  title : "Import Account Group Meetings Group Questions"
    },
    blankQueObj: {
      question_id: 0,
      question_seq: 1,
      question: "",
      edie_column_label: "",
      typedescription: "Free Form",
      typeid: "1",
      hasrecs: "N",
      max_len: "",
      customAnswers: null,
      ansEdited: null,
    },
    isDataChanged: false,
    showScreenLoader: false,
    showModal: false,
    isEnabled: true,
    selectedTypeId: "1",
    grpMtgQn: "N",
    formChg: "N",
    isImportButtonClicked: false,
    isDataTypeClicked: false,
    isEditClicked: false,
    isLoading: false,
    selectedFile: null,
    spinnerFlag: true,
    spinner: true,
  });
  const [showScreenLoader, setShowScreenLoader] = useState(false);

  // const accountListContext = useContext(AccountListContext)

  const setQuestionsData = (
    data: any,
    closeModal?: boolean,
    isInitialLoad?: boolean
  ) => {
    isInitialLoad = isInitialLoad ? isInitialLoad : false;
    const stateData = { ...state };
    const questionsInitialData = isInitialLoad
      ? prepareQuestions(data.max_questions, "")
      : [...state.specificQuestionsData.initialData];

    questionsInitialData.map((d, index) => {
      if (index < data.accountSpecQuestions.length) {
        if (
          questionsInitialData[index].question_seq ==
          data.accountSpecQuestions[index].question_seq
        ) {
          //set it from api data
          data.accountSpecQuestions[index].edie_column_label =
            data.accountSpecQuestions[index].edie_column_label == null
              ? ""
              : data.accountSpecQuestions[index].edie_column_label;
          data.accountSpecQuestions[index].question =
            data.accountSpecQuestions[index].question == null
              ? ""
              : data.accountSpecQuestions[index].question;
          data.accountSpecQuestions[index].max_len =
            data.accountSpecQuestions[index].max_len == null
              ? ""
              : data.accountSpecQuestions[index].max_len;

          questionsInitialData[index] = data.accountSpecQuestions[index];
        }
      } else {
        //reset other questions
        questionsInitialData[index].question = "";
        questionsInitialData[index].edie_column_label = "";
        questionsInitialData[index].max_len = "";
        questionsInitialData[index].question_id = 0;
        questionsInitialData[index].typedescription = "Free Form";
        questionsInitialData[index].typeid = "1";
        questionsInitialData[index].hasrecs = "N";
        questionsInitialData[index].customAnswers = null;
      }
    });

    setState({
      ...state,
      specificQuestionsData: {
        ...state.specificQuestionsData,
        initialData: questionsInitialData,
        questionsListData: questionsInitialData,
        selectedSpecificQuesList: questionsInitialData,
        max_questions: data.max_questions,
        accountInfo: data.accountInfo,
        accountSpecQuestions: data.accountSpecQuestions,
      },
      spinnerFlag: !stateData.spinnerFlag,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };

  const deleteQuestions = (data) => {
    const stateData = { ...state };
    const quesData = { ...state.specificQuestionsData };
    const queList = [...state.specificQuestionsData.questionsListData];
    const accountrecid = quesData.accountInfo.accountrecid;
    const period = quesData.accountInfo.period;
    const blankObj = { ...state.blankQueObj };

    if (parseInt(data.question_id) === 0) {
      const pos = queList.findIndex(
        (o) => o.question_seq === data.question_seq
      );
      blankObj["question_seq"] = pos + 1;
      queList.splice(pos, 1, blankObj);

      setState({
        ...state,
        formChgStatus: true,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          questionsListData: queList,
          selectedSpecificQuesList: queList,
        },
      });
    } else {
      API.deleteQuestions(parseInt(data.question_id), quesData, stateData).then(
        () => {
          API.getAccGrpQuestions(accountrecid, period).then((data) => {
            setQuestionsData(data);
            setEmptyDataAlert(false);
          });
        }
      );
    }
  };

  const getcustomAns = (data) => {
    const stateData = { ...state };
    const grpMtgQn = stateData.grpMtgQn;

    if (data.customAnswers === null) {
      data.customAnswers = [
        ...stateData.specificQuestionsData.initialAnswerList,
      ];
    }
    const queList = [...state.specificQuestionsData.questionsListData];
    const index = queList.findIndex(
      (que) => que.question_seq === parseInt(data.question_seq)
    );
    API.getCustomAns(data, grpMtgQn).then((res) => {
      const customAnsLength = res.customAnsLength;
      const tempData = [];
      for (let i = 0; i < customAnsLength; i++) {
        tempData.push("");
      }
      data.customAnswers = [...tempData];
      res.customAnswers.map((ans, i) => {
        data.customAnswers[i] = ans;
      });
      data.isCusAnsEdit = true;

      queList[index] = data;
      setState({
        ...state,
        formChgStatus: true,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          questionsListData: queList,
          selectedSpecificQues: data,
        },
        isEditClicked: true,
        isImportButtonClicked: false,
        isDataTypeClicked: false,
        showModal: !state.showModal,
      });
    });
  };

  const getcustomAnsForAnswerLength = (data) => {
    const stateData = { ...state };
    const grpMtgQn = stateData.grpMtgQn;
    API.getCustomAns(data, grpMtgQn).then((res) => {
      const customAnsLength = res.customAnsLength;
      const tempData = [];
      for (let i = 0; i < customAnsLength; i++) {
        tempData.push("");
      }
      setState({
        ...state,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          selectedSpecificQues: {
            ...state.specificQuestionsData.selectedSpecificQues,
            customAnswers: [...tempData],
          },
        },
        formChgStatus: true,
        isEditClicked: true,
        isImportButtonClicked: false,
        isDataTypeClicked: false,
        showModal: !state.showModal,
      });
    });
  };

  const createAnsDialog = (rowData) => {
    const stateData = { ...state };
    if (rowData.customAnswers === null) {
      rowData.customAnswers = [
        ...state.specificQuestionsData.initialAnswerList,
      ];
      state.specificQuestionsData.selectedSpecificQues = rowData;
      setState({
        ...state,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          selectedSpecificQues:
            state.specificQuestionsData.selectedSpecificQues,
        },
      });
    }
    //  state.showModal =true
    if (parseInt(rowData.question_id) != 0) {
      getcustomAns(rowData);
    } else {
      getcustomAnsForAnswerLength(rowData);
    }
  };

  const handleChange = (event, rowData?: any) => {
    if (emptyDataAlert === true) {
      setEmptyDataAlert(false);
    }
    const { type, id, value } = event.target;

    let selectedSpecificQues = {
      ...state.specificQuestionsData.selectedSpecificQues,
    };
    const specificQuesList = [
      ...state.specificQuestionsData.selectedSpecificQuesList,
    ];
    const quesList = [...state.specificQuestionsData.questionsListData];
    const stateData = { ...state.specificQuestionsData };

    if (id === Settings.answerList.id) {
      selectedSpecificQues.customAnswers[rowData] = value;
      selectedSpecificQues.ansEdited = true;
      const pos = quesList.findIndex(
        (q) => q.question_seq === selectedSpecificQues.question_seq
      );
      specificQuesList[pos] = selectedSpecificQues;
      //editAnswerList[rowData] = value
      setState({
        ...state,
        formChgStatus: true,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          selectedSpecificQuesList: specificQuesList,
          selectedSpecificQues: selectedSpecificQues,
        },
        isDataChanged: true,
      });
    }
    if (id === "typeid") {
      selectedSpecificQues[id] = value;
      const selectedValDesc = stateData.questionsTypeList.filter(
        (d) => d.typeid === parseInt(value)
      );

      selectedSpecificQues["typedescription"] =
        selectedValDesc[0].typedescription;
      specificQuesList[selectedSpecificQues.question_seq - 1] =
        selectedSpecificQues;

      setState({
        ...state,
        formChgStatus: true,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          selectedSpecificQuesList: specificQuesList,
        },
        isDataChanged: true,
      });
    }
    if (
      id === Settings.Questions.tableColumns.question.field ||
      id === Settings.Questions.tableColumns.edieExcelLabel.field
    ) {
      selectedSpecificQues = rowData;
      selectedSpecificQues[id] = value;
      specificQuesList[selectedSpecificQues.question_seq - 1] =
        selectedSpecificQues;
      quesList[rowData.que_seq - 1] = selectedSpecificQues;
      //  setQuestionsData(stateData, true)
      setState({
        ...state,
        formChgStatus: true,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          selectedSpecificQuesList: specificQuesList,
          questionsListData: quesList,
        },
        isDataChanged: true,
      });
    }

    if (id === Settings.Questions.tableColumns.answerLength.field) {
      selectedSpecificQues = rowData;
      selectedSpecificQues[id] = value;
      specificQuesList[selectedSpecificQues.question_seq - 1] =
        selectedSpecificQues;
      quesList[rowData.que_seq - 1] = selectedSpecificQues;
      // TO Do if(  validatefields(selectedSpecificQues)){

      specificQuesList.map((data, index) => {
        if (data.question_id !== 0) {
          if (
            data.max_len == "" &&
            data.question == "" &&
            data.edie_column_label == ""
          ) {
            setEmptyDataAlert(true);
          }
        }
      });

      setState({
        ...state,
        formChgStatus: true,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          selectedSpecificQuesList: specificQuesList,
          questionsListData: quesList,
        },
        isDataChanged: true,
      });

      //  }
    }
  };

  const download = () => {
    API.download().then((data) => {});
  };
  const showModal = (elementClicked?: any) => {
    if (elementClicked === Settings.Questions.isImportButtonClicked) {
      setState({
        ...state,
        showModal: !state.showModal,
        isImportButtonClicked: true,
        isDataTypeClicked: false,
        isEditClicked: false,
      });
    } else {
      setState({
        ...state,
        showModal: !state.showModal,
      });
    }
  };

  const createDialog = (rowData) => {
    const stateData = { ...state.specificQuestionsData };
    API.getAccQuestionTypes(rowData.typeid).then((data) => {
      setState({
        ...state,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          questionsTypeList: data,
          selectedSpecificQues: rowData,
        },
        selectedTypeId: rowData.typeid,
        isImportButtonClicked: false,
        isDataTypeClicked: true,
        isEditClicked: false,
        showModal: !state.showModal,
      });
    });
  };

  const setTypeValue = (typeIdVal: any) => {
    let selectedQues = { ...state.specificQuestionsData.selectedSpecificQues };
    const stateData = { ...state.specificQuestionsData };
    const data = { ...state };

    const pos = stateData.selectedSpecificQuesList.findIndex(
      (d) => parseInt(d.question_seq) === parseInt(selectedQues.question_seq)
    );
    selectedQues = stateData.selectedSpecificQuesList[pos];
    const queId = selectedQues.question_id;
    const typeId = typeIdVal;
    let pass = true;
    let grpMtgQn;

    if (queId != 0) {
      grpMtgQn = data.grpMtgQn;
      const setTypeValue = "Y";
      API.fetchAnswered(queId, grpMtgQn, setTypeValue).then((data) => {
        if (data.val === "answered") {
          if (parseInt(typeId) === 5) {
            pass = false;

            alert(
              "Data type cannot be changed since custom answers exist for this question!"
            );
          } else {
            pass = false;
            alert(
              "Data type cannot be changed since one or more user answered the question!"
            );
          }
          setState({ ...state, isDataTypeClicked: false });
        } else {
          updateTableData(selectedQues);
        }
        API.fetchAnswered(queId, grpMtgQn, setTypeValue).catch((error) => {
          setState({ ...state, isEditClicked: false });
          alert("Error when fetching Custom answers!");
          pass = false;
        });
      });
    } else updateTableData(selectedQues);
  };

  const updateTableData = (selectedQues) => {
    const stateData = { ...state.specificQuestionsData };

    if (selectedQues.typeid === "3") selectedQues.max_len = 10;
    else if (selectedQues.typeid === "4") selectedQues.max_len = 1;
    if (selectedQues.typeid === "5") selectedQues.max_len = "";
    const pos = stateData.questionsListData.findIndex(
      (d) => d.question_seq === parseInt(selectedQues.question_seq)
    );
    stateData.questionsListData[pos] = selectedQues;
    stateData.selectedSpecificQuesList[pos] = selectedQues;
    state.showModal = false;
    setState({
      ...state,
      formChgStatus: true,
      specificQuestionsData: stateData,
      showModal: state.showModal,
      isDataTypeClicked: false,
      isImportButtonClicked: false,
      isEditClicked: false,
      formChg: "Y",
    });

    if (parseInt(selectedQues.typeid) === 5) {
      selectedQues.customAnswers = [
        ...state.specificQuestionsData.initialAnswerList,
      ];
      state.specificQuestionsData.selectedSpecificQues = selectedQues;
      setState({
        ...state,
        specificQuestionsData: {
          ...state.specificQuestionsData,
          selectedSpecificQues:
            state.specificQuestionsData.selectedSpecificQues,
        },
      });

      createAnsDialog(selectedQues);
    }
  };

  const checkAnswers = (data) => {
    let check = true;
    const ansArray = data.customAnswers;
    for (let i = 0; i <= ansArray.length - 1; i++) {
      for (let j = i + 1; j <= ansArray.length - 1; j++) {
        if (check) {
          if (ansArray[i] === ansArray[j]) {
            if (ansArray[i] != "" && ansArray[j] != "") {
              alert("'" + ansArray[i] + "' is getting repeated!");
              check = false;
            }
          }
        }
      }
    }
    if (check) {
      setAnswers(data);
    }
  };

  const setAnswers = (data) => {
    const stateData = { ...state.specificQuestionsData };
    const stateValue = { ...state };
    // quesIdObj = document.getElementById("accountSpecQuestions[" + qnNo + "].question_id");
    const quesId = data.question_id;
    let pass = true;
    if (quesId != 0) {
      const grpMtgQn = stateValue.grpMtgQn;
      const setTypeValue = "N";
      API.fetchAnswered(quesId, grpMtgQn, setTypeValue).then((data) => {
        if (data.search("answered") != -1) {
          setState({ ...state, isDataTypeClicked: false });
          alert(
            "Answers cannot be changed since one or more user answered the question!"
          );
          pass = false;
        }
      });
      API.fetchAnswered(quesId, grpMtgQn, setTypeValue).catch((error) => {
        setState({ ...state, isEditClicked: false });
        alert("Error when fetching Custom answers!");
        pass = false;
      });
    }

    if (pass) {
      const pos = stateData.selectedSpecificQuesList.findIndex(
        (d) => d.question_seq === parseInt(data.question_seq)
      );
      stateData.questionsListData[pos] = data;
      stateData.selectedSpecificQuesList[pos] = data;
      state.showModal = false;
      setState({
        ...state,
        formChgStatus: true,
        specificQuestionsData: stateData,
        showModal: state.showModal,
        isDataTypeClicked: false,
        isImportButtonClicked: false,
        isEditClicked: false,
        formChg: "Y",
      });
    }
  };

  const validateExcel = (file: any) => {
    if (file != null) {
      const fileName = file.name;
      if (fileName != "") {
        const file_ext = fileName.split(".").pop();
        if (file_ext != "xlsx") {
          alert("Only xlsx files can be imported.");
          return false;
        }
        return true;
      }
    } else {
      alert("Please choose a file to upload.");
      return false;
    }
  };
  const onFileUpload = (file: any) => {
    const stateData = { ...state };

    const accountrecid =
      stateData.specificQuestionsData.accountInfo.accountrecid;
    const period = stateData.specificQuestionsData.accountInfo.period;
    if (validateExcel(file)) {
      setShowScreenLoader(true);
      API.importExcelData(file, accountrecid)
        .then((data) => {
          if (data != "") {
            setShowScreenLoader(false);
            alert(data);
          } else {
            API.getAccGrpQuestions(accountrecid, period).then((data) => {
              state.isImportButtonClicked = false;
              setState({
                ...state,
                formChgStatus: true,
                isImportButtonClicked: state.isImportButtonClicked,
              });
              setShowScreenLoader(false);
              setQuestionsData(data);
            });
          }
        })
        .catch((error) => {
          setState({ ...state, isImportButtonClicked: false });
          alert("error in file upload");
        });
    }
  };

  function validatefields(data) {
    setState({ ...state, formChg: "Y" });
    return validateRow(data);
  }

  function validateRow(data) {
    let iReturn = true;
    const vMaxlen = data.max_len;
    const vedie = data.edie_column_label == null ? "" : data.edie_column_label;

    const quesElement = document.getElementsByName(
      Settings.Questions.tableColumns.question.field
    );
    const objQuestion =
      data.question == null
        ? quesElement[data.question_seq - 1].defaultValue
        : data.question;
    const maxLenElement = document.getElementsByName(
      Settings.Questions.tableColumns.answerLength.field
    );

    const tststr = objQuestion.trim();
    const cusAnstypeid = parseInt(data.typeid);
    const quesId = data.question_id;
    if (
      tststr != "" ||
      vMaxlen != "" ||
      vedie != "" ||
      cusAnstypeid == 5 ||
      quesId != 0
    ) {
      if (iReturn) {
        if (
          (tststr === "" && vMaxlen === "") ||
          (tststr === "" && vMaxlen === null)
        ) {
          accountContext.setClicked(false);
          alert(
            "Please click on the trash to completely delete the Addendum Question and any hotel answers."
          );
          appContext.setErrorMessageAlert({
            show: true,
            message:
              "Please click on the trash to completely delete the Addendum Question and any hotel answers.",
            type: "browserAlert",
          });
          quesElement[data.question_seq - 1].focus();
          iReturn = false;
          return false;
        } else if (tststr === "") {
          alert("Question is a required field.");
          quesElement[data.question_seq - 1].focus();
          iReturn = false;
        }
      }

      if (iReturn) {
        if (cusAnstypeid != 5) {
          if (vMaxlen === "" || vMaxlen > 255 || vMaxlen < 1) {
            alert("Answer Length must be between 1 and 255.");
            appContext.setErrorMessageAlert({
              show: true,
              message: "Answer Length must be between 1 and 255.",
              type: "browserAlert",
            });

            maxLenElement[data.question_seq - 1].focus();
            iReturn = false;
            return false;
          }
        } else {
          iReturn = true;
          appContext.setErrorMessageAlert({
            show: false,
            message: "",
            type: "browserAlert",
          });
        }
      }
    }

    return iReturn;
  }

  const componentUnload = () => {
    appContext.setErrorMessageAlert({
      show: false,
      message: "",
      type: "browserAlert",
    });
  };

  function final_check(iReturn, maxquest) {
    const stateData = [...state.specificQuestionsData.questionsListData];

    iReturn = true;
    let check = true;

    stateData.map((d) => {
      if (d.max_len === null) d.max_len = "";

      if (check) iReturn = validateRow(d);

      if (!iReturn) check = false;
    });

    return check;
  }
  const fnkychars_onkeypress = (e, max_len) => {
    let isEdieCol = false;
    const charCode = e.charCode ? e.charCode : null;

    if (charCode == undefined) return true;

    const data = e.target.value;
    let len = data.length;
    if (e.type === "keypress") {
      len = len + 1;
    }
    if (e.target.id === Settings.Questions.tableColumns.edieExcelLabel.field)
      isEdieCol = true;

    if (
      !(
        charCode == 32 ||
        charCode == 34 ||
        (charCode > 38 && charCode < 60) ||
        (!isEdieCol && charCode > 62 && charCode < 65) ||
        (charCode > 64 && charCode < 91) ||
        (!isEdieCol && charCode > 90 && charCode < 97) ||
        (charCode > 96 && charCode < 124) ||
        charCode == 125
      )
    ) {
      e.preventDefault();
      return false;
    }

    if (len > max_len) {
      alert(`You are allowed to enter up to ${max_len} characters.`);
      e.target.innerHTML = data.substr(0, max_len);
      e.preventDefault();
      return false;
    }
    setState({ ...state, formChgStatus: true, formChg: "Y" });
    return true;
  };
  const btnImportAccquestions = () => {
    //let fieldSeqObj = document.getElementById("numques");
    // if (fieldSeqObj != null) {
    //   // var fieldSeq = parseInt(fieldSeqObj.value);
    //   var fieldSeq = parseInt(fieldSeqObj.nodeValue);
    //   if (fieldSeq > 0) {
    //     alert("Import can be used if there are no Account specific questions");
    //   } else {
    //     showModal(Settings.Questions.isImportButtonClicked)
    //   }
    // }
    showModal(Settings.Questions.isImportButtonClicked);
  };

  const autoSaveData = () => {
    const stateData = { ...state.specificQuestionsData };
    const iReturn = true;
    const maxlimit = stateData.max_questions;

    const a = final_check(iReturn, maxlimit);
    if (a) {
      if (state.isDataChanged) {
        updateQuestionData();
      }
      return true;
    } else {
      return false;
    }
  };

  const unmountHandler = () => {
    const stateData = { ...state.specificQuestionsData };
    const iReturn = true;
    const maxlimit = stateData.max_questions;

    const a = final_check(iReturn, maxlimit);
    if (a) {
      return true;
    } else {
      return false;
    }
  };

  const unmountSaveHandler = () => {
    const stateData = { ...state.specificQuestionsData };
    const iReturn = true;
    const maxlimit = stateData.max_questions;

    const a = final_check(iReturn, maxlimit);
    if (a) {
      if (state.isDataChanged) updateQuestionData();
      //  ReactDOM.unmountComponentAtNode(document.getElementById('accountList'));
      return true;
    } else {
      return false;
    }
  };
  const updateQuestionData = () => {
    setShowScreenLoader(true);
    const quesData = [...state.specificQuestionsData.questionsListData];
    const stateData = { ...state };
    const quesData1 = { ...state.specificQuestionsData };
    const accountrecid = quesData1.accountInfo.accountrecid;
    const period = quesData1.accountInfo.period;
    if (stateData.isDataChanged) stateData.formChg = Settings.Questions.yes;
    quesData.map((d, i) => {
      const custAnsArray = [];
      if (d.ansEdited) {
        d.customAnswers.map((ans) => {
          if (ans !== "") {
            custAnsArray.push(ans);
          }
          d.customAnswers = custAnsArray;
          d.ansEdited = "Y";
          if (d.max_len === null || d.max_len === "") {
            d.max_len = null;
          }
          quesData[i] = d;
        });
      } else {
        d.customAnswers = null;
        if (d.max_len === null || d.max_len === "") {
          d.max_len = null;
        }
        quesData[i] = d;
      }
    });

    API.updateAccountQuestionsData(stateData, quesData).then((data) => {
      if (data != null) {
        API.getAccGrpQuestions(accountrecid, period).then((data) => {
          setQuestionsData(data);
          setShowScreenLoader(false);
        });
      }
    });
  };

  const handleClickOutside = () => {
    if (emptyDataAlert == true) {
      alert(
        "Please click on the trash to completely delete the Addendum Question and any hotel answers."
      );
      setEmptyDataAlert(false);
    }
  };

  const grpMeetingsContext = {
    handleClickOutside,
    emptyDataAlert,
    setEmptyDataAlert,
    state,
    setState,
    setQuestionsData,
    deleteQuestions,
    setTypeValue,
    handleChange,
    checkAnswers,
    download,
    onFileUpload,
    unmountSaveHandler,
    showModal,
    validateRow,
    createAnsDialog,
    updateQuestionData,
    createDialog,
    validatefields,
    final_check,
    fnkychars_onkeypress,
    btnImportAccquestions,
    autoSaveData,
    showScreenLoader,
    setShowScreenLoader,
    componentUnload,
    unmountHandler,
  };

  return (
    <GroupMeetingsContext.Provider value={grpMeetingsContext}>
      {props.children}
    </GroupMeetingsContext.Provider>
  );
};

export const GroupMeetingsContextConsumer = GroupMeetingsContext.Consumer;
export default GroupMeetingsContext;
