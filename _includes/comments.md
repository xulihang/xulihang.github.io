 <!-- 必须提供一个 id 完全相同的 div -->
    <div id="disqus_thread"></div>

    <!-- 一些元素用到了 FA 的 icon, 这一段可以放到 header 里面 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    <script>
      window.disqusProxy = {
        username:'xulihang',  // 你的 Disqus username
        server: 'cattc-contest.com', // 你的 VPS IP
        port: 5509, // 这个 repo 的服务端对应的端口
        identifier: window.location.href // 页面 identifier, 一般就是页面 url
      };
      window.disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = window.location.href;
      };
      var s = document.createElement('script');
      s.src = '/static/js/main.09c31d67.js'; //引用 static 文件夹下面的 JS
      s.async = true;
      document.body.appendChild(s);
    </script>
    <!-- 引用 static 文件夹下面的 CSS -->
    <link rel="stylesheet" href="/static/css/main.331fc925.css"> 