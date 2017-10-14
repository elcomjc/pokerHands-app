export const CONSTANTS = {
    API_URL: 'https://services.comparaonline.com/dealer/',
    HAND_TYPES: [
        {
          name: 'HIGH_CARD',
          order: 1
        },
        {
          name: 'ONE_PAIR',
          order: 2
        },
        {
          name: 'TWO_PAIRS',
          order: 3
        },
        {
          name: 'THREE_OF_A_CARD',
          order: 4
        },
        {
          name: 'STRAIGHT',
          order: 5
        },
        {
          name: 'FLUSH',
          order: 6
        },
        {
          name: 'FULL_HOUSE',
          order: 7
        },
        {
          name: 'POKER',
          order: 8
        },
        {
          name: 'STRAIGHT_FLUSH',
          order: 9
        },
        {
          name: 'ROYAL_FLUSH',
          order: 10
        }
    ],
    CARD_RANK: {
        '2': 1,
        '3': 2,
        '4': 3,
        '5': 4,
        '6': 5,
        '7': 6,
        '8': 7,
        '9': 8,
        '10': 9,
        'J': 10,
        'Q': 11,
        'K': 12,
        'A': 13
    }
};
