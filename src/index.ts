const noop = () => {}

export class GlobalState {
  state = {}
  private reactions = []
  createReaction(subscription, reaction) {
    this.reactions.push(new Reaction({
      subscription,
      reaction,
      globalState: this
    }))
  }
}

class Reaction {
  private subscription = null
  private reaction = null
  private globalState = null
  private destroySubscription = null
  private updatePlanned = false

  constructor({subscription, reaction, globalState}) {
    this.subscription = subscription
    this.reaction = reaction
    this.globalState = globalState

    this.destroySubscription = subscription({
      update: () => this.planUpdate(),
      state: globalState.state
    }) || noop
  }

  destroy() {
    this.destroySubscription()
  }

  private async planUpdate() {
    if (this.updatePlanned) {
      return
    }
    this.updatePlanned = true
    await new Promise((resolve) => {
      setImmediate(resolve)
    })
    this.update()
    this.updatePlanned = false
  }
  private update() {
    this.reaction({state: this.globalState.state})
  }
}
