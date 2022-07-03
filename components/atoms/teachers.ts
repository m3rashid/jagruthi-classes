import { atom } from 'recoil'

import { ITeacher } from 'models/teacher'

export const teacherAtom = atom<ITeacher[]>({
  key: 'teacherAtom',
  default: [],
})
