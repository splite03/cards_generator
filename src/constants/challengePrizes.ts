import type {Reward, RewardID} from "@/types/reward.t";

const pathParam = 26;
const rombParam = 26;

export const challengePrizes: Record<RewardID, Reward> = {
    0: {
        name: 'Сила',
        img: 'a692c434-c29e-4214-9b48-f920e7773dee',
        ico: '',
    },
    1: {
        name: 'Телосложение',
        img: 'b185335d-0538-47ab-b95d-c911b1952c5b',
        ico: '',
    },
    2: {
        name: 'Интеллект',
        img: 'b1ebd4cf-6386-4f13-a688-695399822e56',
        ico: '',
    },
    3: {
        name: 'Мудрость',
        img: '7ed9b0d3-b3fa-459a-801f-4704586a10b0',
        ico: '',
    },
    4: {
        name: 'Обаяние',
        img: '55adbf0d-2025-42fd-a6dc-cf1c4196c48e',
        ico: '',
    },
    5: {
        name: 'Ловкость',
        img: '91206445-133b-4599-a0b9-ef2a487eea05',
        ico: '',
    },
    6: {
        name: 'Карта Героя',
        img: '9e24d935-6617-4d6f-a3e1-8ee9496e8579',
        ico: '',
        width: rombParam-2,
        count: 'out',
    },
    7: {
        name: 'Карта Анти-Героя',
        img: 'cd2c363b-18be-4f60-8ba0-993bfedf204e',
        ico: '',
        width: rombParam-2,
        count: 'out',
    },
    8: {
        name: 'Триумф',
        img: '3a0a39fa-1484-4962-af36-4bf501e71ef0',
        ico: '',
        width: rombParam,
        count: 'in',
    },
    9: {
        name: 'Трагедия',
        img: '5a331c0b-b0b2-43de-a073-1876796b07b5',
        ico: '',
        width: rombParam,
        count: 'in',
    },
    10: {
        name: 'Опыт',
        img: 'e25883b3-7949-49e1-826f-d371c00f2db3',
        ico: '',
        width: rombParam,
        count: 'in',
    },
    11: {
        name: 'Путь справедливости',
        img: 'ec9ddfe0-8215-4865-80d4-810ac7a6c1ca',
        ico: '',
        height: pathParam,
        width: pathParam-1,
    },
    12: {
        name: 'Путь познания',
        img: '0b14e189-34ec-4471-9908-366e89bf4d5e',
        ico: '',
        height: pathParam,
        width: pathParam-1,
    },
    13: {
        name: 'Путь короны',
        img: '04a6d945-c604-4619-abc3-89fb85c467ac',
        ico: '',
        height: pathParam,
        width: pathParam-1,
    },
    14: {
        name: 'Путь зла',
        img: 'fe71328a-b575-41ae-b518-2caca7617f37',
        ico: '',
        height: pathParam,
        width: pathParam-1,
    },
    15: {
        name: 'Путь святости',
        img: '91df25e9-825f-46d9-9cb1-c0ce79976f94',
        ico: '',
        height: pathParam,
        width: pathParam-1,
    },
    16: {
        name: 'Путь приоды',
        img: 'cfd55f90-970f-46eb-8a48-04a70ff3113e',
        ico: '',
        height: pathParam,
        width: pathParam-1,
    },
};
