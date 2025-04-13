import {createAction} from '@reduxjs/toolkit';

// `updateEntities` will be used to trigger a state update in the reducer
// It will carry the payload that contains the data to be updated in the store
export const updateEntities = createAction('UPDATE_ENTITIES');

// `cleanUpEntities` will be dispatched to clear or reset the data
// This can be useful when you want to remove data from the store, e.g., on component unmount or after a request is completed
export const cleanUpEntities = createAction('CLEAN_UP_ENTITIES');
