import { ITag } from '@/interfaces/tag';
import { createActionTypes } from '@/store/actions/reduxActions';
import { createAction } from '@reduxjs/toolkit';

const context = 'tag';

export const [LIST_TAG_REQUEST, LIST_TAG_SUCCESS, LIST_TAG_FAILURE] = createActionTypes(`${context}/LIST_TAG`);

export const listTagRequest = createAction(LIST_TAG_REQUEST);
export const listTagSuccess = createAction<ITag[]>(LIST_TAG_SUCCESS);
export const listTagFailure = createAction(LIST_TAG_FAILURE);
