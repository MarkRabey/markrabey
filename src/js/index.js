$(document).ready(function() {
  $('div#related-posts').css('text-align', 'center').html('<i class="fa fa-spinner fa-spin fa-5x"></i>');
  $.get('/rss', function(data) {
    var posts = [];
    var items = $(data).find('item');

     for (var i = 0; i < items.length; i++) {

        var item = items.eq(i);

        if (item.find('title').text() !== getCurrentPostTitle('.post-title')) {

            posts.push({
                title: item.find('title').text(),
                url: item.find('link').text(),
                content: item.find('description').text(),
                tags: $.map(item.find('category'), function(elem) {
                    return $(elem).text();
                })
            });
        }
    }

    var related = matchByTag(getCurrentPostTags('.post-tags'), posts);
    var count = 0;
    $('div#related-posts').css('text-align', 'left').html('<ul></ul>');
    var list = $('div#related-posts ul');
    related.forEach(function(post) {
        console.log(post);
        if (count < 4) {
            $(list).append($('<li><a href="' + post.url + '">' + post.title + '</a></li>'));
        }
        count++;
    });

    if (count == 0) {
        $(list).append($('<p>No related posts were found. ' +
            'Check the <a href="/">index</a>.</p>'));
    }
  });
  
});


/**
 * Main JS file for Single Column behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function singlecolumnFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        singlecolumnFullImg();
        $(window).smartresize(singlecolumnFullImg);

    });
}(jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

function getCurrentPostTitle(titleClass) {

  if (titleClass[0] != '.') {
      titleClass = '.' + titleClass;
  }

  var postTitle = $(titleClass).text();

  if (postTitle.length < 1) {
      this.reportError("Couldn't find the post title with class: " + titleClass);
  }

  return postTitle;
};

function getCurrentPostTags(tagsClass) {

    if (tagsClass[0] != '.') {
        tagsClass = '.' + tagsClass;
    }

    var tags = [];
    $(tagsClass + ' a').each(function() {
        tags.push($(this).text());
    });

    if (tags.length < 1) {
        this.reportError("Couldn't find any tags in this post");
    }

    return tags;
};

function matchByTag(postTags, posts) {

  var matches = [];

  posts.forEach(function(post) {

      var beenAdded = false;
      post.tags.forEach(function(tag) {

          postTags.forEach(function(postTag) {

              if (postTag.toLowerCase() === tag.toLowerCase() && !beenAdded) {
                  matches.push(post);
                  beenAdded = true;
              }
          });
      });
  });

  if (matches.length < 1) {
      this.reportError("There are no closely related posts");
  }

  return matches;
};