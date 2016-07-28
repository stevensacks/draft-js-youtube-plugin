import attachImmutableEntitiesToYouTube from './modifiers/attachImmutableEntitiesToYouTube';
import {EditorState} from 'draft-js';
import YouTube from './YouTube';
import youtubeStrategy from './youtubeStrategy';

const createYouTubePlugin = () => {
    const callbacks = {
        keyBindingFn: undefined,
        handleKeyCommand: undefined,
        onDownArrow: undefined,
        onUpArrow: undefined,
        onTab: undefined,
        onEscape: undefined,
        handleReturn: undefined,
        onChange: undefined,
    };
    const store = {
        getEditorState: undefined,
        setEditorState: undefined,
    };
    return {
        decorators: [
            {
                strategy: youtubeStrategy,
                component: YouTube
            }
        ],
        initialize: ({ getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
        },
        onDownArrow: keyboardEvent => callbacks.onDownArrow && callbacks.onDownArrow(keyboardEvent),
        onTab: keyboardEvent => callbacks.onTab && callbacks.onTab(keyboardEvent),
        onUpArrow: keyboardEvent => callbacks.onUpArrow && callbacks.onUpArrow(keyboardEvent),
        onEscape: keyboardEvent => callbacks.onEscape && callbacks.onEscape(keyboardEvent),
        handleReturn: keyboardEvent => callbacks.handleReturn && callbacks.handleReturn(keyboardEvent),
        onChange: editorState => {
            let newEditorState = attachImmutableEntitiesToYouTube(editorState);

            if (!newEditorState.getCurrentContent().equals(editorState.getCurrentContent())) {
                // Forcing the current selection ensures that it will be at it's right place.
                // This solves the issue where inserting an Emoji on OSX with Apple's Emoji
                // selector led to the right selection the data, but wrong position in
                // the contenteditable.
                newEditorState = EditorState.forceSelection(
                    newEditorState,
                    newEditorState.getSelection()
                );
            }
            if (callbacks.onChange) return callbacks.onChange(newEditorState);
            return newEditorState;
        }
    }
};

export default createYouTubePlugin
