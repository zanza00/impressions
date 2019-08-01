# Have you got some impressions?

A full stack exercise in retreiving data from a file.

## How to run

This project uses `docker-compose` to build and run on you local machine. (refer to this [guide](https://docs.docker.com/compose/install/) )

simply run from the root directory

```sh
docker-compose up
```

and then navigate to [localhost](http://localhost/)

if you want to force a new build after some code changes use the `--build` flag

```sh
docker-compose up --build
```

## Development

This project has a clear separation between front-end and back-end. Despite this uses nodejs, typescript and yarn for both.

### Back-end

Navigate to the `api` folder, install dependencies with `yarn` and start the application using `yarn start`.

It uses `express` for the server and uses `io-ts` for validation of the csv file, for actual reading the file it uses `papa parse`

You can test that everything is good by using this curl

```sh
❯ curl --request GET \
  --url http://localhost:3001/health
{"currentTimeUtc":"2019-08-01T13:11:22.897Z"}
```

### Front-end

Navigate to the `web` folder, install dependencies with `yarn` and start the application using `yarn start`. Then navigate to [localhost:3000](http://localhost:3000/)

This project uses `create-react-app` with hooks and `rsuite` for the components

## Caveats

- the validation of `io-ts` is only present in the back-end, it would be cool to have it also in the front-end and maybe have the ability to share models between the two app (this is a build issue)
- the UX of the client is pretty much horrible :P
- no tests in both applications 😢
- Error handling is very crude where is present
