abstract class Department {
  
  // private readonly id: string
  // private name: string

  protected employees: string[] = [] // private: Typescript feature only in compilation

  constructor(protected readonly id: string, public name: string) {
    // this.id = id
    // this.name = n
  }

  // Static methods and properties
  static fiscalYear = 2020

  static createEmployee(name: string) {
    return { name }
  }

  // forces extending classes to implement methods/properties
  abstract describe(this: Department): void

  addEmployee(employee: string) {
    // this.id = 'd2' Cannot assign to 'id' because it is a read-only property
    this.employees.push(employee)
  }

  printEmployeeInfo() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

// Inheriting and extending classes
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT')
  }

  describe() {
    console.log('IT Department - ID: ' + this.id)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string
  private static instance: AccountingDepartment

  describe() {
    console.log('Accounting Department - ID: ' + this.id)
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No report found.')
  }

  set mostRecentReport(text: string) {
    if (!text) {
      throw new Error('Please pass in a valid text!')
    }
    this.addReport(text)
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'ACC')
    this.lastReport = reports[0]
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('d2', ['Initial report.'])
    return this.instance
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return
    }
    this.employees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }
}

const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()

console.log(accounting, accounting2)

// console.log(accounting.name)
// accounting.mostRecentReport = 'new report coming soon'
// accounting.printReports()
// accounting.addEmployee('Bernardo')
// accounting.addEmployee('Rita')
// accounting.addEmployee('Max')
console.log(accounting.mostRecentReport)

// accounting.employees[2] = 'Mariana' this is possible if the field isn't private 

accounting.describe()
// accounting.printEmployeeInfo()

// using static method
const employee1 = Department.createEmployee('Max')
console.log(employee1)

const it = new ITDepartment('d2', ['Bernardo', 'Rita'])


console.log(it)
it.describe()

// const accountingCopy = { describe: accountingDepartment.describe, name: 's' }

// accountingCopy.describe()