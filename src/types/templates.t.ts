export type TemplateID = number;
export type TemplateName = 'Происхождение' | 'Мотивация' | 'Судьба' | 'Карта Героя' | 'Карта Антигероя' | 'Карта Черты' | 'Испытание' | 'Злодей' | 'Злодейское дияние' | 'Союзник';
export type Template = {
    name: TemplateName,
    img: string,
    ico: string,
    backImg: string | null,
    cardSize: {
        height: number;
        width: number;
    },
};
