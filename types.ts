/* eslint-disable no-unused-vars */

import { Orders, Users } from 'entities';

/* eslint-disable no-shadow */
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user'
}
export type TUser = {
  id: string,
  email: string,
  login:string,
  password: string,
  createdAt: string,
  role: UserRole
}
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
  createdBy: Users| undefined,
  category: TCategory | undefined
  price: number,
  weight: number,
  createdAt: string
  modifiedAt: string
}
export type TJWTUserData = {
  id: string,
  login: string,
  role: UserRole
}
export type TMenuItemCreateValues = Omit<TMenuItem, 'id'>
export type TUpdateValues = Partial<TMenuItemCreateValues>
export type TUserCreateValues = Omit<TUser, 'id'>
export type TSearchUserValues = Omit<TUser, 'id' | 'password' | 'createdAt'>
export type TOrderCreateValues = Omit<Orders, 'id' | 'orderNumber'>
