MarkRabey
=========
A theme for [Ghost](http://ghost.org) created by [Mark Rabey](http://markrabey.com). You can view the current version [here](http://markrabey.com).
I'll think of a new name soon.

##Features
1. Google Analytics code
2. [Open Graph](https://developers.facebook.com/docs/opengraph) (Facebook) meta tags for all pages and posts
3. [Twitter Cards](https://dev.twitter.com/docs/cards) meta tags for all pages and posts
4. Optimized [title tags](http://markrabey.com/2014/07/02/title-tags/) and [meta descriptions](http://markrabey.com/2014/07/08/meta-descriptions/)
5. [Schema](http://schema.org) data added to posts for additional SEO and data highlighting
6. Social Media sharing links on posts
7. Related Posts displayed at the bottom of each post
8. [Disqus](https://disqus.com/) comments on posts
9. Syntax Highlighting Support
10. Minified CSS

___
##To Use

###Setup
Edit these files located in the `dist/markrabey/parials` folder.
```
.
├── dist
|   └── markrabey
|       └── partials
|           ├── comment-counts.hbs
|           ├── comments.hbs
|           ├── footer.hbs
|           ├── google-analytics.hbs
|           └── twitter-meta.hbs
```
####comment-count.hbs and comments.hbs
Edit the JavaScript to reflect your [Disqus](https://disqus.com/) shortname.
```javascript
<script type="text/javascript">

    var disqus_shortname = 'example'; // required: replace example with your Disqus shortname
    ...
</script>
```
If you do not have a Disqus account, I strongly suggest you get one. If you do not want comments on your site, edit `post.hbs` and remove the line near the bottom that reads: `{{> comments}}`.

####footer.hbs
Edit the social media links to reflect your accounts, but leave the RSS link as is, unless you wish to remove it.
```html
<section class="social-links">
    <ul>
        <li><a class="fa fa-rss" target="_blank" href="{{@blog.url}}/rss/"></a></li> <!-- do not change -->
        <li><a class="fa fa-twitter" href="#"></a></li>
        <li><a class="fa fa-facebook" href="#"></a></li>
        <li><a class="fa fa-google-plus" href="#"></a></li> 
    </ul>
</section>
```

You can remove any links you would like, or add others. Icons are available from [FontAwesome](http://fortawesome.github.io/Font-Awesome/).

This portion of the code must remain intact:
```html
<p class="poweredby">
    Theme created by <a href="http://markrabey.com">Mark Rabey</a> &bull; Proudly published with <a href="https://ghost.org">Ghost</a>
</p>
```

####google-analytics.hbs
Edit the JavaScript to reflect your Google Analytics code and URL. If you do not have these, comment out the contents of this file.
```javascript
<script>
  ...

  ga('create', 'UA-XXXXXXXX-X', 'yourdomain.com'); // edit to reflect your Google Analytics code and domain name.
  
  ...
</script>
```

####twitter-meta.hbs
Edit the meta tags to reflect your [Twitter](http://twitter.com) username.
```html
<meta name="twitter:site" content="@"/>
<meta name="twitter:creator" content="@"/>
```
###Install
Copy the folder `dist/markrabey` into your Ghost themes directory (`<ghost-install>/content/themes`). Restart Ghost, login to your Ghost admin, and select the theme 'Mark Rabey' under the 'Settings'.

___
##To Develop
1. Clone this repo.
2. Install the theme to your Ghost install as above.
2. In repo folder (not the install above), type `npm install` and press return.
3. Still in the repo folder, type `grunt` and press return.

A Grunt task is now watching all `.less` and `.js` files located in the associated folders inside of the `src` folder. When changed, `.less` files are complile to CSS, and placed in `src/css`. These files are then minifed and placed in `dist/markrabey/assets/css`. The `.js` files are minified from `src/js` and placed in `dist/markrabey/assets/js`.

To see your changes, you will need to copy the contents of the `dist` folder to your Ghost install directory. You shouldn't need to restart Ghost, but if your changes aren't visible, try that. I'm hoping to have this process automated with Grunt shortly.
