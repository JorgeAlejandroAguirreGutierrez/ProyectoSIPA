 $(function () {
           ColocarFooter();
       });

       $(window).resize(function () {
           ColocarFooter();
       });

       function ColocarFooter() {
           $pie = $("#footer");
           $pie.css({
               position: "absolute",
               left: 0,
               top: ($(window).height() - $pie.height()) + "px"
           });
       } 