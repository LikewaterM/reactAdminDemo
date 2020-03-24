import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

/*富文本编辑器,react-draft-wysiwyg*/
export default class RichTextEditor extends Component {
	static propTypes = {
		detail:PropTypes.string
	}
  
  constructor(props) {
      super(props)
      const html = this.props.detail
	  this.state = {
	  	editorState: EditorState.createEmpty() //创建一个没有内容的编辑对象
	  }
      if(html){
		  const contentBlock = htmlToDraft(html)
		  if (contentBlock) {
		    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
		    const editorState = EditorState.createWithContent(contentState)
		    this.state = {
		      editorState,
		    }
		  }
	  }
   }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }
  
  getDetail = () => {
	  return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))//返回富文本框内容的html格式
  }
  
  uploadImageCallBack = (file) => {
	  return new Promise(
		  (resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.open('POST', 'https://api.imgur.com/3/image')
			// xhr.setRequestHeader('Authorization', 'Client-ID XXXXX')
			const data = new FormData()
			data.append('image', file)
			xhr.send(data)
			xhr.addEventListener('load', () => {
			  const response = JSON.parse(xhr.responseText)
			  const url = response.data.url
			  resolve({data:{link:url}})
			});
			xhr.addEventListener('error', () => {
			  const error = JSON.parse(xhr.responseText)
			  reject(error)
			});
		  }
		)
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
		  toolbar={{
			image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
		  }}
        />
        {/*<textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />*/}
      </div>
    );
  }
}