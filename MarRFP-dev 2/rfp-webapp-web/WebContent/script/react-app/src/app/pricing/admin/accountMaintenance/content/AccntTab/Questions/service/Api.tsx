import axios from "../../../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";
var FileSaver = require('file-saver');

const isDevMode = process.env.NODE_ENV == "development";
const apiURL = process.env.API_URL;
const apiContext = process.env.API_CONTEXT;

const API = {
  async getAccSpecQuestions(accountrecid: number, period: number) {

    let res = await axios.get(`${Utils.getAPIURI(Settings.api.getAccSpecQuestions)}`, {
      headers: { Pragma: "no-cache" },
      params: {
        accountrecid: accountrecid,
        period: period
      },
    });

    API.handleErrorResponse(res, Settings.api.deleteQuestions);

    return res.data;
  },
  async deleteQuestions(queId: number, quesData, stateData) {
    let { accountrecid, period } = quesData.accountInfo
    const params = {
      accountrecid: accountrecid,
      questmax: quesData.max_questions,
      period: period,
      grpMtgQn: stateData.grpMtgQn,
      formChg: stateData.formChg,
    };

    const postData = Utils.createPostData(params);

    const res = await axios.post(`${Utils.getAPIURI(Settings.api.deleteQuestions)}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: { delquest: queId },
    });

    API.handleErrorResponse(res, Settings.api.deleteQuestions);

    return res.data;
  },
  async getAccQuestionTypes(typeId: number) {

    let res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getAccQuestionTypes)}`, {
      headers: { Pragma: "no-cache" },
      params: {
        currentTypeid: typeId
      },
    });

    API.handleErrorResponse(res, Settings.api.getAccQuestionTypes);

    return res.data;
  },

  async getCustomAns(data, accSpec) {

    let res = await axios.get(
      `${Utils.getAPIURI(Settings.api.getCustomAns)}`, {
      headers: { Pragma: "no-cache" },
      params: {
        questionNo: parseInt(data.question_seq),
        questionId: data.question_id,
        accSpec: accSpec
      },
    });

    API.handleErrorResponse(res, Settings.api.getCustomAns);

    return res.data;
  },

  async fetchAnswered(questionId, accSpec, setTypeValue) {

    let res = await axios.get(
      `${Utils.getAPIURI(Settings.api.fetchAnswered)}`, {
      headers: { Pragma: "no-cache" },
      params: {
        questionId: questionId,
        accSpec: accSpec,
        setTypeValue: setTypeValue
      },
    });
    API.handleErrorResponse(res, Settings.api.fetchAnswered);

    return res.data;
  },

  async updateAccountQuestionsData(data, quesList) {
    let { accountrecid, period } = data.specificQuestionsData.accountInfo

    const params = {
      strAccountSpecQuestions: JSON.stringify(quesList),
      accountrecid: accountrecid,
      questmax: data.specificQuestionsData.max_questions,
      period: period,
      numques: "",
      accSpecQn: data.accSpecQn,
      formChg: data.formChg,
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(`${Utils.getAPIURI(Settings.api.updateQuestions)}`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    API.handleErrorResponse(res, Settings.api.updateQuestions);

    return res.data;
  },

  async download() {
    axios({
      url: Utils.getAPIURI(Settings.api.downloadTemplate),
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      var blob = new Blob([response.data], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, `${Settings.Questions.fileName}.xlsx`);
     
    });
  },

  async importExcelData(file: any, accountrecid: any) {
    let excelData = new FormData()
    excelData.append('qfile', file, file.name)
    excelData.append('accountrecid', accountrecid)

    const res = await axios({
      url: Utils.getAPIURI(Settings.api.importExcelData),
      method: 'POST',
      headers: {
        "Content-Type": "application/octet-stream"
      },
      data: excelData,
    })

    return res.data;
  },

  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },

};

export default API;
