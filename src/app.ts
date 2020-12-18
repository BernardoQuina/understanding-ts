// Decorators
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(selector: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId)
    const p = new constructor()
    if (hookEl) {
      hookEl.innerHTML =  `<${selector}></${selector}>`
      hookEl.querySelector(selector)!.textContent = p.name
    }
  }
}

@WithTemplate('h1', 'app')
class PersonDecorators {
  name = 'Bernardo'

  constructor() {
    console.log('Creating person object...')
  }
}

const pers = new PersonDecorators

console.log(pers)