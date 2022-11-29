
<a name="readme-top"></a>
<!-- PROJECT LOGO -->

<br/>
<div>
<h1  align="center">QuickVids</h1>
<p  align="center">

A social media platform for people to post videos, follows, like and comment using next.js for front-end, node.js for back-end, and sanity for database

<br  />

## Author
Vu Diep - vudiep411@gmail.com <br/>
Frank Salgado Gonzalez - franksalgado@csu.fullerton.edu
  
  
  

<!-- ABOUT THE PROJECT -->

## Overview 
<br/>
<img src="/public/images/overview1.png"/><br/>
<img src="/public/images/overview2.png"/><br/>


<a  href='https://quick-vids-app.vercel.app/'>Visit the fully deployed project</a>
<p  align="right">(<a  href="#readme-top">back to top</a>)</p>


### Built With
* [![Next][Next.js]][Next-url]
* [![Sanity][Sanity]][Sanity-url]
* [![Node.js][Node.js]][Node.js-url]


<p  align="right">(<a  href="#readme-top">back to top</a>)</p>


## App Architect

<img  src='/public/images/webarch.png'/>

## Database Design

<img src='/public/images/dbquickvids.png'/>

## Deployment
This application is deployed on [Vercel][vercel-url] <br/>

## Future Scaling
If scaling is required, I would migrate the database (since sanity service is expensive) and create a load balancer.
<img src='/public/images/lb.png'/>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Prerequisites

* [Node.js][Node.js-url]

* [npm][npm]

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

	```sh
	git clone https://github.com/vudiep411/QuickVids-App.git
	```

2. Install NPM packages
	```sh
	npm install
	```

3. Run the React Project
	```sh
	npm run dev
	```

4. Install Sanity

	```sh
	cd ./quickvids-backend
	npm install -g @sanity/cli
	```

5. Set up Sanity on web browser
visit <a  href="https://www.sanity.io/docs/getting-started">Sanity</a> to complete the set up and get the secret token.

6. Get <a href="https://console.cloud.google.com/apis/credentials/consent">google secret</a> to activate sign-in with google library
 
7. Create a *.env* file and place your sanity secret and google secret inside. See [.env.example](.env.example) for reference.

<br/>
<p><b>Note:</b></p>

>⚠ Sign up to get Sanity secret token and place it in a .env file after to start with sanity follow instructions and install all packages needed<br/>
>⚠ If you are planning to create more evironment variables, make sure to register them in next.config.json file<br/>
<img src='/public/images/nextconfig.png'/><br/>
>⚠ The client will be started at http://127.0.0.1:3000/ <br/>
>⚠ Sanity development server will be started at http://127.0.0.1:3333/ <br/>

<p  align="right">(<a  href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.
<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact
Project Link: [https://github.com/vudiep411/QuickVids-App]
<p  align="right">(<a  href="#readme-top">back to top</a>)</p>

  
 

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[vercel-url]: https://vercel.com
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[Sanity]: https://img.shields.io/badge/Sanity-red?style=for-the-badge&logo=stripe&logoColor=white
[Node.js]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=nodedotjs&logoColor=success
[Sanity-url]: https://www.sanity.io/
[Node.js-url]: https://nodejs.org/en/
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[consent]: https://console.cloud.google.com/apis/credentials/consent
[npm]: https://www.npmjs.com/
