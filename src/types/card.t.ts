import type {RuneID} from "./runes.t";
import type {RewardID} from "./reward.t";
import type {TemplateID} from './templates.t';

export type Card = {
    type: TemplateID;
    act: number;
    name: string;
    topPath: {
        name: string;
        extraDifficulty: number;
        rewards: RewardID[];
        isDark: false;
    };
    botPath: {
        name: string;
        extraDifficulty: number;
        rewards: RewardID[];
        isDark: false;
    },
    difficulty: {
        value: number;
        runes: RuneID[];
    };
    imageUrl: null | string;
    imageBlob: null | Blob;
    imageId: null | string;
}
