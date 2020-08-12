import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import {
  createDiary,
  deleteDiary,
  getDiaries,
  patchDiary
} from '../api/diary-api'
import Auth from '../auth/Auth'
import { Diary } from '../types/Diary'

interface DiariesProps {
  auth: Auth
  history: History
}

interface DiariesState {
  diaries: Diary[]
  newDiaryName: string
  loadingDiaries: boolean
}

export class Diaries extends React.PureComponent<DiariesProps, DiariesState> {
  state: DiariesState = {
    diaries: [],
    newDiaryName: '',
    loadingDiaries: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newDiaryName: event.target.value })
  }

  onEditButtonClick = (diaryId: string) => {
    this.props.history.push(`/diaries/${diaryId}/edit`)
  }

  onNewDiaryButtonClick = () => {
    this.props.history.push(`/newDiary`)
  }

  onDiaryCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const newDiary = await createDiary(this.props.auth.getIdToken(), {
        content: this.state.newDiaryName
      })
      this.setState({
        diaries: [...this.state.diaries, newDiary],
        newDiaryName: ''
      })
    } catch {
      alert('Diary creation failed')
    }
  }

  onDiaryDelete = async (diaryId: string) => {
    try {
      await deleteDiary(this.props.auth.getIdToken(), diaryId)
      this.setState({
        diaries: this.state.diaries.filter(diary => diary.diaryId != diaryId)
      })
    } catch {
      alert('Diary deletion failed')
    }
  }

  async componentDidMount() {
    try {
      // const diaries = await getDiaries(this.props.auth.getIdToken())
      const diaries = [
        {
          diaryId: 'test',
          createdAt: '2020-08-10',
          content: 'test',
          attachmentUrl: 'test'
        },
        {
          diaryId: 'test',
          createdAt: '2020-08-10',
          content: 'test',
          attachmentUrl: 'test'
        }
      ]

      this.setState({
        diaries,
        loadingDiaries: false
      })
    } catch (e) {
      alert(`Failed to fetch diaries: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Today's Diary</Header>

        {this.renderCreateDiaryInput()}

        {this.renderDiaries()}
      </div>
    )
  }

  renderCreateDiaryInput() {
    return (
      <Grid.Row>
        <Button
          icon="add"
          color="blue"
          content="New Diary"
          onClick={() => this.onNewDiaryButtonClick()}
        ></Button>
        {/* <Input
          action={{
            color: 'teal',
            labelPosition: 'left',
            icon: 'add',
            content: 'New task',
            onClick: this.onDiaryCreate
          }}
          fluid
          actionPosition="left"
          placeholder=""
          onChange={this.handleNameChange}
        /> */}
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderDiaries() {
    if (this.state.loadingDiaries) {
      return this.renderLoading()
    }

    return this.renderDiariesList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading TODOs
        </Loader>
      </Grid.Row>
    )
  }

  renderDiariesList() {
    return (
      <Grid padded>
        {this.state.diaries.map((diary, pos) => {
          return (
            <Grid.Row key={diary.diaryId}>
              <Grid.Column width={1} verticalAlign="middle">
                {/* <Checkbox
                  onChange={() => this.onDiaryCheck(pos)}
                  checked={diary.done}
                /> */}
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {diary.content}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {diary.createdAt}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(diary.diaryId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onDiaryDelete(diary.diaryId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {diary.attachmentUrl && (
                <Image src={diary.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
