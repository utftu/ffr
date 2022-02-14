import mobx from 'mobx'

const user = mobx.observable({
  user1: {
    user2: {
      name: 'alex'
    }
  }
})

mobx.reaction(() => user.user1, (user2) => {
  console.log('-----', 'user2', user2)
})


mobx.runInAction(() => {
  user.user1.user2.name = 'hie'
})

