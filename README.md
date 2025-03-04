# An app for meditating with a piece of artwork

This application asks users to slow down and sit with a single piece of artwork for a duration of 10 minutes. It shows the user a random piece of artwork and persists the duration spent.

## Install
```bash
  npm i
```

## Run the application
```bash
  npm run dev
```
You should be able to navigate to http://localhost:5173/

## API

Images are pulled from the [MET Api](https://metmuseum.github.io/). Once the image is fetched it is cached in localstorage.

## Persisting Data

The times for each sitting is stored in a [supabase](https://supabase.com/) db, where the info can be viewed in a dashboard or visualization

