var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]; 


// $(document).ready(function(){
//   $(".tab--card--header--item").on("click", function(){
//     if(!$(this).hasClass("active"))  {
//            $(".tab--card--header--item").removeClass("active");
//            $(this).addClass("active");
//     if($(this).hasClass("all")){
//         display(results);
//        }  else if ($(this).hasClass("online")){
//          filterChannels(true);
//        } else if ($(this).hasClass("offline")){
//           filterChannels(false);
//        }
//     }
//   });
// });

function fetchData() {
  streamers.forEach(function(streamer){
    function createURL(type, name) {
    return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(createURL("streams", streamer), function(data){
      var game,
          status;
      if (data.stream === null){
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined){
        game = "Account does not exist";
        status = "Account not found";
      } else {
        game = data.stream.game;
        status = "online";
     };
     $.getJSON(createURL("channels", streamer), function(data){
     var logo = data.logo != null ? data.logo: "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
         name = data.display_name != null ? data.display_name: streamer,
         description = status === "online" ? ': ' + data.status:  "";
     html = '<div class="row ' + status + '"><div class="col-xs-3 col-sm-1" id="icon"> <img src="' + 
     logo + '" class="logo"></div><div class="col-xs-10 col-sm-3 col-sm-push-1" id="name"><a href="' + 
     data.url + '"target="_blank">' + 
     name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">' + 
      game + '<span class="hidden-xs">' + 
      description + '</span></div></div>';
      status === "online" ? $(".tab--card--content").prepend(html): $(".tab--card--content").append(html);      
      });
    });
  });
};

$(document).ready(function() {
  fetchData();
  $(".tab--card--header--item").click(function() {
    $(".tab--card--header--item").removeClass("active selected");
    $(this).addClass("active");
    $(this).addClass("selected");
    var status = $(this).attr('id');
    if (status === "all") {
      $(".online, .offline").removeClass("hidden");
    } else if (status === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  })
});

