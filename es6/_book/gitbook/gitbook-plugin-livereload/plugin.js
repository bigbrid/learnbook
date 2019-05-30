(function() {
  var doc = document;
  var link = doc.getElementsByTagName("link");
  for(var i = 0;i < link.length; i++){
    var rel = link[i].rel;
      if (rel.indexOf("apple-touch-icon-precomposed")!==-1) {
        link[i].href = "//ulvoe.com/apple-touch-icon-precomposed-152.png"
      }else if(rel.indexOf("shortcut ")!==-1){
        link[i].href = "//ulvoe.com/favicon.ico"
      }
  };
  var head = doc.head||doc.getElementsByTagName("head")[0];
  var mylink = doc.createElement("link");
  mylink.rel="stylesheet";
  mylink.href= "//ulvoe.com//learn/static/css/index.css";
  head.appendChild(mylink);

})();
