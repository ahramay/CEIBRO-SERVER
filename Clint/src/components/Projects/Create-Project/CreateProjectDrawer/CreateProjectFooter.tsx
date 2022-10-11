import { Button, CircularProgress, Grid, makeStyles } from '@material-ui/core'
import colors from '../../../../assets/colors'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'
import { projectOverviewSchema } from 'constants/schemas/project.schema'
import { useEffect, useState } from 'react'
import projectActions, {
  createProject,
  deleteProject,
  getProjectsWithPagination,
  updateProject,
} from 'redux/action/project.action'
import { toast } from 'react-toastify'
import { dataInterface } from 'components/Utills/Inputs/SelectDropdown'
import assets from 'assets/assets'
import { useConfirm } from 'material-ui-confirm'

const CreateProjectBody = () => {
  const classes = useStyles()
  const [isValid, setIsValid] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const isDiabled = !loading ? false : true
  const { projectOverview, projects, selectedProject } = useSelector(
    (state: RootState) => state.project
  )
  const confirm = useConfirm()
  useEffect(() => {
    projectOverviewSchema
      .isValid(projectOverview)
      .then(setIsValid)
      .catch(_err => {
        setIsValid(false)
      })
  }, [projectOverview])

  const handleProjectCreate = (saveAsDraft = false) => {
    const data = getFormValues(saveAsDraft)
    setLoading(true)
    dispatch(
      createProject({
        body: data,
        success: res => {
          toast.success('Project created')
          // setLoading(true);
          dispatch(projectActions.setSelectedProject(res?.data?.id))
        },
        finallyAction: () => {
          setLoading(false)
        },
      })
    )
  }

  const handleProjectUpdate = (saveAsDraft = false) => {
    const data = getFormValues(saveAsDraft)
    data.delete('projectPhoto')
    const payload = {
      body: data,
      success: () => {
        toast.success('Project Saved')
        dispatch(projectActions.closeDrawer())
      },
      finallyAction: () => {
        setLoading(false)
      },
      other: selectedProject,
    }
    setLoading(true)
    dispatch(updateProject(payload))
  }

  const handleSubmit = (saveAsDrfat = false) => {
    if (selectedProject) {
      handleProjectUpdate(saveAsDrfat)
    } else {
      handleProjectCreate(saveAsDrfat)
    }
  }

  const handleDelete = () => {
    confirm({ description: 'Confirm want to  delete this ' }).then(() => {
      const payload = {
        success: () => {
          toast.success('Project Delete Successfully')
          dispatch(projectActions.closeDrawer())
          dispatch(getProjectsWithPagination())
        },
        other: selectedProject,
      }
      dispatch(deleteProject(payload))
    })
  }

  const getFormValues = (saveAsDraft = false) => {
    const { title, owner, dueDate, location, description, photoFile, publishStatus } =
      projectOverview
    const formData = new FormData()
    formData.append('title', title || '')
    formData.append('location', location || '')
    formData.append('description', description || '')
    if (owner) {
      if (owner?.length > 0) {
        owner?.map?.((row: dataInterface) => formData.append('owner', row.value))
      } else {
        formData.append('owner', owner)
      }
    }
    formData.append('dueDate', dueDate)
    formData.append('projectPhoto', photoFile)
    formData.append('publishStatus', saveAsDraft ? 'draft' : publishStatus || 'draft')

    return formData
  }

  return (
    <Grid container justifyContent="flex-end" className={classes.body}>
      {!selectedProject && (
        <Button
          onClick={() => handleSubmit(true)}
          disabled={!isValid}
          className={classes.draft}
          color="primary"
        >
          Save as draft
        </Button>
      )}
      {/* {!selectedProject?} */}
      {selectedProject && (
        <Button
          className={classes.trash}
          color="primary"
          onClick={handleDelete}
          // {selectedProject? style={{display:"none"}} : display:"block"}
        >
          <img src={assets.trashIcon} className={'w-16'} />
        </Button>
      )}
      <Button
        disabled={!isValid || loading}
        className={classes.create}
        variant="contained"
        color="primary"
        onClick={() => handleSubmit(false)}
      >
        {isDiabled && loading && <CircularProgress size={20} className={classes.progress} />}
        {selectedProject ? 'Update' : 'Create project'}
      </Button>
    </Grid>
  )
}

export default CreateProjectBody

const useStyles = makeStyles({
  body: {
    padding: '10px 20px',
    background: colors.white,
    '@media (max-width:960px)': {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  create: {
    marginLeft: 50,
    fontSize: 12,
    fontWeight: 500,
  },
  draft: {
    fontSize: 12,
    fontWeight: 500,
  },
  trash: {
    color: 'red',
  },
  progress: {
    color: colors.primary,
    position: 'absolute',
    zIndex: 1,
    margin: 'auto',
    left: 0,
    right: 0,
    top: 10,
    textAlign: 'center',
  },
})
