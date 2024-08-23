type LocationHoursType = ({
        name: string;
        hoursType: 'straight';
        hours: Record<string, string>;
    } | {
        name: string;
        hoursType: 'broken';
        hours: {
            [key: string]: {
              [key: string]: string;
            };
          };
    })[];

const locationHours: LocationHoursType = [
    {
        name: 'Lottie',
        hoursType: 'broken',
        hours: {
            'Monday-Friday': {
                Breakfast: '7:00 a.m. - 9:00 a.m.',
                Lunch: '11:00 a.m. - 1:30 p.m.',
                Dinner: '4:30 p.m. - 7:00 p.m.',
            },
            'Saturday & Sunday': {
                Lunch: '11:00 a.m. - 1:30 p.m.',
                Dinner: '4:30 p.m. - 7:00 p.m.',
            }
        },
    },
    {
        name: 'Falcon',
        hoursType: 'straight',
        hours: {
            'Monday-Friday': '7:30 a.m. - 3:30 p.m.',
            'Saturday & Sunday': 'Closed'
        },
    },
    {
        name: 'Union',
        hoursType: 'straight',
        hours:{
            'Monday-Friday': '7:30 a.m. - 10:00 p.m.',
            'Saturday & Sunday': '1:00 p.m. - 10:00 p.m.'
        },
    },
];

export default locationHours;