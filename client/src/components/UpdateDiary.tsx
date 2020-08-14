import * as React from 'react'
import { History } from 'history'
import { Form, Button, TextArea } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { patchDiary } from '../api/diary-api'
import { Diary } from '../types/Diary'

enum UploadState {
  NoUpload,
  UploadingFile
}

interface EditDiaryProps {
  match: {
    params: {
      diaryId: string
    }
  }
  auth: Auth
  history: History
}

interface EditDiaryState {
  uploadState: UploadState
  content: string
}

export class UpdateDiary extends React.PureComponent<
  EditDiaryProps,
  EditDiaryState
> {
  state: EditDiaryState = {
    uploadState: UploadState.NoUpload,
    content: ''
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      await patchDiary(
        this.props.auth.getIdToken(),
        this.props.match.params.diaryId,
        {
          content: this.state.content
        }
      )

      this.props.history.push('/')
    } catch (e) {
      alert('error occured: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ content: event.target.value })
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  componentDidMount() {
    const content = localStorage.getItem('diary')
    if (content) {
      this.setState({ content })
    }
  }

  render() {
    return (
      <div>
        <h1>Update Diary</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            control={TextArea}
            label="Content"
            style={{ minHeight: 300 }}
            onChange={this.handleContentChange}
            value={this.state.content}
          />

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <div>
        {this.state.uploadState === UploadState.UploadingFile && (
          <p>Uploading file</p>
        )}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Update
        </Button>
      </div>
    )
  }
}
