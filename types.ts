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
  image: string | null,
  imageAlt?: string,
  createdById: string | null,
  categoryId: TCategory | null
  price: number,
  weight: number,
  createdAt: string
  modifiedAt: string
}
export type TMenuItemCreateValues = Omit<TMenuItem, 'id'>

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user'
}
