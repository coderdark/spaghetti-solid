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

### Open/CLosed Principle

### LSP (Liskov's Substitution Principle)

### ISP (Interface Segregation Principle)

## DIP (Dependency Inversion Principle)
