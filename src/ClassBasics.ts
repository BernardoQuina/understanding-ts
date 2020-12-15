class Department {
  // private readonly id: string
  // private name: string

  private employees: string[] = [] // private: Typescript feature only in compilation

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


const accounting = new Department('d1','Accounting')

console.log(accounting.name)

accounting.addEmployee('Bernardo')
accounting.addEmployee('Rita')

// accounting.employees[2] = 'Mariana' this is possible if the field isn't private 

accounting.describe()
accounting.printEmployeeInfo()

// const accountingCopy = { describe: accountingDepartment.describe, name: 's' }

// accountingCopy.describe()