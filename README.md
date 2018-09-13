# Twitter Remote Angular Jobs RSS

This is a [RSS feed](https://en.wikipedia.org/wiki/RSS) that lists tweets about remote jobs in the Angular ecosystem ([Angular 2+](https://angular.io/), [Ionic](https://ionicframework.com/), [NativeScript](https://www.nativescript.org/)). The tweets are gathered by [twitter-remote-angular-jobs-bot](https://github.com/nunoarruda/twitter-remote-angular-jobs-bot).

## Juiciest bits

You can find the most interesting stuff at [`functions/src/index.ts`](functions/src/index.ts).

## How to run locally

1. Install [Node.js](https://nodejs.org/en/)
2. Clone or fork this repository
3. Run the command `npm install` on the project folder and on the `functions/` folder
5. On the `functions/` folder run the command `npm run serve`

## Tech stack

[Node.js](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/), [node-rss](https://github.com/dylang/node-rss), and [Firebase](https://firebase.google.com/).
