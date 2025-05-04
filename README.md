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
//-Not Following Principle

function registerUser(user: User) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    throw new Error('Invalid email');
  }
  database.save(user);
  emailService.sendWelcomeEmail(user.email);
}

//-Folling Principle

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
//-Not Following Principle
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
You should be able to add new functionality without changing existing code.

Example TS:
```typescript
//- Not following the principle

class Discount {
  getDiscount(type: string): number {
    if (type === 'associate') return 20;
    if (type === 'customer') return 10;
    //what if i need to add a new discount (student)?
    return 0;
  }
}

// -  Following the principle
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
//- Not following the principle

function ActionButton({ userType }: { userType: string }) {
  if (userType === 'admin') {
    return <button>Admin Panel</button>;
  } else if (userType === 'editor') {
    return <button>Edit Content</button>;
  } else if (userType === 'viewer') {
    return <button>View Only</button>;
  }
  return null;
}


// -  Following the principle

```

### LSP (Liskov's Substitution Principle)

### ISP (Interface Segregation Principle)

## DIP (Dependency Inversion Principle)

#### References
- SOLID principles, Robert C. Martin in his 2000 paper Design Principles and Design Patterns about software. Michael Feathers coined the SOLID acronym.
- https://en.wikipedia.org/wiki/Single-responsibility_principle
