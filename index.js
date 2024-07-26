import express from 'express';
import cors from 'cors';
import Mixpanel from 'mixpanel';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import addon from './addon.js';
import { providers } from './data/providers.js';
import { MOVIE, SERIES, SHOW } from './CONSTANTS.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
    const errorLog = fs.createWriteStream(path.join(__dirname, 'vue', 'dist', 'error.log'));
    process.stderr.write = errorLog.write.bind(errorLog);

    process.on('uncaughtException', function (err) {
        console.error((err && err.stack) ? err.stack : err);
    });
}

const app = express();
app.set('trust proxy', true)
app.use(cors());
app.use(express.static(path.join(__dirname, 'vue', 'dist')));


let mixpanel = null;
if (process.env.MIXPANEL_KEY) {
    mixpanel = Mixpanel.init(process.env.MIXPANEL_KEY);
}
let movies = providers.filter(provider => provider.regions?.movie).reduce((acc, provider)=>{
    acc[provider.id] = [];
    return acc;
}, {});

let series = providers.filter(provider => provider.regions?.show).reduce((acc, provider)=>{
    acc[provider.id] = [];
    return acc;
}, {})
async function loadNewCatalog() {
    console.log('loadNewCatalog');

    const movies = {};
    const series = {};

    await Promise.all(providers.map(async provider => {
        if (provider.regions.movie) {
            movies[provider.id] = await addon.getMetas(MOVIE, [provider.id], provider.regions.movie, provider.language);
        }
        if (provider.regions.show) {
            series[provider.id] = await addon.getMetas(SHOW, [provider.id], provider.regions.show, provider.language);
        }
    }));

    console.log('done');
}


app.get('/:configuration/manifest.json', (req, res) => {
    res.setHeader('Cache-Control', 'max-age=86400,stale-while-revalidate=86400,stale-if-error=86400,public');
    res.setHeader('content-type', 'application/json');

    // parse config
    const buffer = Buffer(req.params?.configuration || '', 'base64');
    const [selectedProviders, rpdbKey, countryCode, installedAt] = buffer.toString('ascii')?.split(':');
    mixpanel && mixpanel.track('install', {
        ip: req.ip,
        distinct_id: req.ip.replace(/\.|:/g, 'Z'),
        configuration: req.params.configuration,
        selectedProviders,
        rpdbKey,
        countryCode,
        installedAt,
    });

    let catalogs = [];

    selectedProviders.split(',').forEach(providerId => {
        const provider = providers.find(p => p.id === providerId);
        if (provider) {
            if (provider.regions?.movie) {
                catalogs.push({
                    id: providerId,
                    type: MOVIE.toLowerCase(),
                    name: provider.name,
                });
            }
            if (provider.regions?.show) {
                catalogs.push({
                    id: providerId,
                    type: SERIES.toLowerCase(),
                    name: provider.name,
                });
            }
        }
    });
    
    // show catalogs for providers
    res.send({
        id: 'pw.ers.netflix-catalog',
        logo: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI',
        version: process.env.npm_package_version,
        name: 'Streaming Catalogs',
        description: 'Your favourite streaming services!',
        catalogs: catalogs,
        resources: ['catalog'],
        types: [MOVIE.toLowerCase(), SERIES.toLowerCase()],
        idPrefixes: ['tt'],
        behaviorHints: {
            configurable: true,
        }
    });
})

app.get('/:configuration?/catalog/:type/:id/:extra?.json', (req, res) => {
    res.setHeader('Cache-Control', 'max-age=86400,stale-while-revalidate=86400,stale-if-error=86400,public');
    res.setHeader('content-type', 'application/json');

    // parse config
    const buffer = Buffer(req.params?.configuration || '', 'base64');
    let [selectedProviders, rpdbKey, countryCode, installedAt] = buffer.toString('ascii')?.split(':');

    //console.log(selectedProviders, rpdbKey, countryCode, installedAt);

    if (String(rpdbKey || '').startsWith('16')) {
        installedAt = rpdbKey;
        rpdbKey = null;
    }

    mixpanel && mixpanel.track('catalog', {
        ip: req.ip,
        distinct_id: req.ip.replace(/\.|:/g, 'Z'),
        configuration: req.params?.configuration,
        selectedProviders:selectedProviders.split(','),
        rpdbKey,
        countryCode,
        installedAt,
        catalog_type: req.params.type,
        catalog_id: req.params.id,
        catalog_extra: req.params?.extra,
    });

   

    let id = req.params.id;
    // legacy addon, netflix-only catalog support
    if (id === 'top') {
        id = 'nfx';
    }
    // mistakenly added peacock free instead of premium. remove pct when/if everyone is using pcp
    if (id === 'pct') {
        id = 'pcp';
    }

    if (req.params.type === 'movie') {
        res.send({ metas: addon.replaceRpdbPosters(rpdbKey, movies[id]) });

        return;
    }

    if (req.params.type === 'series') {
        res.send({ metas: addon.replaceRpdbPosters(rpdbKey, series[id]) });

        return;
    }
})

app.get('/manifest.json', function (req, res) {
    res.setHeader('Cache-Control', 'max-age=86400,stale-while-revalidate=86400,stale-if-error=86400,public');
    res.setHeader('content-type', 'application/json');

    mixpanel && mixpanel.track('install', {
        ip: req.ip,
        distinct_id: req.ip.replace(/\.|:/g, 'Z'),
    });

    let defaultCatelogs=[];
    providers.filter(provider => provider.default).forEach(provider => {
        if(provider.regions.movie) {
            defaultCatelogs.push({
                id: provider.id,
                type: MOVIE.toLowerCase(),
                name: provider.name,
            })
        }
        if(provider.regions.show) {
            defaultCatelogs.push({
                id: provider.id,
                type: SERIES.toLowerCase(),
                name: provider.name,
            })
        }
    })

    res.send({
        id: 'pw.ers.netflix-catalog',
        logo: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI',
        version: process.env.npm_package_version,
        name: 'Streaming Catalogs',
        description: 'Trending movies and series on Netflix, HBO Max, Disney+, Apple TV+ and more. Configure to choose your favourite services.',
        catalogs: defaultCatelogs,
        resources: ['catalog'],
        types: [MOVIE.toLowerCase(), SERIES.toLowerCase()],
        idPrefixes: ['tt'],
        behaviorHints: {
            configurable: true,
        }
    });
})

// fallback to Vue
app.get(/.*/, (req, res) => {
    res.setHeader('Cache-Control', 'max-age=86400,stale-while-revalidate=86400,stale-if-error=86400,public');
    res.setHeader('content-type', 'text/html');
    res.sendFile(path.join(__dirname, 'vue', 'dist', 'index.html'));
});

loadNewCatalog();
setInterval(loadNewCatalog, process.env.REFRESH_INTERVAL || 21600000);

const port = process.env.PORT || 7700;
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}/manifest.json`);
});
