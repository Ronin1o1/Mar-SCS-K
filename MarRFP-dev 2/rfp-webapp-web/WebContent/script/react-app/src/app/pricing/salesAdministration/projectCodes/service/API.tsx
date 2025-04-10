import axios from "../../../../common/components/customaxios";
import Settings from "../static/Settings";
import FileSaver from "file-saver";
import Utils from "../../../../common/utils/Utils";

const API = {
  async getProjectCodes() {
    axios({
      url: Utils.getAPIURI(Settings.api.projectCodeDownloads),
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, `${Settings.fileName}.xlsx`);
    });
  },
};

export default API;
