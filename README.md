# url-shortener-microservice 

### URL shortening app using Node.js. 

Front-end rendered with Embedded JavaScript. 

When the user submits a URL in a field, our Express server makes an Ajax POST submission to the 'api/shorten' endpoint. 

We store the submitted URL in a database (MongoDB), and the app returns a shortened URL, which we generate on the server using the 'shortid' npm package.

Try it out [here](https://shortenurlpls.herokuapp.com)

![](url-shortener.gif)


