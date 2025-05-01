# Spaghetti - SOLID

## What is Spaghetti code?

+ Difficult to maintain
+ No clear structure
+ Highly couple
+ Hard to read
+ Hard to change (even for simple changes)
+ Contains duplication
+ Meaningless naming of variables
+ Global variables all over the code

## How does spaghetti code come to be?

+ No proper planning
+ Poor decisions
+ Quick fixes
+ Time pressure
+ Volatile project requirements
+ Lack of programming style rules
+ Developer lack of experience
+ No team guidelines, best practices or automation
+ No refactoring
+ Focusing on 90 % testing

## Why is it bad?

+ Hard to read (especially for new members of a team)
+ Increases cybersecurity risks (obscures the security weaknesses, duplication can help with this by fixing one part of
  the code but not the duplicated part)
+ Can take a longer time to implement new features

## When should we address it?

+ Painful to change anything because it easily breaks
+ Before implementing new features
+ If you see too many bugs come back over and over
+ Onboarding of new developers is a nightmare, and you know it
+ When the SOLID principles are violated

## How to fix it?

+ Communicate
+ Modularization
+ Documentation
+ Self-commenting code
+ Unit test
+ Follow SOLID principles

## SOLID

+ S - Single Responsibility Principle (SRP)
+ O - Open/Closed Principle
+ L - Liskov’s Substitution Principle (LSP)
+ I - Interface Segregation Principle (ISP)
+ D - Dependency Inversion Principle (DIP)
