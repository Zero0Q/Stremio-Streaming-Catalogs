import axios from 'axios';
import { MOVIE } from './CONSTANTS.js';

const AMOUNT = 100;
const AMOUNT_TO_VERIFY = 24;
const DUPES_CACHE = {};
const DELETED_CACHE = [];

export default {
    verify: true,
    replaceRpdbPosters(rpdbKey, metas) {
        if (!rpdbKey) {
            return metas;
        }

        return metas.map(meta => {
            return {...meta, poster: `https://api.ratingposterdb.com/${rpdbKey}/imdb/poster-default/${meta.id}.jpg`};
        });
    },
    async getMetas(type = MOVIE, providers = ['nfx'], country = "GB", language = 'en') {
        let res = null;
        try {
            res = await axios.post('https://apis.justwatch.com/graphql', {
                "operationName": "GetPopularTitles",
                "variables": {
                    "popularTitlesSortBy": "NEWEST", // Changed from "NEW" to "NEWEST"
                    "first": AMOUNT,
                    "platform": "WEB",
                    "sortRandomSeed": 0,
                    "popularAfterCursor": "",
                    "offset": null,
                    "popularTitlesFilter": {
                        "ageCertifications": [],
                        "excludeGenres": [],
                        "excludeProductionCountries": [],
                        "genres": [],
                        "objectTypes": [
                            type
                        ],
                        "productionCountries": [],
                        "packages": providers,
                        "excludeIrrelevantTitles": false,
                        "presentationTypes": [],
                        "monetizationTypes": [
                            "FREE",
                            "FLATRATE",
                            "ADS"
                        ]
                    },
                    "language": language,
                    "country": country
                },
                "query": "query GetPopularTitles(\n  $country: Country!\n  $popularTitlesFilter: TitleFilter\n  $popularAfterCursor: String\n  $popularTitlesSortBy: PopularTitlesSorting! = NEWEST\n  [...]"
            });
        } catch (e) {
            console.error("ERROR MESSAGE-------------------------", e.message);
            console.log("ERROR RESPONSE-------------------------", e.response?.data);

            return [];
        }

        console.log(providers.join(','), res.data.data.popularTitles.edges.length);
        let metasResults = [];
        const results = await Promise.allSettled(res.data.data.popularTitles.edges.map(async (item, index) => {
            let imdbId = item.node.content.externalIds.imdbId;

            if (!imdbId || DELETED_CACHE.includes(imdbId)) {
                if (imdbId) console.log('deleted cache hit');

                return null;
            }

            if (DUPES_CACHE[imdbId]) {
                console.log('dupe cache hit');
                imdbId = DUPES_CACHE[imdbId];
            } else if (index < AMOUNT_TO_VERIFY && this.verify) {
                try {
                    await axios.head(`https://www.imdb.com/title/${imdbId}/`, {maxRedirects: 0, headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/1[...]`
                } catch(e) {
                    if (e.response?.status === 308) {
                        const newImdbId = e.response?.headers?.['location']?.split('/')?.[2];
                        console.log('DUPE imdb redirects to', newImdbId);
                        DUPES_CACHE[imdbId] = newImdbId;
                        imdbId = newImdbId;
                    } else if (e.response?.status === 404) {
                        console.log('imdb does not exist');
                        DELETED_CACHE.push(imdbId);
                        return null;
                    } else {
                        console.error('Stop verifying, IMDB error', e.response?.status);
                        this.verify = false;
                    }
                }
            }

            const posterId = item?.node?.content?.posterUrl?.match(/\/poster\/([0-9]+)\//)?.pop();
            let posterUrl;
            if (posterId) {
                posterUrl = `https://images.justwatch.com/poster/${posterId}/s332/img`;
            } else {
                posterUrl = `https://live.metahub.space/poster/medium/${imdbId}/img`;
            }


            // get better metadata from cinemeta
            const cinemeta = await axios.get(`https://v3-cinemeta.strem.io/meta/${type === MOVIE ? 'movie' : 'series'}/${imdbId}.json`);

            return cinemeta.data?.meta ? {
                ...cinemeta.data?.meta,
                ...{ id: imdbId, poster: posterUrl, videos: undefined },
            } : {
                id: imdbId,
                name: item.node.content.title,
                poster: posterUrl,
                posterShape: 'poster',
                type: type === MOVIE ? 'movie' : 'series',
            }
        }));
        results.forEach((result, index)=>{
            if(result.status === 'fulfilled'){
                metasResults.push(result.value);
            }else {
                console.log("rejected----------------------------------------",result.reason.message);

            }
        })

        console.log("metas:::::::::", metasResults.length)

        return metasResults;
    }
}
