import { IEdieProfile } from "./IProfile"

export default class EdieProfile implements IEdieProfile {
    profile_id: number;
    profile_name: string

    constructor(profile?: EdieProfile) {
        if (profile) {
            this.profile_id = profile.profile_id;
            this.profile_name = profile.profile_name;
        }
    }
}