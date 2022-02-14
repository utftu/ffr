import {GlobalState} from "./index";
import * as mobx from 'mobx'

const globalState = new GlobalState()

globalState.createReaction(
  ({update, state}) => {
    state.ffw.fields.name.subscribe('value', update)
    state.ffw.fields.age.subscribe('value', update)
    mobx.reaction(
      () => state.mobx.users.aleks.avatar,
      update
    )
  },
  ({state}) => {
    console.log(`name is ${state.ffw.fields.name.value}`)
    console.log(`age is ${state.ffw.fields.age.value}`)
    console.log(`avatar is ${state.mobx.users.aleks.avatar}`)
  }
)
