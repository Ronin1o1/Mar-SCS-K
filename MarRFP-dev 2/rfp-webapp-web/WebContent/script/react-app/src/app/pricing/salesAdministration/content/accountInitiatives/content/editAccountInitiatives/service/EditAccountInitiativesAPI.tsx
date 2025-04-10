import axios from "../../../../../../../common/components/customaxios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Utils from "../../../../../../../common/utils/Utils";
import Settings from "../static/Settings";

interface GetEditInitiativePayloadType {
  initiative_name: string;
  seqId: string;
  action: string;
  accountrecid: string;
  period: number;
  revStreamId: number;
}

const EditAccountInitiativesApi = {
  async getEditInitiatives(
    payload: GetEditInitiativePayloadType
  ): Promise<any> {
    const headers = {
      Pragma: "no-cache",
    };

    const accountrecid = payload.accountrecid;
    const initiative_name = payload.initiative_name;
    const period = payload.period;
    const action = payload.action;
    const seqId = payload.seqId;
    const revStreamId = payload.revStreamId;
    const res = await axios.get(
      Utils.getAPIURI(Settings.api.getEditInitiative),
      {
        headers: headers,
        params: {
          initiative_name,
          seqId,
          action,
          accountrecid,
          period,
          revStreamId,
        },
      }
    );
    EditAccountInitiativesApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.getEditInitiative)
    );

    return res.data;
  },

  async updateAccInitiatives(
    params: GetEditInitiativePayloadType,
    body: any
  ): Promise<any> {
    const headers = {
      Pragma: "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const accountrecid = params.accountrecid;
    const initiative_name = params.initiative_name;
    const period = params.period;
    const action = params.action;
    const seqId = params.seqId;
    const revStreamId = params.revStreamId;
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.updateInitiative),
      Utils.createPostData(body),
      {
        headers: headers,
        params: {
          initiative_name,
          seqId,
          action,
          accountrecid,
          period,
          revStreamId,
        },
      }
    );
    EditAccountInitiativesApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.updateInitiative)
    );

    return res.data;
  },

  async deleteAccInitiatives(
    params: GetEditInitiativePayloadType,
    body: any
  ): Promise<any> {
    const headers = {
      Pragma: "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const accountrecid = params.accountrecid;
    const initiative_name = params.initiative_name;
    const period = params.period;
    const action = params.action;
    const seqId = params.seqId;
    const revStreamId = params.revStreamId;
    const res = await axios.post(
      Utils.getAPIURI(Settings.api.deleteInitiative),
      Utils.createPostData(body),
      {
        headers: headers,
        params: {
          initiative_name,
          seqId,
          action,
          accountrecid,
          period,
          revStreamId,
        },
      }
    );
    EditAccountInitiativesApi.handleErrorResponse(
      res,
      Utils.getAPIURI(Settings.api.deleteInitiative)
    );

    return res.data;
  },

  handleErrorResponse: (response: any, endpoint: string): void => {
    if (!response) throw Error("No response received from API.");
    else if (
      response.headers &&
      response.headers["content-type"] &&
      response.headers["content-type"].includes("html")
    )
      throw Error(`Error response received from API: ${endpoint}`);
  },
};

export default EditAccountInitiativesApi;
