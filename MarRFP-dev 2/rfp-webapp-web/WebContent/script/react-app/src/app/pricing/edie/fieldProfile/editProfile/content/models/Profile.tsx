import { IColumn } from "../interfaces/IColumn";
import { IProfile } from "../interfaces/IProfile";
import Column from "./Column";

export default class Profile implements IProfile {
    profileName: string;
    profileColumns: Array<Column>;
    columnsNotInProfile: Array<Column>;
    constructor(profile?: Profile) {
        if (profile) {
            this.profileName = profile.profileName;
            if (profile.profileColumns) {
                this.profileColumns = new Array<IColumn>();
                for (const column of profile.profileColumns) {
                    this.profileColumns.push(new Column(column));
                }
            }
        }

        if (profile) {
            this.columnsNotInProfile = new Array<IColumn>();
            for (const column of profile.columnsNotInProfile) {
                this.columnsNotInProfile.push(new Column(column));
            }
        }
    }
}