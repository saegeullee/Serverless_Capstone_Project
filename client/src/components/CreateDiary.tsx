import * as React from 'react'
import { History } from 'history'
import { Form, Button, TextArea } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getUploadUrl, uploadFile } from '../api/diary-api'
import { createDiary } from '../api/diary-api'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
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
  file: any
  uploadState: UploadState
  content: string
}

export class CreateDiary extends React.PureComponent<
  EditDiaryProps,
  EditDiaryState
> {
  state: EditDiaryState = {
    file: undefined,
    uploadState: UploadState.NoUpload,
    content: ''
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      let uploadUrl
      if (this.state.file) {
        this.setUploadState(UploadState.FetchingPresignedUrl)
        uploadUrl = await getUploadUrl()
        this.setUploadState(UploadState.UploadingFile)
        await uploadFile(uploadUrl.url, this.state.file)
      }
      // const newDiary = await createDiary(this.props.auth.getIdToken(), {

      const newDiary = await createDiary({
        content: this.state.content,
        imageUrl: (() => {
          return uploadUrl ? uploadUrl.imageUrl : undefined
        })()
      })

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

  render() {
    return (
      <div>
        <h1>Create New Diary</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>File</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>
          <Form.Field
            control={TextArea}
            label="Content"
            style={{ minHeight: 300 }}
            onChange={this.handleContentChange}
          />

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && (
          <p>Uploading image metadata</p>
        )}
        {this.state.uploadState === UploadState.UploadingFile && (
          <p>Uploading file</p>
        )}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Upload
        </Button>
      </div>
    )
  }
}
