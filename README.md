# Untangling Spaghetti Code: Apply DRY and SOLID principles in React

## What is Spaghetti code?
Many of us have had the experience with code that is hard to read,
hard to maintain and highly coupled in troublesome ways with other modules, data structures and other code.
This code cannot easily be reused, moved or refactored without making it more brittle than what it is. 
Functions are long, complex and doing so many things. Basically poorly written code in anyway you see it.
It becomes hard to work with as it grows.

+ No clear structure
+ Hard to read
+ Highly coupled
+ Difficult to maintain
+ Hard to change (even for simple changes)
+ Contains duplication
+ Contains meaningless variables names
+ Sometimes global variables all over the code
+ Long complex functions that do many things

## How does spaghetti code come to be?

In our work space, we run into projects that have hard timelines where there is no time for, 
planning and design. Sometimes these projects, because of the timelines and size, add new programmers 
with minimal experience on best practices. Sometimes the deadlines are so tight that we focus on speed
(hacks, band-aids) more than quality. We run into issues, and instead of refactoring we just add new features
on top of the troublesome logic. Poor communication, I believe, is a top culprit for chaotic codebases. A last thing
lone wolf programmers that make up their own rules or don't adhere to the team's best practices if written.

+ No proper planning
+ Poor decisions
+ Quick fixes on top of troubled coude
+ Time pressure
+ Volatile project requirements
+ Lack of programming style rules
+ Developer lack of experience
+ No team guidelines, best practices or automation
+ No refactoring
+ Focusing on testing metric instead of the right testing

## Why is it bad?

Spaghetti code is bad because, as mentioned before, it is hard to maintain, which in turn takes time. Time is money!
It can easily create bugs when adding new features or modifying code.  It creates a codebase that is poor in scalability.
It maintains the developers on fixing mode instead of productivity/creativity mode. Hard for new developers to understand and get to work.
Finally, this creates a long list of technical debts that... never gets worked on. 

+ Hard to read (especially for new members of a team)
+ Increases cybersecurity risks (obscures the security weaknesses, duplication can help with this by fixing one part of
  the code but not the duplicated part)
+ It Can take a longer time to implement new features

## How to fix it?

To fix spaghetti code, we have to be serious about the best practices. Best practices include coding standards (can be automated with prettier and eslint).
Proper naming for variables (something so simple yet so powerful). Well-written code (self-commenting, modular, unit tested). 
Communicate, speak up when the design is not making sense, clarify doubts on requirement, mentor new developers. 
Implement principles (Dry, SOLID) and well-known patterns. Refactor the code often (fix troubled logic, duplication). Spend time design and documentation.

+ Communicate
+ Modularization (Legos)
+ Documentation
+ Self-commenting code
+ Unit test
+ Follow SOLID principles

# Using DRY and SOLID Principles To Fix Spaghetti Code

In addition to Modularization, documentation and unit testing to fix spaghetti code, 
I want to dig a little deeper on how to use the DRY principle and  the SOLID principles in our code.

## DRY AND KISS

Dont Repeat Yourself. Keep It Simple. 

These two principles can help us with our spaghetti code by writing clean and concise code.
They remind us to avoid duplication in our code and to avoid unnecessary complexity.
Sometimes this is the majority of what I see in spaghetti codebases. 

DRY Example:
Grabbing data from a cookie over and over.

KISS Example:
Server sending data that needs to be massaged on the FE.

## SOLID

+ S - Single Responsibility Principle (SRP)
+ O - Open/Closed Principle
+ L - Liskov’s Substitution Principle (LSP)
+ I - Interface Segregation Principle (ISP)
+ D - Dependency Inversion Principle (DIP)

### SRP (Single responsibility Principle) 
A class or a module should have one and only one reason to change. 
In plain words, a class, module or function should only have one responsibility.  
One reason to change, responsible to only ONE actor (db administrator or accountant but not both).

