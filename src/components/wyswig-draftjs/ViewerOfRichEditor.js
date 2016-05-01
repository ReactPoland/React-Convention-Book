import React from 'react';
import {
  Editor, 
  EditorState, 
  ContentState, 
  RichUtils, 
  convertToRaw,
  convertFromRaw
} from 'draft-js';


export default class  ViewerOfRichEditor extends React.Component {
    constructor(props) {
      super(props);

      let initialEditorFromProps;
      if(typeof props.initialValue === 'undefined') {
        initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(''));
      } else {
        if(typeof props.initialValue === 'string') {
          initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(props.initialValue));
        } else {
          let draftBlock = convertFromRaw(props.initialValue);
          let contentToConsume = ContentState.createFromBlockArray(draftBlock);
          initialEditorFromProps = EditorState.createWithContent(contentToConsume);
        }

      }
      this.state = {
        editorState: initialEditorFromProps
      };

      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) => { 
        var contentState = editorState.getCurrentContent();

        let contentJSON = convertToRaw(contentState);
        props.onChangeTextJSON(contentJSON, this.props.name);
        this.setState({editorState}) 
      };

      this.handleKeyCommand = (command) => this._handleKeyCommand(command);
      this.toggleBlockType = (type) => this._toggleBlockType(type);
      this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    componentWillReceiveProps(nextProps) {
      let initialEditorFromProps;
      if(typeof nextProps.initialValue === 'undefined') {
        initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(''));
      } else {
        if(typeof nextProps.initialValue === 'string') {
          initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(nextProps.initialValue));
        } else {
          let draftBlock = convertFromRaw(nextProps.initialValue);
          let contentToConsume = ContentState.createFromBlockArray(draftBlock);
          initialEditorFromProps = EditorState.createWithContent(contentToConsume);
        }

      }
      this.state = {
        editorState: initialEditorFromProps
      };
    }

    _handleKeyCommand(command) {
      const {editorState} = this.state;
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }

    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }

    render() {
      const {editorState} = this.state;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      return (
        <div>
          <h4>{this.props.title}</h4>
          <div className="RichEditor-root">
            <div className={className} onClick={this.focus}>
              <Editor
                tabIndex={this.props.tabIndexProp}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                ref="editor"
                spellCheck={true}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }

  const BLOCK_TYPES = [
    // {label: 'H1', style: 'header-one'},
    // {label: 'H2', style: 'header-two'},
    // {label: 'Blockquote', style: 'blockquote'},
    // {label: 'UL', style: 'unordered-list-item'},
    // {label: 'OL', style: 'ordered-list-item'},
    // {label: 'Code Block', style: 'code-block'},
  ];

  const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

  var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    // {label: 'Underline', style: 'UNDERLINE'},
    // {label: 'Monospace', style: 'CODE'},
  ];

  const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };






