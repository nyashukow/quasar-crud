import { User } from 'types/models'
import useAxios from './useAxios'

export default function () {
  const axios = useAxios()

  const fetchUsers = async (): Promise<User[]> => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => response.data as User[])
  }

  const fetchUserById = async (id: number): Promise<User> => {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.data as User)
  }

  const createUser = async (user: User): Promise<User> => {
    return axios.post('https://jsonplaceholder.typicode.com/users', user)
      .then(response => response.data as User)
  }

  const updateUser = async (user: User): Promise<User> => {
    if (!user.id) {
      throw new Error('user.id not defined')
    }
    return axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
      .then(response => response.data as User)
  }

  const removeUser = async (user: User): Promise<User> => {
    if (!user.id) {
      throw new Error('user.id not defined')
    }
    return axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .then(() => user)
  }

  return {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    removeUser
  }
}