Example TS:
```typescript
//- Not Following Principle

function registerUser(user: User) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    throw new Error('Invalid email');
  }
  database.save(user);
  emailService.sendWelcomeEmail(user.email);
}

//- Folling Principle

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUser(user: User): void {
  if (!isValidEmail(user.email)) {
    throw new Error('Invalid email');
  }
}

function saveUser(user: User): void {
  database.save(user); // abstracted for simplicity
}

function sendWelcomeEmail(email: string): void {
  emailService.sendWelcomeEmail(email);
}

function registerUser(user: User): void {
  validateUser(user);
  saveUser(user);
  sendWelcomeEmail(user.email);
}
```

Example React:
```typescript jsx
//- Not Following Principle
import React, { useState } from 'react';

function RegisterUser() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email');
      return;
    }

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    fetch('/api/send-welcome-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p>{error}</p>}
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

//- Following Principle

//utils/validation.ts
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//services/userService.ts

export async function registerUser(email: string) {
  await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function sendWelcomeEmail(email: string) {
  await fetch('/api/send-welcome-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// registerUser.tsx
import React, { useState } from 'react';
import { isValidEmail } from '../utils/validation';
import { registerUser, sendWelcomeEmail } from '../services/userService';

function RegisterUser() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!isValidEmail(email)) {
      setError('Invalid email');
      return;
    }

    try {
      await registerUser(email);
      await sendWelcomeEmail(email);
      setError('');
    } catch (err) {
      setError('Something went wrong');
    }
  }

  return (
          <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <p>{error}</p>}
            <button onClick={handleSubmit}>Register</button>
          </div>
  );
}

```

### Open/CLosed Principle
Software entities should be open for extension but closed for modification.
You should be able to add new functionality without changing existing code. Decoupling.

Example TS:
```typescript
//- Not Following Principle

class Discount {
  getDiscount(type: string): number {
    if (type === 'associate') return 20;
    if (type === 'customer') return 10;
    //what if i need to add a new discount (student)?
    return 0;
  }
}

// - Following Principle
interface DiscountStrategy {
  getDiscount(): number;
}

class AssociateDiscount implements DiscountStrategy {
  getDiscount() { return 20; }
}

class CustomerDiscount implements DiscountStrategy {
  getDiscount() { return 10; }
}

// We just create a new class here, name it StudentDiscount.

class DiscountContext {
  constructor(private strategy: DiscountStrategy) {}
  getDiscount() {
    return this.strategy.getDiscount();
  }
}

const discountContext = new DiscountContext(new CustomerDiscount());

console.log(discountContext.getDiscount());
```

Example React:
```typescript jsx
//- Not Following Principle

function Button({userType}: { userType: string }) {
    if (userType === 'associate') {
        return <button style={{backgroundColor: 'blue'}}>Associate Dashboard</button>;
    } else if (userType === 'customer') {
        return <button style={{backgroundColor: 'yellow'}}>Customer Dashboard</button>;
    }
    return null;
}


function App() {
    const userType = useUserType();

    return <section>
        <header>
            App Dash
        </header>
        <div>
            <Button userType={userType}></Button>
        </div>
    </section>
}


// - Following Principle

function Button({color, caption = 'Button', onClick}: { color: string, caption: string, onClick?: () => void }) {
    return <button style={{backgroundColor: color}} onClick={onClick}>
        {caption}
    </button>;
}

function AssociateButton() {
    return <Button color={'blue'} caption={'Associate Dashboard'} onClick={() => alert('Associate Dashboard')}/>;
}

function CustomerButton() {
    return <Button color={'yellow'} caption={'Customer Dashboard'} onClick={() => alert('Customer Dashboard')}/>;
}

const userTypeButtonMap: Record<string, () => JSX.Element> = {
    associate: AssociateButton,
    customer: CustomerButton,
};

export default function App() {
    const userType = 'associate';
    const UserTypeButton = userTypeButtonMap[userType];

    return <section>
        <header>
            App Dash
        </header>
        <div>
            <UserTypeButton/>
        </div>
    </section>
}

```

### LSP (Liskov's Substitution Principle)
Objects of a superclass may be replaced with objects of a subclass without breaking the application

