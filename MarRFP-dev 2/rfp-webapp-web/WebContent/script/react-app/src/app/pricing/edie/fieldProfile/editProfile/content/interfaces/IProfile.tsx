import { IColumn } from "./IColumn";


export interface IProfile {
    profileName: string;
    profileColumns: Array<IColumn>;
    columnsNotInProfile: Array<IColumn>;
}
