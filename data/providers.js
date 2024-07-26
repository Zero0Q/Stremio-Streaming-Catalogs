export const providers = [
    { id: 'nfx', name: 'Netflix', regions: { movie: 'GB', show: 'GB' }, default: true },
    { id: 'hbm', name: 'HBO Max', regions: { movie: 'NL', show: 'NL' } , default: true },
    { id: 'dnp', name: 'Disney+', regions: { movie: 'GB', show: 'GB' } , default: true },
    { id: 'hlu', name: 'Hulu', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'amp', name: 'Prime Video', regions: { movie: 'US', show: 'US' }, default: true  },
    { id: 'pmp', name: 'Paramount+', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'atp', name: 'Apple TV+', regions: { movie: 'GB', show: 'GB' }, default: true  },
    { id: 'pct', name: 'Peacock', regions: { }, default: false  }, // Peacock is handled by pcp
    { id: 'pcp', name: 'Peacock', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'fmn', name: 'Funimation', regions: { movie: 'US', show: 'US' } , default: false },
    { id: 'cru', name: 'Crunchyroll', regions: { show: 'US' } , default: false },
    { id: 'hst', name: 'Hotstar', regions: { movie: 'IN', show: 'IN' } , default: false },
    { id: 'zee', name: 'Zee5', regions: { movie: 'IN', show: 'IN' } , default: false },
    { id: 'vil', name: 'Videoland', regions: { movie: 'NL', show: 'NL' } , default: false },
    { id: 'blv', name: 'BluTV', regions: { movie: 'TR', show: 'TR' } , default: false },
    { id: 'clv', name: 'Clarovideo', regions: { movie: 'BR', show: 'BR' } , default: false },
    { id: 'gop', name: 'Globoplay', regions: { movie: 'BR', show: 'BR' } , default: false },
    { id: 'hay', name: 'Hayu', regions: { show: 'GB' } , default: false },
    { id: 'nlz', name: 'NLZIET', regions: { movie: 'NL', show: 'NL' } , default: false },
    { id: 'sst', name: 'SkyShowtime', regions: { movie: 'NL', show: 'NL' } , default: false },
    { id: 'mgl', name: 'MagellanTV', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'cts', name: 'Curiosity Stream', regions: { movie: 'US', show: 'US' } , default: false },
    { id: 'cpd', name: 'Canal+', regions: { movie: 'FR', show: 'FR' } , default: false },
    { id: 'dpe', name: 'Discovery+', regions: { show: 'GB' } , default: false }
];

export const regions = [
    {
        id:'us',
        name:'US',
        providers: [
            'nfx',
            'dnp',
            'amp',
            'atp',
            'hbm',
            'pmp',
            'mgl',
            'cts',
            'fmn',
            'hlu',
            'pcp',
            'dpe'
        ]
    },
    {
        id:'br',
        name:'Brazil',
        providers: [
            'nfx',
            'dnp',
            'atp',
            'amp',
            'pmp',
            'hbm',
            'fmn',
            'clv',
            'gop',
            'mgl',
            'cts',
        ]
    },
    {
        id:'in',
        name:'India',
        providers: [
            'hay',
            'nfx',
            'atp',
            'amp',
            'zee',
            'hst',
            'mgl',
            'cts',
            'dpe',
        ]
    },
    {
        id:'tr',
        name:'Turkey',
        providers: [
            'nfx',
            'dnp',
            'atp',
            'amp',
            'blv',
            'mgl',
            'cts',
        ]
    },
    {
        id:'nl',
        name:'Netherlands',
        providers: [
            'nfx',
            'dnp',
            'amp',
            'atp',
            'hbm',
            'hay',
            'vil',
            'sst',
            'mgl',
            'cts',
            'nlz',
            'dpe',
        ]
    },
    {
        id:'fr',
        name:'France',
        providers: [
            'nfx',
            'dnp',
            'amp',
            'atp',
            'hbm',
            'hay',
            'cpd',
        ]
    },
    {
        id:'',
        name:'Any',
        providers: [
            'nfx',
            'dnp',
            'amp',
            'atp',
            'hbm',
            'pmp',
            'hlu',
            'pcp',
            'clv',
            'gop',
            'blv',
            'zee',
            'hst',
            'hay',
            'vil',
            'sst',
            'mgl',
            'cts',
            'fmn',
            'nlz',
            'cpd',
            'dpe',
        ]
    }
]
