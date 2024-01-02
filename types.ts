/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type TCategory = {
  id: string,
  name: string
}
export type TMenuItem = {
  id: string,
  name: string,
  ingredients: string,
  image: string,
  imageAlt?: string,
  author: string,
  createdAt: Date
  modifiedAt: Date
}
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user'
}
