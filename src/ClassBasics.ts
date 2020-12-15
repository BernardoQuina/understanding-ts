class Department {
  // private readonly id: string
  // private name: string

  protected employees: string[] = [] // private: Typescript feature only in compilation

  constructor(private readonly id: string, public name: string) {
    // this.id = id
    // this.name = n
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`)
  }

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
}

class accountingDepartment extends Department {
  private lastReport: string

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

  constructor(id: string, private reports: string[]) {
    super(id, 'ACC')
    this.lastReport = reports[0]
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

const accounting = new accountingDepartment('d1',['Initial accounting report'])

console.log(accounting.name)
accounting.mostRecentReport = 'new report coming soon'
accounting.printReports()
accounting.addEmployee('Bernardo')
accounting.addEmployee('Rita')
accounting.addEmployee('Max')
console.log(accounting.mostRecentReport)

// accounting.employees[2] = 'Mariana' this is possible if the field isn't private 

accounting.describe()
accounting.printEmployeeInfo()

const it = new ITDepartment('d2', ['Bernardo', 'Rita'])
console.log(it)

// const accountingCopy = { describe: accountingDepartment.describe, name: 's' }

// accountingCopy.describe()