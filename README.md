# ian.pw

My personal website.

Stack:

- NextJS/React
- Emotion
- MDX

## Developing

Use `nix-direnv` to source the `.envrc` in this project. Then do:

```
yarn
yarn dev
```

To package/run the app for production, run:

```
yarn build
yarn start
```

This website is a typical Next.JS application, thus it can easily be deployed to [Vercel](https://vercel.com).

### Deploying

Run `update-static-assets` to sync the static assets directory with AWS S3.

## License

GPL3
