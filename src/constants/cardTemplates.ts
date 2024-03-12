export type Template = any;
const defaultSizeWidth = 300;
const defaultSize = {
    height: defaultSizeWidth * 1.72, // соотношение ширины и высоты в процентах (мб 1.72)
    width: defaultSizeWidth,
}
const specialCardSize = {
    height: defaultSizeWidth * 1.38, // соотношение ширины и высоты в процентах
    width: defaultSizeWidth,
}
export const cardTemplates: Record<number, Template> = {
    0: {
        name: 'Происхождение',
        img: '',
        ico: 'e3245314-af5c-4464-8d6d-a390503a3aab',
        backImg: 'aefa057a-2202-493b-a298-a661c0707fab',
        cardSize: defaultSize,
    },
    1: {
        name: 'Мотивация',
        img: '',
        ico: '4a372f73-d2a1-4f63-8e67-c9521953fbb1',
        backImg: '0458b31e-e350-49b7-a729-dedf1fa4d583',
        cardSize: defaultSize,
    },
    2: {
        name: 'Судьба',
        img: '',
        ico: '1ebde30a-5f86-48c5-b69f-5c946ea59de8',
        backImg: '2eddf5db-f2b7-420a-a49b-e057d675b872',
        cardSize: defaultSize,
    },
    3: {
        name: 'Карта Героя',
        img: '',
        ico: 'af14f0cd-42e8-42cc-b36f-c2482ba7aa1b',
        backImg: '2980073f-66d0-4e20-aa04-3d399d56e937',
        cardSize: specialCardSize,
    },
    4: {
        name: 'Карта Антигероя',
        img: '',
        ico: '4cd045a9-ded3-4330-bc8c-7052accc7653',
        backImg: '3efb750a-54e0-4841-bd39-0dfd64ad072a',
        cardSize: specialCardSize,
    },
    5: {
        name: 'Карта Черты',
        img: '',
        ico: '5efc700f-ce8c-4b66-8721-8e4794bca980',
        backImg: null,
        cardSize: defaultSize,
    },
    6: {
        name: 'Испытание',
        img: '',
        ico: 'db3b09d0-a84f-4b50-865b-667a412100da',
        backImg: null,
        cardSize: defaultSize,
    },
    7: {
        name: 'Злодей',
        img: '',
        ico: '19474701-7c1c-4263-8abc-103210ffc0be',
        backImg: null,
        cardSize: defaultSize,
    },
    8: {
        name: 'Злодейское дияние',
        img: '',
        ico: 'ed81f971-0a43-4ec3-a1a6-48e5602f5d5b',
        backImg: '8a967fcd-b493-4323-8f0c-65cdd491fab7',
        cardSize: specialCardSize,
    },
    9: {
        name: 'Союзник',
        img: '',
        ico: '5542f8ed-b522-4f86-9d1a-97d5a5cecff7',
        backImg: null,
        cardSize: defaultSize,
    },
}
