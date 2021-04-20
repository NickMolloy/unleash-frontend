import api from './api';
import { dispatchError } from '../util';
export const START_FETCH_USERS = 'START_FETCH_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ERROR_FETCH_USERS = 'ERROR_FETCH_USERS';
export const REMOVE_USER = 'REMOVE_USER';
export const REMOVE_USER_ERROR = 'REMOVE_USER_ERROR';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const VALIDATE_PASSWORD_ERROR = 'VALIDATE_PASSWORD_ERROR';

const debug = require('debug')('unleash:e-user-admin-actions');

const gotUsers = value => ({
    type: RECEIVE_USERS,
    value,
});

export function fetchUsers() {
    debug('Start fetching user');
    return dispatch => {
        dispatch({ type: START_FETCH_USERS });

        return api
            .fetchAll()
            .then(json => dispatch(gotUsers(json)))
            .catch(dispatchError(dispatch, ERROR_FETCH_USERS));
    };
}

export function removeUser(user) {
    return dispatch =>
        api
            .remove(user)
            .then(() => dispatch({ type: REMOVE_USER, user }))
            .catch(dispatchError(dispatch, REMOVE_USER_ERROR));
}

export function addUser(user) {
    return dispatch =>
        api
            .create(user)
            .then(newUser => dispatch({ type: ADD_USER, user: newUser }))
            .catch(dispatchError(dispatch, ADD_USER_ERROR));
}

export function updateUser(user) {
    return dispatch =>
        api
            .update(user)
            .then(newUser => dispatch({ type: UPDATE_USER, user: newUser }))
            .catch(dispatchError(dispatch, UPDATE_USER_ERROR));
}

export function changePassword(user, newPassword) {
    return dispatch =>
        api
            .changePassword(user, newPassword)
            .catch(dispatchError(dispatch, CHANGE_PASSWORD_ERROR));
}

export function validatePassword(password) {
    return dispatch =>
        api
            .validatePassword(password)
            .catch(dispatchError(dispatch, VALIDATE_PASSWORD_ERROR));
}
