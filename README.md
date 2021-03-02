## Sol Flow - ask with crypto, answer and earn crypto
![155825079_864464057447958_7231499166089927789_n](https://user-images.githubusercontent.com/17235885/109586623-38584680-7b0e-11eb-9335-cd12721a3b1d.png)
:video_camera:Demo:https://youtu.be/j44OSi7h-P8

:fire: It is getting late and deadline is creeping in, you can't make Solana program to distribute locked tokens to multiple addresses... You try asking a question on StackOverflow, however, nobody is answering(somebody has to know...)

:dollar: Your client tomorrow will not be happy... and you can pay any price to get that damn program working. 
Enter Sol Flow, you write down a question with your :shit: code samples, provide 5 SOL bounty and wait for someone to show up.

:brain: Several developers are refreshing Solana related questions tab, waiting for some easy bounties :moneybag:<br/>
Something showes up...<br/>
I see, that nooby probably never coded in RUST... Pathetic. 30mins later I upload working code with instructions how to run it. Someone jumped in faster and provided some links to Solana documentation(noob already read it)I am sure that my answer will be the best one because nobody is a better Solana developer than me!

:sunglasses: Nooby is happy, program is finally working! He upvotes an answer this way ensuring that our today's :guitar: star will get juicy 4 SOL(80%) bounty, other developers also jumped in and tried to help by providing some useful links, after all they deserved to share amoung them that portion of 1 SOL(20%).


## :hammer: What we have built?

For this hackathon we forked https://github.com/salihozdemir/stackoverflow-clone stackoverflow clone project and tried to implement incentives/rewards system with Solana.

:white_check_mark: -Implemented sollet wallet as a verification system<br/>
:white_check_mark: -Transfers(Questions/Answers) to the Solana's program address.<br/>
:white_check_mark: -Pooling in the single Solana program<br/>

Also tinkered with https://github.com/solana-labs/solana-program-library memo and shared-memory samples

Here's diagram showing how our program suppose to work:

![solflow](https://user-images.githubusercontent.com/17235885/109586594-2aa2c100-7b0e-11eb-9421-9ce48979ef35.png)


## :rocket: Tech Stack

- ReactJs
- NextJs
- Storybook
- PostCSS
- NodeJs
- Express
- MongoDB
- Mongoose

## :warning: Prerequisite

- node
- npm
- mongodb

## :cd: How to run local

```bash
# Clone this repository
$ git clone https://github.com/ArminasTomasevicius/Sol_flow/

# Go into the repository
$ cd Sol_flow

# Go into server
$ cd server

# Start mongodb locally
$ mongod

# Install dependencies
$ npm install

# Start the backend server
$ npm run dev

# On another terminal, go to the client folder
$ cd ../client

# Install dependencies
$ npm install

# Use the command below for Android devices
$ npm run dev

# To see the incomplete storybook components
npm run storybook
```

## :scroll: Todo

- [ ] Finish damn Solana program to make it distribute tokens to answerers addresses
- [ ] Successfully deploy to Heroku
- [ ] Currently we are using MongoDB to store public keys, questions and answers -> move to IPFS

## :memo: License

This project is made available under the MIT License.
