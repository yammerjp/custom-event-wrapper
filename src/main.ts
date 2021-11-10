
console.log('hello');

addEventListener('event-name', (event: Event) => {
  console.log('event listener is running');
  console.log('detail:')
  if (event instanceof CustomEvent) {
    console.log(event.detail)
  } else {
    console.error('this is not custom event');
  }
});

const customEvent = new CustomEvent('event-name', { detail: {
  any: "object"
} });

dispatchEvent(customEvent);

dispatchEvent(new Event('event-name'))

type EventPayload = {
  payloadNumber: number
  payloadString: string
}

const customEventWrapperNameHead = "custom-event-wrapper-"

function EventSender(name: string, payload: EventPayload) {
  const customEvent = new CustomEvent(`${customEventWrapperNameHead}${name}`, { detail: payload })
  dispatchEvent(customEvent)
}

function EventReceiver(name: string, callback: (payload: EventPayload) => void) {
  addEventListener(`${customEventWrapperNameHead}${name}`, (event: Event) => {
    if (event instanceof CustomEvent) {
      callback(event.detail)
    }
  })
}

class CustomEventWrapper<T> {
  nameHead = 'custom-event-wrapper-'
  name: string
  constructor(name: string) {
    this.name = name

  }
  send(payload: T) {
    const customEvent = new CustomEvent(`${this.nameHead}${this.name}`, { detail: payload })
    dispatchEvent(customEvent)
  }
  receive(callback: (payload: T) => void) {
    addEventListener(`${customEventWrapperNameHead}${this.name}`, (event: Event) => {
      if (event instanceof CustomEvent) {
        callback(event.detail)
      }
    })
  }
}

type HogeCustomEventPayload = {
  'hoge': string
  'fuga': number
}


class HogeCustomEventWrapper extends CustomEventWrapper<HogeCustomEventPayload> {
  constructor() {
    super( 'hoge')
  }
}

const hogeCustomEventWrapper = new HogeCustomEventWrapper()

export { hogeCustomEventWrapper }

hogeCustomEventWrapper.receive(console.log)
hogeCustomEventWrapper.send({ hoge: 'hogestring', fuga: 3 })

