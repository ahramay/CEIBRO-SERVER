import * as Yup from 'yup'

export const projectOverviewSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  // dueDate: Yup.date().required(),
  // owner: Yup.array().required(),
  // publishStatus: Yup.string().required(),
  // description: Yup.string().required(),
  // location: Yup.string().required(),
  // projectPhoto: Yup.string().required(),
})