Example TS:
```typescript

//- Not Following Principle

//superclass
class Bird {
    fly(): void {
        console.log("Flying");
    }
}

//subclass
class Sparrow extends Bird {
    fly(): void {
        console.log("Sparrow flying");
    }
}

//subclass
class Ostrich extends Bird {
    fly(): void {
        throw new Error("Ostriches can't fly!");
    }
}

function letTheBirdFly(bird: Bird) {
    bird.fly();
}

const sparrow = new Sparrow();
letTheBirdFly(sparrow);

const ostrich = new Ostrich();
letTheBirdFly(ostrich); // Runtime Error


//- Following Principle

//interface
interface Bird {}

//inteface
interface FlyingBird extends Bird {
  fly(): void;
}

//class implementing Flyingbird interface
class Sparrow implements FlyingBird {
  fly(): void {
    console.log("Sparrow flying");
  }
}

//class implementing Bird interface
class Ostrich implements Bird {
  // No fly method
}

function letFlyingBirdFly(bird: FlyingBird) {
  bird.fly();
}

const sparrow = new Sparrow();
letFlyingBirdFly(sparrow); // 

const ostrich = new Ostrich();
letFlyingBirdFly(ostrich); // Compile Error
```

Example React USING COMPOSITION:
```typescript jsx

//- Not Following Principle

import {ReactNode} from "react";

function List({children}:{children:ReactNode}) {
  return <ul>
    {children}
  </ul>
}

function ListItem({children}: { children: ReactNode }) {
  return <li>
    {children}
  </li>
}

//here the SelectedListItem is using a h1 element not a li. h1 elements have different attributes than li elements.
function SelectedListItem({children}: { children: ReactNode }) {
  return <h1 style={{backgroundColor:'gray'}}>
    {children}
  </h1>
}

export default function App() {
  return (
          <div>
            <List>
              <ListItem>Item One</ListItem>
              <SelectedListItem>Item Two</SelectedListItem>
              <ListItem>Item Three</ListItem>
            </List>
          </div>
  )
}

//- Following Principle (Using Composition)

import {ReactNode} from "react";

function List({children}:{children:ReactNode}) {
  return <ul>
    {children}
  </ul>
}

function ListItem({children}: { children: ReactNode }) {
  return <li>
    {children}
  </li>
}

function SelectedListItem({children}: { children: ReactNode }) {
  return <li style={{backgroundColor:'gray'}}>
    {children}
  </li>
}

export default function App() {
  return (
          <div>
            <List>
              <ListItem>Item One</ListItem>
              <SelectedListItem>Item Two</SelectedListItem>
              <ListItem>Item Three</ListItem>
            </List>
          </div>
  )
}


```

### ISP (Interface Segregation Principle)
No code should be forced to depend on methods it does not use.

Example TS:
```typescript

//- Not Following Principle
interface Printer {
  print(doc: string): void;
  scan(doc: string): void;
}

class MultiFunctionPrinter implements Printer {
  print(doc: string): void {
    console.log("Printing document:", doc);
  }

  scan(doc: string): void {
    console.log("Scanning document:", doc);
  }
}

class FaxPrinter implements Printer {
  print(doc: string): void {
    console.log("Fax printing document:", doc);
  }

  // FaxPrinter shouldn't need to implement scan, but it does due to the large interface
  scan(doc: string): void {
    throw new Error("FaxPrinter cannot scan!");
  }
}

//- Following Principle

// Segregated Interfaces
interface Printer {
  print(doc: string): void;
}

interface Scanner {
  scan(doc: string): void;
}

class MultiFunctionPrinter implements Printer, Scanner {
  print(doc: string): void {
    console.log("Printing document:", doc);
  }

  scan(doc: string): void {
    console.log("Scanning document:", doc);
  }
}

class FaxPrinter implements Printer {
  print(doc: string): void {
    console.log("Fax printing document:", doc);
  }
}

// FaxPrinter doesn't need to implement `scan` anymore because it's no longer forced

```

