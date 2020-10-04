const Enocean = require('../')
const RadioERP1 = Enocean.RadioERP1
console.log('testing D2-01-0B encoding...')
radio = RadioERP1.from({ payload: [0], id: 'ff815380' })
radio.encode({
  CMD: 6,
  qu: 1,
  'I/O': 0
},
{
  eep: 'd2-01-00',
  channel: 10,
  data: 6
}
)

console.log(radio)

radio.senderId = 'ff00ff00'
decoded = radio.decode('d2-01-00')

console.log(decoded)
