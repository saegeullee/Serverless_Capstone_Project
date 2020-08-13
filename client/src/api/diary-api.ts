import { apiEndpoint } from '../config'
import { Diary } from '../types/Diary'
import { CreateDiaryRequest } from '../types/CreateDiaryRequest'
import Axios from 'axios'
import { UpdateDiaryRequest } from '../types/UpdateDiaryRequest'
import { UploadUrlReponse } from '../types/UploadUrlReponse'

export async function getDiaries(idToken: string): Promise<Diary[]> {
  const response = await Axios.get(`${apiEndpoint}/diary`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  console.log('diary:', response.data)
  return response.data.items
}

export async function createDiary(
  idToken: string,
  newDiary: CreateDiaryRequest
): Promise<Diary> {
  const response = await Axios.post(
    `${apiEndpoint}/diary`,
    JSON.stringify(newDiary),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.item
}

export async function patchDiary(
  idToken: string,
  diaryId: string,
  updatedDiary: UpdateDiaryRequest
): Promise<void> {
  await Axios.patch(
    `${apiEndpoint}/diary/${diaryId}`,
    JSON.stringify(updatedDiary),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
}

export async function deleteDiary(
  idToken: string,
  diaryId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/diary/${diaryId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(): Promise<UploadUrlReponse> {
  const response = await Axios.get(`${apiEndpoint}/diary/image`, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await Axios.put(uploadUrl, file)
}
