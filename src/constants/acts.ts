import type {Act, ActID} from '$types/act.t';

export const acts: Record<ActID, Act> = {
    0: {
        name: 'Акт 1',
        backImg: '560b1c31-47cf-40aa-b0e3-181223034459',
        ico: '5efc700f-ce8c-4b66-8721-8e4794bca980',
    },
    1: {
        name: 'Акт 2',
        backImg: '32e1da0c-2eb1-4fec-81e9-55dd61e9c7a7',
        ico: 'db3b09d0-a84f-4b50-865b-667a412100da',
    },
    2: {
        name: 'Акт 3',
        backImg: '71ebb5c6-b7b0-4619-bbef-fa078d885a99',
        ico: '19474701-7c1c-4263-8abc-103210ffc0be',
    },
}
