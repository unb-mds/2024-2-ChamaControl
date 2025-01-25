const request = require('supertest')
const express = require('express')

const app = express()

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World')
})

describe('GET /hello', () => {
  it('should return Hello World', async () => {
    const res = await request(app).get('/hello')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toBe('Hello World')
  })
})
