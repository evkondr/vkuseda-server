/* eslint-disable no-unused-vars */

import { Categories, Orders, Users } from 'entities';

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
  role: UserRole,
}
export type TCategory = {
  id: string,
  name: string,
}
export type TMenuItem = {
  id: string,
  name: string,
  ingredients: string,
  image: string | null,
  imageAlt?: string,
  createdBy: Users| undefined,
  category: Categories | undefined,
  price: number,
  weight: string,
  createdAt: string,
  modifiedAt: string,
  isInPromo: boolean,
}
export type TJWTUserData = {
  id: string,
  login: string,
  role: UserRole
}
export type TCartItem = {
  id: string,
  name: string,
  amount: number,
  price: number,
  totalPrice: number
}
export type Day = {
  id:string,
  name:string,
}
export type TMenuItemCreateValues = Omit<TMenuItem, 'id'>
export type TUpdateValues = Partial<TMenuItemCreateValues>
export type TUserCreateValues = Omit<TUser, 'id'>
export type TSearchUserValues = Omit<TUser, 'id' | 'password' | 'createdAt'>
export type TOrderCreateValues = Omit<Orders, 'id' | 'orderNumber'>
