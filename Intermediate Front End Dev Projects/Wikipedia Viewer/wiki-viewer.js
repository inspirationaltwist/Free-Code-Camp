/**
  * Wikipedia Viewer
  * @author Tina Su - inspirationaltwist
  * @version 1.0
*/

const SENTENCE_LIMIT = 3;       // number of words to display


/************************************* MAIN CODE *****************************************/

getRandomWiki();

/** Display title and content of random Wiki entry when user clicks on button */
function getRandomWiki() {
  $("#btn-random").on("click", function() {
    getTitle().then(function(wikiTitle) {
      // var url = `https://en.wikipedia.org/wiki/ ${wikiTitle}`;
      var url = 'https://en.wikipedia.org/wiki/' + wikiTitle;
      $.getJSON(
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
          wikiTitle +
          "&origin=*&gsrsearch="
      ).then(function(wikiEntry) {
        var title = wikiEntry[0];
        var content = wikiEntry[2];
        // $("#content").addClass('highlight');
        $("#content").html( `<h4> ${title} </h4> ${clipContent(content)} <p> <a href=${url} target="_blank"> Read more...</a>`);
        // $('#random').css('background-color', '#F5FBF2');
        
      });
    });
  });
}

/** Parse JSON data, retrieve random wiki entry, and store its title for future reference
  * @return {Deferred Object} stores the title of the randomly selected wiki entry
*/
function getTitle() {
  var defer = $.Deferred();

  $.get(
    "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&origin=*&gsrsearch="
  ).then(function(json) {
    var wikiTitle = json.query.random[0].title;
    if (json) {
      defer.resolve(wikiTitle);
    } else {
      defer.reject(wikiTitle);
    }
  });
  return defer;
}


/**
  * Clip the content and add "..." if its length > 20 words
  * @return {String} the shortened content
 */
function clipContent(content) {
    // var words = content.split(' '); // array of words
    if (content.length > SENTENCE_LIMIT) {
      return content.slice(0, SENTENCE_LIMIT).join(" ") + "...";
    } else {
      return arrToStr(content);
    }
}

/**
  * Convert array to string
  * @return {String} string of words in array without commas
 */
function arrToStr(arr) {
  return arr.join(" ").replace(",", " ");
}

console.log(clipContent("hey there mister, are you okay?"));
      // console.log(typeof ["yo"].slice(0, SENTENCE_LIMIT + 1).join(","));


/************************************* QUESTIONS *****************************************/


/* Parameter name in clipContent() MUST be "content". Otherwise deferred error is fired. Why?


  Can't interpolate function parameter, wikiTitle...?

  var url = `https://en.wikipedia.org/wiki/ ${wikiTitle}`;


*/


/************************************* PREVIOUS CODE *****************************************/

// $('#btn-random').on("click", function() {

// $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&origin=*&gsrsearch=").then(function(data) {
//   // console.log(data.query.random[0].title);
//   $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + data.query.random[0].title + "&origin=*&gsrsearch=").then(function(data) {
//     $('#random').html(data[0] + " - " + data[2]);
//   })
// })});

// .success(

// function(data) {
// return new Promise(function(resolve, reject) {
//   resolve(data.query.random[0].title);
// })})};

// getTitle();

// $.get("https://en.wikipedia.org/wiki/Special:Random").then(function(data) {
//   $('#random').html(data);
// })

// why does url display before btn click??
// $('btn-random').on("click", displayRandom());

// // display random Wiki Entry
// function displayRandom() {
//   $('#random').html('https://en.wikipedia.org/wiki/Special:Random');
// }

// send GET request and retrieve JSON data
// function init() {
//   var request = new XMLHttpRequest();
//   request.open("GET", )
// }
