let posts;
let index = new FlexSearch.Index({
  tokenize: "forward",
  encode: str => str.toLowerCase().replace(/[:"“”、：]/g, " ").replace(/\n/g, " ").replace(/([\u4e00-\u9fa5])/g, " $1 ").split(" ")
});

document.getElementsByClassName("search-button")[0].addEventListener("click",function(){
  search();
});
document.getElementsByClassName("keywords")[0].addEventListener("keydown",async function(event){
  if (event.code === "Enter") {
    search();
  }
});

window.addEventListener("popstate", (event) => {
  console.log(event);
  checkURLParamAndSearch();
});

indexDocument();

function search(){
  updateStatus("搜索中……");
  const keywords = document.getElementsByClassName("keywords")[0].value.toLowerCase();
  const results = index.search(keywords);
  console.log(results);
  listSearchResults(results);
  const newURL = window.location.origin + window.location.pathname + "?keywords=" + encodeURIComponent(keywords);
  if (newURL != window.location.href) {
    //window.location.replace(newURL);
    history.pushState(null, null, newURL);
  }
  updateStatus("");
}

function listSearchResults(results){
  const container = document.getElementsByClassName("search-results")[0];
  container.innerHTML = "";
  const matchAll = document.getElementsByClassName("matchAll")[0].checked;
  for (let i = 0; i < results.length; i++) {
    const id = results[i];
    const post = posts[id];
    let shouldAdd = true;
    if (matchAll) {
      if (allMatched(post) === false) {
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      const item = buildSearchResultItem(post);
      container.appendChild(item);
    }
  }
  const statistics = document.createElement("div");
  statistics.innerText = "找到"+container.childNodes.length+"条结果：";
  container.insertBefore(statistics, container.childNodes[0]);
}

function allMatched(post) {
  const keywords = document.getElementsByClassName("keywords")[0].value;
  const keywordsLowerCase = keywords.toLowerCase();
  const content = getContentToIndex(post);
  if (content.indexOf(keywords) != -1) {
    return true;
  }else{
    if (content.indexOf(keywordsLowerCase) != -1) { //match lower case
      return true;
    }
    return false;
  }
}

function buildSearchResultItem(post){
  const container = document.createElement("div");
  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = post.url;
  link.innerText = post.title
  link.style.color = "blue";
  const postDate = document.createElement("time");
  postDate.setAttribute("datetime",post.date);
  postDate.innerText = post.date + " ";
  postDate.style.color = "#999999";
  const highlights = document.createElement("div");
  highlights.innerHTML = getHighlights(post.text)
  highlights.insertBefore(postDate,highlights.childNodes[0]);
  title.appendChild(link);
  container.appendChild(title);
  container.appendChild(highlights);
  return container;
}

function getHighlights(content){
  const keywords = document.getElementsByClassName("keywords")[0].value;
  let context = getContext(content, keywords);
  const regexForContent = new RegExp(keywords, 'gi');
  // Replace content where regex matches
  context = context.replace(regexForContent, "<span class='hightlighted'>$&</span>");
  return context;
}

function getContentToIndex(post){
  return post.title + " " + post.text;
}

function getContext(content,keywords){
  const startIndex = Math.max(0,content.indexOf(keywords) - 50);
  const endIndex = Math.min(content.indexOf(keywords) + 50 + keywords.length, content.length);
  return content.substring(startIndex, endIndex)+"...";
}

function checkURLParamAndSearch(){
  if (getURLParameter("keywords")){
    document.getElementsByClassName("keywords")[0].value = getURLParameter("keywords");
    search();
  }
}

async function indexDocument(){
  let downloaded = await localforage.getItem("posts");
  if (await needToDownload(downloaded)) {
    console.log("需要重新下载");
    downloaded = await downloadPosts();
    await localforage.setItem("posts",downloaded);
  }
  updateStatus("索引中……");
  const result = JSON.parse(downloaded.responseText);
  posts = result.posts;
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    index.add(post.id,getContentToIndex(post));
  }
  checkURLParamAndSearch();
  updateStatus("");
}

function downloadPosts(){
  return new Promise(function(resolve){
    updateStatus("下载博客内容中……");
    function reqListener() {
      updateStatus("");
      const lastModified = Date.parse(req.getResponseHeader("Last-Modified"));
      resolve({responseText:this.responseText,lastModified:lastModified});
    }
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", "/posts.json");
    req.send();
  });
}

function needToDownload(downloaded){
  return new Promise(function(resolve){
    if (!downloaded) {
      resolve(true);
    }else{
      function getHeaderTime() {
        const lastModified = Date.parse(this.getResponseHeader("Last-Modified"));
        if (lastModified > downloaded.lastModified) {
          resolve(true);
        }else{
          resolve(false);
        }
      }
      const req = new XMLHttpRequest();
      req.open(
        "HEAD", // use HEAD when you only need the headers
        "/posts.json"
      );
      req.onload = getHeaderTime;
      req.send();
    }
  });
}

function updateStatus(info){
  document.getElementsByClassName("status")[0].innerText = info;
}

function getURLParameter(key) {
  let paramString = window.location.href.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  for(let pair of queryString.entries()) {
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return undefined;
}
