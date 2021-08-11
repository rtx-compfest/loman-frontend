const HOST = ''

export const signIn = async (data) => {
  try {
    const res = await fetch(HOST + '', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

export const signUp = async (data) => {
  try {
    const res = await fetch(HOST + '', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

export const logOut = async () => {
  try {
    const res = await fetch(HOST + '', {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}
