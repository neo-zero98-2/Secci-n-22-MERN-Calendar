import { http, HttpResponse } from 'msw'


export const Auth = [
    // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost:4000/api/auth/renew', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      ok: true,
      uid: "66988f44c7ff70013fbd6ae1",
      name: "test",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2Njk4OGY0NGM3ZmY3MDAxM2ZiZDZhZTEiLCJuYW1lIjoidGVzdCIsImlhdCI6MTcyMzUyNTUwMSwiZXhwIjoxNzIzNTMyNzAxfQ.dJaHyE11cGW6cATzR0C7aIAyi61Er7MS7Lhxv3CYEXo"
    }, { status: 200 })
  }),
  http.post('http://localhost:4000/api/auth/', () => {
    return HttpResponse.json({
      ok: true,
      msg: "login",
      uid: "66988f44c7ff70013fbd6ae1",
      name: "test",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2Njk4OGY0NGM3ZmY3MDAxM2ZiZDZhZTEiLCJuYW1lIjoidGVzdCIsImlhdCI6MTcyMzUyNDk2NSwiZXhwIjoxNzIzNTMyMTY1fQ.VQWxgqlP3JO67dxA-aCIq10gCyMbWxNORcIYcNB3dvU"
    }, { status: 200 })
  }),
  http.post('http://localhost:4000/api/auth/new', () => {

    return HttpResponse.json({
      ok: true,
      msg: "registro",
      uid: "66bae8a1eacb4b52c981ca05",
      name: "test1",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmJhZThhMWVhY2I0YjUyYzk4MWNhMDUiLCJuYW1lIjoidGVzdDEiLCJpYXQiOjE3MjM1MjUyODEsImV4cCI6MTcyMzUzMjQ4MX0.jwnO4yioXswePjO_FaOPNgCxGE-0G1XEMixCHrCcdHc"
    }, { status: 201 })
  })
]