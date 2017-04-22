<small>**THE ROAD TO A**</small>
# REACT <blue>COMPONENT</blue> LIBRARY
---
code example
```javascript
marked.setOptions({
  highlight: (code) => {
    console.log('%c code ', 'background-color:#f1c40f; color: white; font-weight: bold; padding: 4px 0;', code)

    return highlight(code, Prism.languages.javascript)
  }
})

```
---
Hi I'm Daniel from Blendle
---
Component Library? Why?
---
Why not?
---
So let’s talk about a day in the life of a front end developer
---
I like beautiful user interfaces …
---
… I love beautiful code …
---
… but my boss likes deadlines
---
🤔
---
Finding the balance between delivering state of the art UI interactions and shipping a feature as adequate as possible because it adds value to the business is one of the hardest tasks of a developer.
---
So yeah, we wanted to make that less painful
---
Designers ❤️ Developers
---
1. Designs go in
2. Code comes out (React)
3. CSS gets parsed (CSS modules)
4. Components are tested (Unit tests)
5. A package gets generated (react-styleguidist)
---
About react-styleguidist
---
What do we like about it?
---
Now let’s dive into a component
---
Cool? It’s only half the story.
---
We were forced to use best practices in a natural way
---
About styles
---
Global styles are the enemy
---
[image of sass folder]
---
So… inline styles then?
---
[image of ugly DOM]
---
- syntax is ‘meh’ at best
- hard to use with pseudo selectors
- hard to  use with media queries
- hard to use with animations
- no pre/post processing
- no caching of stylesheets
- and don’t forget about the designers
---
CSS modules it is
---
- It’s regular CSS
- You import CSS like a javascript file
- In JS it’s an object, where CSS classes are object properties
- Classnames are hashed in build, so never collide
- Global styles still possible when needed
- Use pre/post processors
---
What did we learn?
---
About testing
---
We don’t believe 100% test coverage is a great goal
---
And yet we test everything in the component library …
---
Why?
---
As long as the unit tests pass, the clients using the component will keep working
---
How?
---
So… no downsides?
---
Recap
---
It’s not about the tools we used, it’s about the lessons we learned
---
You told me you’d get the business rooting for a project like this.
---
It’s your responsibility as a developer
---
- Understand the needs of the business
- Explain how your fancy component library and testing habits benefit the business in the short term and (even more) in the long term.
- Understand when you have to make concessions and when you absolutely can not
- Always explain why you’re doing things
---
Finding the balance between delivering state of the art UI interactions and shipping a feature as adequate as possible because it adds value to the business is one of the hardest tasks of <del>a developer</del> my job.
---
I like beautiful user interfaces …
---
… I love beautiful code …
---
… but <del>my boss</del> you like deadlines
---
👍
