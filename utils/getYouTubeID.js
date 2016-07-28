import regex from './youtubeRegex';

export default function getYouTubeID(url) {
    let result = '';
    if (url) {
        const match = url.match(regex);
        if (match && match[7] && match[7].length === 11) result = match[7];
    }
    return result;
}
