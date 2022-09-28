![pizzatime](https://user-images.githubusercontent.com/82413454/192655528-6af22c8b-0303-4e1b-a18b-8db126ed0e45.jpeg)
# Background

Growing up in the early 90's, during the hay day of Teenage Mutant Ninja Turtles, turtle-power was unavoidable. Cartoons, movies, music, theatre... the heroes in a half shell were everywhere, and I loved every second of it. As any TMNT fan knows, if theres anything the ninja turtles were known for it was their love of pizza. I dont know if it was clever marketing, juvenile impressionism or some other mystical force, but the pizza's in the cartoon were magical. Any time the show was on, I wanted pizza; when I thought of pizza, I pictured ninja turtles pizza. This, of course, lead to one problem: All of the pizza I could get in reality could not live up to the ninja turtles pizza. Afterall a cartoon pizza is always perfect, the pie is always hot, the cheese is always melty and pulls when you grab a slice, always the perfect amount of sauce and the dough is always perfectly cooked. I have tried many pizza's, some have come closer than others but ultimately, none of which lived up to the fabled ninja turtles pizza. I have spent my life searching for the perfect ninja turtles pizza always coming up short, thus it is with great pleasure I present to you:
<br />
<br />


![Screenshot 2022-09-28 at 11-05-51 https __slicewars-dbad vercel app](https://user-images.githubusercontent.com/82413454/192815358-c3cbbae6-e7bb-42c7-a217-19c8311175ef.png)
# About

Slicewars is an application aimed at finding the closest pizza to the ninja turtles pizza. Utilizing the browsers geolocation API, a user receives two local pizza shops and can vote on which pizza more closely resembles the ninja turtles pizza and view the results of voting in their area.
![Screenshot 2022-09-28 at 11-09-57 https __slicewars-dbad vercel app](https://user-images.githubusercontent.com/82413454/192818798-63c7624b-b165-45d0-8721-6291db0c3637.png)

## Vote
![like-slicewars](https://user-images.githubusercontent.com/82413454/192821763-2546abae-56c4-401b-9e65-bd9dc30a9fc3.png)
Click the thumbs up icon to cast your vote!

![refresh-slicewars](https://user-images.githubusercontent.com/82413454/192821867-014be9e4-0eee-4f85-a92f-ea1b1a50a5fd.png)
Never tried either restaurant? No worries just refresh the contendors!
<br />
## Results
View the voting results for local restaurants!
<br />
![results-slicewars](https://user-images.githubusercontent.com/82413454/192822881-32d475ea-774e-42c0-b6e8-e42a93bdb2fe.png)
<br />
(I cannot wrap my head around why if you make pizza and hot dogs, the choice to go with hot dog for main image was made.)
<br />
<br />
# Inspiration
<iframe width="885" height="498" src="https://www.youtube.com/embed/PKy2lYEnhgs" title="Building a MODERN Full Stack App for FREE w/ NextJS 12, Typescript, Prisma and more - T3 Stack" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
The idea for this app came to me while researching new technologies, there is a lot of overlap with Roundest and I want to give credit where its due. 

![slicewars-whiteboard](https://user-images.githubusercontent.com/82413454/192639718-ddf91d67-005e-46eb-bb11-57e5191b9f39.png)
![slicewars-results-diagram](https://user-images.githubusercontent.com/82413454/192639724-8c04cfcc-6b67-46a6-ad11-6ceda3c2f335.png)



# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## Why are there `.js` files in here?

As per [T3-Axiom #3](https://github.com/t3-oss/create-t3-app/tree/next#3-typesafety-isnt-optional), we take typesafety as a first class citizen. Unfortunately, not all frameworks and plugins support TypeScript which means some of the configuration files have to be `.js` files.

We try to emphasize that these files are javascript for a reason, by explicitly declaring its type (`cjs` or `mjs`) depending on what's supported by the library it is used by. Also, all the `js` files in this project are still typechecked using a `@ts-check` comment at the top.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with the most basic configuration and then move on to more advanced configuration.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) (using @next version? [see v10 docs here](https://trpc.io/docs/v10/))

Also checkout these awesome tutorials on `create-t3-app`.

- [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [Build a full stack app with create-t3-app](https://www.nexxel.dev/blog/ct3a-guestbook)
- [A first look at create-t3-app](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)

## How do I deploy this?

### Vercel

We recommend deploying to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). It makes it super easy to deploy NextJs apps.

- Push your code to a GitHub repository.
- Go to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) and sign up with GitHub.
- Create a Project and import the repository you pushed your code to.
- Add your environment variables.
- Click **Deploy**
- Now whenever you push a change to your repository, Vercel will automatically redeploy your website!

### Docker

You can also dockerize this stack and deploy a container. See the [Docker deployment page](https://create-t3-app-nu.vercel.app/en/deployment/docker) for details.

## Useful resources

Here are some resources that we commonly refer to:

- [Protecting routes with Next-Auth.js](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)
