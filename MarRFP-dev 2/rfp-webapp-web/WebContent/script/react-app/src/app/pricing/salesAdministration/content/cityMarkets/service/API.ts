import axios from "../../../../../common/components/customaxios";
import Utils from "../../../../../common/utils/Utils";
import Settings from "../static/Settings";
const FileSaver = require("file-saver");
const API = {
  async getAccMarkets(accountrecid: number, accountname: string, year: number) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getAccMarkets), {
      headers: {
        Pragma: "no-cache",
      },
      params: {
        accountrecid: accountrecid,
        accountname: accountname,
        period: year,
      },
    });
    return res.data;
  },
  async getAccMarketsSorted(
    accountrecid: string,
    accountname: string,
    year: string,
    sortByUS: number,
    sortByInter: number
  ) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.getAccMarkets), {
      headers: {
        Pragma: "no-cache",
      },
      params: {
        accountrecid: accountrecid,
        accountname: accountname,
        period: year,
        sortByUS: sortByUS,
        sortByInter: sortByInter,
      },
    });
    return res.data;
  },
  async getLocations(recid, us_market, seqid) {
    const res = await axios.get(Utils.getAPIURI(Settings.api.locations), {
      headers: {
        Pragma: "no-cache",
      },
      params: {
        recid: recid,
        us_market: us_market,
        seqid: seqid,
      },
    });
    return res.data;
  },

  async deleteMarket(recid, marketType, accountrecid) {
    const params = {
      recid: recid,
      usMarket: marketType == "US" ? "Y" : "N",
      accountrecid: accountrecid,
    };
    const postData = Utils.createPostData(params);

    await axios.post(Utils.getAPIURI(Settings.api.delete), postData, {
      headers: {
        Pragma: "no-cache",
      },
    });
  },
  async updateMarket(recid, marketType, accountrecid, period, strAccMarket) {
    const params = {
      recid: recid,
      period: period,
      usMarket: marketType == "US" ? "Y" : "N",
      accountrecid: accountrecid,
      strAccMarket: JSON.stringify(strAccMarket),
    };
    const postData = Utils.createPostData(params);

    const res = await axios.post(
      Utils.getAPIURI(Settings.api.update),
      postData,
      {
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    return res;
  },
  async deleteAllMarkets(marketType, period, accountrecid, accountname) {
    const params = {
      sortByUS: 0,
      numUSTravelMarkets: 1,
      numIntlTravelMarkets: 1,
      formChg: "N",
      period: period,
      accountrecid: accountrecid,
      accountname: accountname,
    };
    const postData = Utils.createPostData(params);
    const res = await axios.post(Utils.getAPIURI(marketType), postData, {
      headers: {
        Pragma: "no-cache",
      },
    });
    return res;
  },
  async downloadInstruction(marketType) {
    axios({
      url: `${Utils.getAPIURI(
        Settings.api.downloadInstruction
      )}?marketType=${marketType}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, `${Settings.fileName.USinstruction}.xlsx`);
    });
  },

  async getDropDownData(
    accountrecid: string,
    seqid: number,
    us_market: string
  ) {
    const res = await axios.get(
      `${process.env.API_URL}${Settings.api.getEditDropDowns}`,
      {
        headers: {
          Pragma: "no-cache",
        },
        params: {
          recid: accountrecid,
          seqid: seqid,
          us_market: us_market,
        },
      }
    );

    return res.data;
  },
  async downloadInstructionInt(marketType) {
    axios({
      url: `${Utils.getAPIURI(
        Settings.api.downloadInstruction
      )}?marketType=${marketType}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, `${Settings.fileName.INinstruction}.xlsx`);
    });
  },

  async importExcelData(
    file: any,
    accountrecid: any,
    accountname,
    period,
    marketType
  ) {
    const excelData = new FormData();

    excelData.append("myFile", file, file.name);
    excelData.append("accountrecid", accountrecid);
    excelData.append("accountname", accountname);
    excelData.append("period", period);
    excelData.append("marketType", marketType);

    const res = await axios({
      url: Utils.getAPIURI(Settings.api.importExcelData),
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      data: excelData,
    });
    return res.data;
    //yet to done
  },
  async downloadTemplate(marketType) {
    axios({
      url: `${Utils.getAPIURI(
        Settings.api.downloadTemplate
      )}?marketType=${marketType}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, `${Settings.fileName.USTemplate}.csv`);
    });
  },

  async downloadTemplateInt(marketType) {
    axios({
      url: `${Utils.getAPIURI(
        Settings.api.downloadTemplate
      )}?marketType=${marketType}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, `${Settings.fileName.INTemplate}.csv`);
    });
  },
  async exportTemplate(marketType, accountrecid) {
    axios({
      url: `${Utils.getAPIURI(
        Settings.api.exportTemplate
      )}?marketType=${marketType}&accountrecid=${accountrecid}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, `${Settings.fileName.USExport}.csv`);
    });
  },
  async exportTemplateInt(marketType, accountrecid) {
    axios({
      url: `${Utils.getAPIURI(
        Settings.api.exportTemplate
      )}?marketType=${marketType}&accountrecid=${accountrecid}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, `${Settings.fileName.InExport}.csv`);
    });
  },
  handleErrorResponse: (response: any, endpoint: string) => {
    if (!response) throw Error("No response received from API.");
    else if (response?.headers["content-type"].includes("html"))
      throw Error(`Error response received from API: ${endpoint}`);
  },
};

export default API;
