import { components } from '../schemas/schema';

// Responses
export type SingleObjectResponse = components['schemas']['SingleObjectResponse'];
export type SingleObjectData = components['schemas']['SingleObjectData'];
export type MultipleObjectsResponse = components['schemas']['MultipleObjectsResponse'];
export type Meta = components['schemas']['Meta'];
export type Links = components['schemas']['Links'];
export type ObjectType = components['schemas']['ObjectType'];
export type ObjectId = components['schemas']['ObjectId'];

// Errors
export type ErrorResponse = components['schemas']['ErrorResponse'];
export type ErrorDetails = components['schemas']['ErrorDetails'];
export type ErrorParameter = components['schemas']['ErrorParameter'];
export type ErrorPointer = components['schemas']['ErrorPointer'];

// Requests
export type SingleObjectRequest = components['schemas']['SingleObjectRequest'];
export type SingleObjectBody = components['schemas']['SingleObjectBody'];
export type JsonPatch = components['schemas']['JsonPatch'];
export type JsonPatchOperation = components['schemas']['JsonPatchOperation'];
