export type RewardID = number;
export type RewardName = 'Сила' | 'Телосложение' | 'Интеллект' | 'Мудрость' | 'Обаяние' | 'Ловкость' | 'Карта Героя' | 'Карта Анти-Героя' | 'Триумф' | 'Трагедия' | 'Опыт' | 'Путь справедливости' | 'Путь познания' | 'Путь короны' | 'Путь зла' | 'Путь святости' | 'Путь приоды'
export type RewardCount = 'out' | 'in';
export type Reward = {
    name: RewardName;
    img: string;
    ico: string;
    height?: number;
    width?: number,
    count?: RewardCount,
}
