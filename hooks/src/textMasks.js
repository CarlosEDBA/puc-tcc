import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export const BRL = createNumberMask({
  prefix: '',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  //requireDecimal: true,
  //allowLeadingZeroes: true
})

export const DATE = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

export const RG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]
