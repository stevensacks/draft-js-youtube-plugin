import {EditorState, Entity, Modifier, SelectionState} from 'draft-js';
import findYouTubeURL from '../youtubeStrategy';

export default function attachImmutableEntitiesToYouTube(editorState) {
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlockMap();
    let newContentState = contentState;

    blocks.forEach(block => {
        const text = block.getText();
        const addEntityToYouTube = (start, end) => {
            const existingEntityKey = block.getEntityAt(start);
            if (existingEntityKey) {
                // avoid manipulation in case the youtube already has an entity
                const entity = Entity.get(existingEntityKey);
                if (entity && entity.get('type') === 'youtube') return false;
            }

            const selection = SelectionState.createEmpty(block.getKey())
                .set('anchorOffset', start)
                .set('focusOffset', end);

            const youtubeURL = text.substring(start, end);
            const entityKey = Entity.create('youtube', 'IMMUTABLE', {url:youtubeURL});
            newContentState = Modifier.replaceText(
                newContentState,
                selection,
                youtubeURL,
                null,
                entityKey
            );
        };
        findYouTubeURL(block, addEntityToYouTube);
    });

    if (!newContentState.equals(contentState)) {
        return EditorState.push(
            editorState,
            newContentState,
            'convert-to-immutable-youtube'
        );
    }

    return editorState;
}
