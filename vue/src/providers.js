export const providers = [
    { id: 'nfx', name: 'Netflix', img:'/netflix.webp', regions: { movie: 'GB', show: 'GB' }, default: true },
    { id: 'hbm', name: 'HBO Max',img:'/hbo.webp', regions: { movie: 'NL', show: 'NL' } , default: true },
    { id: 'dnp', name: 'Disney+',img:'/disney.webp', regions: { movie: 'GB', show: 'GB' } , default: true },
    { id: 'hlu', name: 'Hulu',img:'/hulu.webp', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'amp', name: 'Prime Video',img:'/prime.webp', regions: { movie: 'US', show: 'US' }, default: true  },
    { id: 'pmp', name: 'Paramount+',img:'/paramount.webp', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'atp', name: 'Apple TV+',img:'/apple.webp', regions: { movie: 'GB', show: 'GB' }, default: true  },
    { id: 'pcp', name: 'Peacock',img:'/peacock.webp', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'fmn', name: 'Funimation',img:'/funimation.webp', regions: { movie: 'US', show: 'US' } , default: false },
    { id: 'hst', name: 'Hotstar',img:'/hotstar.webp', regions: { movie: 'IN', show: 'IN' } , default: false },
    { id: 'zee', name: 'Zee5', img:'/zee5.webp',regions: { movie: 'IN', show: 'IN' } , default: false },
    { id: 'vil', name: 'Videoland',img:'/videoland.webp', regions: { movie: 'NL', show: 'NL' } , default: false },
    { id: 'blv', name: 'BluTV',img:'/blu.webp', regions: { movie: 'TR', show: 'TR' } , default: false },
    { id: 'clv', name: 'Clarovideo',img:'/claro.webp', regions: { movie: 'BR', show: 'BR' } , default: false },
    { id: 'gop', name: 'Globoplay',img:'/globo.webp', regions: { movie: 'BR', show: 'BR' } , default: false },
    { id: 'hay', name: 'Hayu',img:'/hayu.webp', regions: { show: 'GB' } , default: false },
    { id: 'nlz', name: 'NLZIET',img:'/nlziet.webp', regions: { movie: 'NL', show: 'NL' } , default: false },
    { id: 'sst', name: 'SkyShowtime',img:'/skyshowtime.webp', regions: { movie: 'NL', show: 'NL' } , default: false },
    { id: 'mgl', name: 'MagellanTV',img:'/magellan.webp', regions: { movie: 'US', show: 'US' }, default: false  },
    { id: 'cts', name: 'Curiosity Stream', img:'/curiositystream.webp', regions: { movie: 'US', show: 'US' } , default: false },
    { id: 'cpd', name: 'Canal+', img:'/canal-plus.webp', regions: { movie: 'FR', show: 'FR' } , default: false },
    { id: 'dpe', name: 'Discovery+', img:'/discovery-plus.webp', regions: { show: 'GB' } , default: false }
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
