

[![npm version](https://badge.fury.io/js/koa-neo4j.svg)](https://www.npmjs.com/package/koa-neo4j)
[![Build Status](https://travis-ci.org/yrong/koa-neo4j.svg?branch=master)](https://travis-ci.org/yrong/koa-neo4j)
[![Badge](https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg)](https://996.icu/#/en_US)
 [![GitHub release](https://img.shields.io/github/release/Naereen/StrapDown.js.svg)](https://GitHub.com/Naereen/StrapDown.js/releases/)

# BatteryBroadcasterAPI🚀

`BatteryBroadcaster` is a Restful API which is built on core-javascript routers to fetch and
collect devices battery informations as a streams. The coremodules, inspired by native battery packages ,to providing detailed information about the device battery (level, health, charging status, etc.). Now supports both IOS and Android 📱.



![BatteryBroadcaster LOGO](https://i.ibb.co/Q6WxYvd/Purple-Modern-Technology-Gaming-Logo.png "battery-broadcaster")

## Table of contents

1. [Introduction](#introduction)
2. [Install](#install)
3. [Usage](#usage)
    - [Defining an API](#defining-an-api)
    - [Authentication](#authentication)
    - [Lifecycle hooks](#lifecycle-hooks)
        - [check lifecycle](#check-lifecycle)
        - [preProcess lifecycle](#preprocess-lifecycle)
        - [execution lifecycle](#execution-lifecycle)
        - [postProcess lifecycle](#postprocess-lifecycle)
        - [postServe lifecycle](#postserve-lifecycle)
    - [Procedures](#procedures)
4. [License](#license)

## Introduction

This specification defines an API that provides information about the battery status of the hosting device.

The Battery State API gives a method for web developers to determine the battery status of the hosting device programmatically.A web developer must create a web application based on the assumption that the device's battery is sufficient for the work at hand even if they don't know the device's battery state.Because this standard leverages the Web IDL specification [WEBIDL], implementations that utilize ECMAScript to implement the APIs provided in this standard must do so in a way that is compatible with the ECMAScript Bindings provided in that specification.

- Database is exposed to the client, unless some explicit security mechanism is in place; one can *see* the
innards of the database by `View page source`
- There is no **one server to rule them all**, queries are `string`s, scattered around different
clients (web, mobile, etc.)
- Third-party developers might not be familiar with Cypher


 
In addition, it comes with *goodies*:

- Hassle-free [authentication](#authentication) and non-opinionated user management, you describe  how your
users and roles are stored, the framework provides authentication and role-based access management
- [Lifecycle hooks](#lifecycle-hooks), enabling one to tweak incoming and outgoing data based on one's needs, allowing
utilisation of the full power of `nodejs` and `javascript` ecosystem in the process
- [Procedures](#procedures) as a means for creating reusable blocks of backend code 

## Install

```bash
npm install batterystatusapi --save
```

## Usage

To get started quickly you can clone [koa-neo4j-starter-kit](https://github.com/yrong/koa-neo4j-starter-kit)

```javascript
var batterystatusapi = require('batterystatusapi');

    // Authentication config object, optional
    // authentication: {...} // explained below

    // APIs config object, optional (same effect could be achieved later by app.defineAPI)
    apis: [
        {
            method: 'POST',
            route: '/register',
            cypherQueryFile: './cypher/register.cyp'
        },
        {
            method: 'POST',
            route: '/login',
            cypherQueryFile: './cypher/login.cyp'
        }
    ],

    // express middlewares could be injected and will be loaded before api invoked,e.g:a koa static file serving middleware as following
    middleware:[convert(staticFile('./public'))]
});

app.listen(3000, function() {
    console.log('App listening on port 3000.');
});
```

### Defining an API

An API is defined by at least three keys:

`method`, specifies the request type (GET|POST|PUT|DEL)

`route`, the path to this API (e.g. the first API defined in `apis` above becomes http://localhost:3000/register [login])

`cypherQueryFile`, path to the corresponding `.cyp` file

Optionally you can specify roles whom can access this route with `allowedRoles` and
also [lifecycle hooks](#lifecycle-hooks).

As an example:

```javascript
app.defineAPI({
    // allowedRoles: ['admin', 'author']    // roles are case insensitive
    method: 'POST',
    route: '/register',
    cypherQueryFile: './cypher/register.cyp'
});
```

And then in `./cypher/create_article.cyp`:

```cypher
CREATE (a:UserModel {
    username: $username,
    password: $password,
    created_at: timestapm()
})
RETURN a
```




### Authentication
