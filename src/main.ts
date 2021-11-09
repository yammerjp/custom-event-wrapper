
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
