import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/models/user.model";


export const createUser = createAction( '[User] Create User', props<{ user: UserModel}>() );
export const createUserSuccess = createAction( '[User] Create User Success', props<{ user: UserModel }>() );
export const createUserFailure = createAction( '[User] Create User Failure', props<{ error: string }>() );

export const getUser = createAction( '[User] Get User', props<{ id: string | null }>() );
export const getUserSuccess = createAction( '[User] Get User Success', props<{ user: UserModel }>() );
export const getUserFailure = createAction( '[User] Get User Failure', props<{ error: string }>() );
