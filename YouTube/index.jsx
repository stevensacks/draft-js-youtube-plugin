import getYouTubeID from '../utils/getYouTubeID';
import React from 'react';
import styles from './index.scss';

// Needs the empty span tag at the end in order to delete properly
const YouTube = ({decoratedText}) => {
    const id = getYouTubeID(decoratedText);
    return (
        <div className={styles.video}>
            <iframe id={`yt-${id}`} className={styles.youtube}
                    src={`https://www.youtube.com/embed/${id}?autoplay=0`}
                    type='text/html' frameBorder='0'
            />
            <span> </span>
        </div>
    );
};

YouTube.propTypes = {
    decoratedText: React.PropTypes.string.isRequired
};

export default YouTube
