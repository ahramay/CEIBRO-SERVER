const httpStatus = require('http-status');
const { Project, Task, SubTask } = require('../models');
const ApiError = require('../utils/ApiError');

const createTask = async (taskBody) => Task.create(taskBody);

const isTaskExist = async (taskId, populate = []) => {
  const task = await Task.findById(taskId).populate(populate);
  if (!task) {
    throw new ApiError(400, 'Invalid task id');
  }
  return task;
};

const isSubTaskExist = async (subTaskId, populate = []) => {
  const subTask = await SubTask.findById(subTaskId).populate(populate);
  if (!subTask) {
    throw new ApiError(400, 'Invalid sub task id');
  }
  return subTask;
};

const updateTaskById = async (taskId, updateBody) => {
  const task = await isTaskExist(taskId);
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

const deleteTaskById = async (taskId) => {
  const task = await isTaskExist(taskId);
  await task.remove();
};

const createSubTask = async (taskId, subTaskBody, currentUserId) => {
  subTaskBody.task = taskId;
  subTaskBody.creator = currentUserId;
  return SubTask.create(subTaskBody);
};

const getSubTasksByFilters = (filter, populate = []) => SubTask.find(filter).populate(populate);

const deleteSubTaskById = async (subTaskId) => {
  const subTask = await isSubTaskExist(subTaskId);
  await subTask.remove();
};

const updateSubTaskById = async (subTaskId, updateBody) => {
  const subTask = await isSubTaskExist(subTaskId);
  Object.assign(subTask, updateBody);
  await subTask.save();
  return subTask;
};

const queryTasks = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

module.exports = {
  createTask,
  isTaskExist,
  updateTaskById,
  deleteTaskById,
  createSubTask,
  getSubTasksByFilters,
  deleteSubTaskById,
  isSubTaskExist,
  updateSubTaskById,
  queryTasks,
};
