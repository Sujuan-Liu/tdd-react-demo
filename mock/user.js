export default {
  'POST /api/login': (req, res) => {
    res.send({
      code: 'success',
      data: {
        userInfo: {
          name: 'Admin'
        }
      },
      message: 'login success',
    })

  }
}