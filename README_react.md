# Our front end.

Welcome!
 
It is extremely unlikely that you guys will need to mess around with css.. but let me just warn you it is extremely annoying!
## Prerequisites
you will definately need npm installed, there is a possibility that you may need to install yarn, im not entirely sure.

install the dependencies in the normal way.
```$xslt
npm install
```
Start the development server. this will update the app in the browser when changes are saved, sort of like nodemon, it will take a few mins to compile the app once you first start the dev server, please be patient, this build is stable.

```bash
npm start
```
[watch this video](https://www.youtube.com/watch?v=sBws8MSXN7A)- on how to use react and the basics of props and components, 
you will need about an hour and a half lol.

Every component will be placed in a directory that will also store its further sub components,
so App.js is the parent, it has 3 components, the app bar, the side bar, the app screen which is determined by the url route,
and will show any of the components in the `src/Components` directory. any of the sub direcories in `src/Components`
will contain the custom components we created.

The best thing about react is the inline java script, so the client code that was created will be very easily integrated once weve built the front end.

Lastly you may want to install `react code snippets` in your ide and typing `rcc` followed by`tab` will generate a react component class that has the name of the js file you created. the format for react component classes is:
```javascript
import React, {Component} from 'react';

class Order extends Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default Order;
```    

1) [Using Grommet in an existing app tutorial](https://github.com/grommet/grommet-starter-existing-app)
2) [Grommet Storybook](https://storybook.grommet.io) - a lot of examples on how to use our components. Most of them are not real app scenarios though. They are there to illustrate our different props.
3) [Grommet Sandbox](https://codesandbox.io/s/github/grommet/grommet-sandbox) - more friendly when you want to edit and play with the examples, also does not have real app scenarios.
4) [Grommet Vending](https://github.com/grommet/grommet-vending) - a sample app done in v2.
5) [Grommet Controls](https://grommet-nextjs.herokuapp.com/add-ons) - higher level grommet components maintained by one of our external contributors [Atanas Stoyanov](https://github.com/atanasster).
6) [Grommet Site](https://github.com/grommet/grommet-site) - site for v2 implemented in grommet v2, of course.
7) [Grommet Slack Inviter](http://slackin.grommet.io/) - don't forget to join our awesome community!
8) [Grommet components list](https://v2.grommet.io/components)- you can find all the components grommet has to offer like menus etc.
