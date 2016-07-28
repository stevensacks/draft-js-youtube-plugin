import getYouTubeID from './utils/getYouTubeID';
import regex from './utils/youtubeRegex';

export default (contentBlock, callback) => {
    const text = contentBlock.getText();
    if (getYouTubeID(text).length === 11)
    {
        const matchArr = regex.exec(text);
        if (matchArr !== null) {
            const start = matchArr.index;
            callback(start, start + matchArr[0].length);
        }
    }
}
