## Mastering React full-stack development

I see, you love React like we do ... and you want to become a full-stack developer. You want to work with databases, servers, system engineering and also you want to make a client work as well. Great, this book is for you!

We will guide you to the whole process of making the full-stack development process works. During this book we will create a publishing application. Why publishing app? In general, the publishing sites create content of thoudsands articles per year, some of those articles are extremely popular - so the full-stack setup has to be first-grade enterprise. We will show you how to build a scalable publishing apps and deploy it on Amazon AWS. You will also learn docker and continious integration stuff. This book will be a great reference for you in case if you will want to make a full-stack app on your own.

We are giving you "one-stop book" for full-stack development. 

### Technical stack we will use
In this book we do assume that you are familiar with JavaScript (ES5, ES6) and we will also introduce you to some mechanism from ES7 and ES8. 

For the client-side you will use React.js which already you have to be familiar of as we won't discuss React's API in details.

For data management on the client-side we will use Redux. We will also show you how to setup the server-side rendering with Redux.

As a database, you will learn how to use MongoDB alongside with Mongoose. The second one is an object data modeling library that provides a rigorous modeling enviroment for your data. It enforces a structure and in the same time it also allows to keep the flexibility that makes MongoDB so powerful.

Node.js and Express.js is a standard choice for a front-end developer in order start a full-stack development. I would mention that we have considered Koa.js for that book, but because we will use an innovative client<->backend data fetching mechanism created by Netflix, then our choice is Express as it has best libraries to support the Falcor's data fetching library.

I must to say to you something very important: WE WILL USE NETFLIX FALCOR and this choice will boost your productivity in full-stack development by 20-30% in comparision to old RESTful approach of builidng Single-Page-Apps. It's really exciting that I am honored to introduce you for this Falcor's data fetching library. 

I believe you will love Falcor because of it's simplicity and your observations about how much time it will save you when doing full-stack. I will explain in details later through the book why it is so efficient to use this data fetching library instead of standard process of building RESTful API.


Generally, everywhere we will use an object notation (JSON) - React as it's library, is using heavility it for diffing the Virtual DOM (under the hood). Redux for it's single state tree container uses a JSON tree as well. Netflix Falcor's library also is using an advanced concept called Virtual JSON graph (we will describe it in details later). Finally, mongoDB is also a documents' based database. 

JSON everywhere - this setup will improve our productivity by 25%+ mainly because of Falcor.