Example React:
```typescript jsx

//- Not Following Principle
interface User {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
  token: string;
  type: 'user' | 'admin';
}


function LoggedInUser({user}: { user: User }) {
  return <div>
    {
      user?.type === 'admin' && user?.token ? <h1>Welcome to the <strong>admin</strong> page {user?.name}</h1> :
              <h1>Welcome to the <strong>user</strong> page {user?.name}</h1>
    }
  </div>
}

export default function App() {
  const user= {
    name: 'James',
    email: 'james@google.com',
    phone: '567.655.5566',
    address: {
      street: '123 Main Street',
      city: 'Bentonville',
      state: 'Ar',
      zip: '72712'
    },
    token:'1234567890',
    type: 'admin' as const,
  }

  return (<LoggedInUser user={user}/>)
}


//- Following Principle
interface UserBase {
  name: string;
  token: string;
  type: 'user' | 'admin';
}

interface User extends UserBase {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
}

function LoggedInUser({name, token, type}: UserBase) {
  return <div>
    {
      type === 'admin' && token ? <h1>Welcome to the <strong>admin</strong> page {name}</h1> :
              <h1>Welcome to the <strong>user</strong> page {name}</h1>
    }
  </div>
}

export default function App() {
  const user:User = {
    name: 'James',
    email: 'james@google.com',
    phone: '567.655.5566',
    address: {
      street: '123 Main Street',
      city: 'Bentonville',
      state: 'Ar',
      zip: '72712'
    },
    token: '1234567890',
    type: 'admin' as const,
  }

  return (<LoggedInUser name={user.name} token={user.token} type={user.type}/>)
}

```

## DIP (Dependency Inversion Principle)
High-level modules should not import anything from low-level modules. Both should depend on abstractions (e.g., interfaces).
Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.

Example TS:
```typescript

//- Not Following Principle

// Low-level module
class EmailService {
  sendEmail(message: string) {
    console.log(`Email sent: ${message}`);
  }
}

// High-level module
class OrderService {
  private emailService = new EmailService(); // 👈 hard dependency

  placeOrder() {
    console.log("Order placed.");
    this.emailService.sendEmail("Your order has been placed!");
  }
}

//- Following Principle

// Abstraction
interface IMessageService {
  send(message: string): void;
}

// Low-level module
class EmailService implements IMessageService {
  send(message: string): void {
    console.log(`Email sent: ${message}`);
  }
}

class SMSService implements IMessageService {
  send(message: string): void {
    console.log(`SMS sent: ${message}`);
  }
}

// High-level module
class OrderService {
  constructor(private messageService: IMessageService) {} // 👈 depends on abstraction

  placeOrder() {
    console.log("Order placed.");
    this.messageService.send("Your order has been placed!");
  }
}

// Usage
const emailService = new EmailService();
const smsService = new SMSService();

const order1 = new OrderService(emailService);
order1.placeOrder();

const order2 = new OrderService(smsService);
order2.placeOrder();
```

Example React:
```typescript jsx

//- Not Following Principle
const SignIn = () => {
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(e.currentTarget);
      const results = await fetch.post("https://service.api.com/sign-in", formData);
      const data = await results.json();

      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
          <form onSubmit={handleSignIn}>
            <input name="username" placeholder="Username"/>
            <input name="password" placeholder="Password"/>
            <button type={"submit"}>Submit</button>
          </form>
  );
};

//- Following Principle

const UserForm = ({onSubmit}: { onSubmit: () => void }) => {
  return (
          <form onSubmit={onSubmit}>
            <input name="username" placeholder="Username"/>
            <input name="password" placeholder="Password"/>
            <button type={"submit"}>Submit</button>
          </form>
  );
};


const SignIn = () => {
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(e.currentTarget);
      const results = await fetch.post("https://service.api.com/sign-in", formData);

      return await results.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (<UserForm onSubmit={() => console.log('On SignIn')}/>)
};


const SignUp = () => {
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(e.currentTarget);
      const results = await fetch.post("https://service.api.com/sign-up", formData);

      return await results.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (<UserForm onSubmit={() => console.log('On SignUp')}/>)
};

export default function App() {
  const type = 'signin';

  return (
          type === 'signin' ? <SignIn/> : <SignUp/>
  )
}

```


#### References
- SOLID principles, Robert C. Martin in his 2000 paper Design Principles and Design Patterns about software. Michael Feathers coined the SOLID acronym.
- https://en.wikipedia.org/wiki/Single-responsibility_principle
