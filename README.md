# Project Title

One Paragraph of project description goes here

[![Node](https://img.shields.io/badge/node-%3E%3D%2020.15.0-brightgreen.svg)](https://nodejs.org)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-0.4.0-yellow.svg)](https://conventionalcommits.org)


## API spec

To view API spec, your can use [Swagger UI](https://swagger.io/tools/swagger-ui/)

API spec URL: `localhost:3000/api/spec`

### Available endpoints

|endpoint по ТЗ  |APP endpoint  | метод |
|--|--|--|
| endpoint 1 | /api/v1/items | GET |--|
| endpoint 2 | /api/v1/users | PATCH | 


### Custom errors

#### PATCH /api/v1/users
```
"status": 400
"message": "Negative amount passed",
"code": "ENEGAMOUNT",
"type": "ServiceError"
```
```
"status": 400
"message": "not enough funds",
"code": "ENEGAMOUNT",
"type": "ServiceError"
```
```
"status": 404
"message": "Not found",
"code": "ENOTFOUND",
"type": "ServiceError"
```

## Database
 Use [scripts](./db/) to create database.

 ## Env variables
 ```sh
 cp .env.template .env
 ```
 
 See description [here](./.env.template)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With


## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **BNigmatov** - *Initial work* - [Repository Name](https://github.com/bnigmatov/project)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
