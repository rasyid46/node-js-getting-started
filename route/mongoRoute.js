router.get('/lala', async (req, res, next) => {
    try {
      const user = await getUserFromDb({ id: req.params.id })
      res.json(user);
    } catch (e) {
      //this will eventually be handled by your error handling middleware
      next(e) 
    }
  })