export class Company {
  constructor(
    public id: string,
    public name: string,
    public business: string,
    public slogan: string,
  ) { }
}

export class Employee {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public companyId: string,
    public jobTitle: string,
    public jobArea: string,
    public jobType: string,
  ) { }
}

export class Project {
  constructor(
    public id: string,
    public name: string,
    public department: string,
    public employeesId: string[],
    public companyId: string,
  ) { }
}

export class CompanyAddress {
  constructor(
    public id: string,
    public city: string,
    public country: string,
    public street: string,
    public state: string,
    public companyId: string,
  ) { }
}
