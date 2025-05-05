# Untangling Spaghetti Code: Apply DRY and SOLID principles in React

## What is Spaghetti code?

Many of us have encountered code that is difficult to read, hard to maintain, and tightly coupled with other modules,
data structures, or components. This kind of code is often fragile—difficult to reuse, move, or refactor without
introducing new issues. Functions tend to be long, complex, and responsible for too many tasks at once. In short, it’s
poorly written code, no matter how you look at it. As the codebase grows, it becomes increasingly difficult to work
with.

- Code is hard to read and maintain
- It’s tightly coupled with other parts of the system
- Fragile and prone to breaking during reuse or refactoring
- Functions are too long, complex, and do too much
- Overall, it’s poorly written code
- Problems get worse as the codebase grows

## How does spaghetti code come to be?

In our workplace, we’ve all faced projects with tight timelines where there’s little room for planning, design and
documentation for onboarding and best practices for the team. These
projects often may bring in new developers, sometimes with minimal experience in best practices. With the pressure of
deadlines, we tend to prioritize speed over quality—resulting in quick fixes (band-aids) and hacks instead of solid
solutions.
Instead of refactoring, we often just keep adding new features on top of problematic code. Poor communication is, in my
opinion, a major factor behind chaotic codebases. And let’s not forget those lone wolf programmers who make their own
rules or ignore the team’s best practices.

- Tight timelines leave little time for planning and design
- New programmers with limited experience are often added
- Speed is prioritized over quality, leading to hacks and quick fixes
- Instead of refactoring, new features are added on top of problematic code
- Poor communication contributes to chaotic codebases
- Lone wolf programmers ignore team best practices or create their own rules
- Volatile project requirements
- Focusing on testing metric instead of the right testing

## Why is it bad?

Spaghetti code is a problem because, like we talked about earlier, it’s tough to maintain—and that means more time spent
on fixes. And let’s be honest, time is money. It’s easy to break things when you try to add new features or make
changes. The codebase becomes a nightmare to scale, and developers end up stuck in constant “fix-it” mode instead of
actually building or improving things. It’s also a pain for new team members to understand, which slows everything down.
And in the end, all that messy code turns into a pile of technical debt… that no one ever really gets around to fixing.

- Spaghetti code is hard to maintain, which wastes time (and money)
- New features or changes can easily introduce bugs
- The codebase is difficult to scale
- Developers get stuck in constant "fix-it" mode
- New team members struggle to understand and contribute
- It creates long-standing technical debt that rarely gets addressed

## How to fix it?

Fixing spaghetti code starts with taking best practices seriously. That means following coding standards—tools like
Prettier and ESLint can help automate that. Even something as simple as good variable names makes a huge difference. Aim
for clean, self-explanatory code that’s modular and covered by unit tests.

Talk to your team. If the design doesn’t make sense, speak up. Ask questions, clarify requirements, and help mentor
newer developers.

Use solid principles—literally. DRY, SOLID, and common design patterns go a long way in keeping code clean and
maintainable. Don’t be afraid to refactor—fix messy logic, remove duplication, and improve structure when needed. And
finally, don’t skip the design and documentation phase. Taking time upfront saves a ton of headaches later.

- Take best practices seriously to avoid and fix spaghetti code
- Follow coding standards (use tools like Prettier and ESLint)
- Use clear, meaningful variable names
- Write clean, modular, and unit-tested code
- Communicate: speak up about confusing designs and unclear requirements
- Mentor newer developers and encourage collaboration
- Apply principles like DRY and SOLID, and use well-known design patterns
- Refactor regularly to fix bad logic and eliminate duplication
- Invest time in design and documentation early on

# Using DRY and SOLID Principles To Fix Spaghetti Code

In addition to modularization, documentation, and unit testing, I want to take it a step further and dig into how we can
apply the DRY principle and the SOLID principles to clean up and future-proof our code.

These principles aren’t just theoretical—they give us practical tools to avoid repeating ourselves, write clearer logic,
and build code that’s easier to test, extend, and maintain over time.

## DRY AND KISS

Dont Repeat Yourself. Keep It Simple.

These two principles—DRY and SOLID—can really help us clean up spaghetti code by guiding us toward writing cleaner, more
concise code. They’re great reminders to avoid duplicating logic and to keep things as simple as they need to be—nothing
more.

Honestly, duplication and unnecessary complexity are some of the most common things I see in spaghetti codebases. And
tackling those two issues alone can make a huge difference.

DRY Example:
Grabbing data from a cookie over and over.

KISS Example:
Server sending data that needs to be transformed on the FE.

## SOLID

+ S - Single Responsibility Principle (SRP)
+ O - Open/Closed Principle
+ L - Liskov’s Substitution Principle (LSP)
+ I - Interface Segregation Principle (ISP)
+ D - Dependency Inversion Principle (DIP)

### SRP (Single responsibility Principle)

A class or a module should have one and only one reason to change.

One thing at a time.
Each class or function should have only one job. If it’s doing too many things, it becomes harder to understand, test,
or change without breaking something.

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
import React, {useState} from 'react';

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
            body: JSON.stringify({email}),
        });

        fetch('/api/send-welcome-email', {
            method: 'POST',
            body: JSON.stringify({email}),
        });
    }

    return (
        <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)}/>
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
        body: JSON.stringify({email}),
    });
}

export async function sendWelcomeEmail(email: string) {
    await fetch('/api/send-welcome-email', {
        method: 'POST',
        body: JSON.stringify({email}),
    });
}

// registerUser.tsx
import React, {useState} from 'react';
import {isValidEmail} from '../utils/validation';
import {registerUser, sendWelcomeEmail} from '../services/userService';

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
            <input value={email} onChange={(e) => setEmail(e.target.value)}/>
            {error && <p>{error}</p>}
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

```

### Open/CLosed Principle

Software entities should be open for extension but closed for modification.

You should be able to add new features without rewriting existing code. This helps keep your system stable and avoids
breaking working parts.

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
    getDiscount() {
        return 20;
    }
}

class CustomerDiscount implements DiscountStrategy {
    getDiscount() {
        return 10;
    }
}

// We just create a new class here, name it StudentDiscount.

class DiscountContext {
    constructor(private strategy: DiscountStrategy) {
    }

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

If it walks like a duck…
Objects should be replaceable by instances of their subtypes without changing how the program works. Inheritance should
behave as expected.

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
interface Bird {
}

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

function List({children}: { children: ReactNode }) {
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
    return <h1 style={{backgroundColor: 'gray'}}>
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

function List({children}: { children: ReactNode }) {
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
    return <li style={{backgroundColor: 'gray'}}>
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

Keep things focused.
Don’t force code to implement things it doesn’t need. Split large interfaces into smaller, more specific ones.

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
    const user = {
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
    const user: User = {
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

### DIP (Dependency Inversion Principle)

High-level modules should not import anything from low-level modules. Both should depend on abstractions (e.g.,
interfaces). Abstractions should not depend on details. Details (concrete implementations) should depend on
abstractions.

Depend on abstractions, not concrete stuff.
High-level code shouldn’t rely on the details of low-level code. Use interfaces or abstract classes so parts of your
system can change independently.

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
    constructor(private messageService: IMessageService) {
    } // 👈 depends on abstraction

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

## Self Commenting Code

Self-commenting code (also called self-documenting code) is code that’s written clearly enough that it explains
itself—without needing extra comments to describe what it’s doing.

#### References

- SOLID principles, Robert C. Martin in his 2000 paper Design Principles and Design Patterns about software. Michael
  Feathers coined the SOLID acronym.
- https://en.wikipedia.org/wiki/Single-responsibility_principle
