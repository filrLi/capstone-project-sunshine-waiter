import jwtDecode from 'jwt-decode'

import BaseProvider from '../BaseProvider'
// import { deleteCookie } from '../../authenticate/Cookies'

export const getRestaurants = (token, callback = () => {}) => {
  if (token !== undefined) {
    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }
    BaseProvider.get('/restaurants', config)
      .then(res => {
        callback(res.data.data)
      })
      .catch(err => console.log({ err }))
  }
}

export const createRestaurant = (token, param, callback = () => {}) => {
  if (token !== undefined) {
    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }
    BaseProvider.post('/restaurants', param, config)
      .then(res => {
        alert(
          'Congrats restaurant ' +
            res.data.data.name +
            ' is ' +
            res.statusText +
            '!'
        )
      })
      .catch(err => console.log({ err }))
  }
}

export const deleteRestaurant = (token, id) => {
  if (token !== undefined) {
    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }
    BaseProvider.delete('/restaurants/' + id, config)
      .then(res => {
        console.log({ res })
        alert(res.data.message)
      })
      .catch(err => console.log({ err }))
  }
}
