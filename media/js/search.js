let posts;
let index = new FlexSearch.Index({
  tokenize: "forward",
  encode: str => str.replace(/[:"“”：]/g, " ").replace(/\n/g, " ").replace(/([\u4e00-\u9fa5])/g, " $1 ").split(" ")
});

document.getElementsByClassName("search-button")[0].addEventListener("click",function(){
  search();
});
document.getElementsByClassName("keywords")[0].addEventListener("keydown",async function(event){
  if (event.code === "Enter") {
    search();
  }
});

indexDocument();

function search(){
  updateStatus("搜索中……");
  const keywords = document.getElementsByClassName("keywords")[0].value;
  const results = index.search(keywords);
  console.log(results);
  listSearchResults(results);
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
  if (post.text.indexOf(keywords) != -1) {
    return true;
  }else{
    return false;
  }
}

function buildSearchResultItem(post){
  const container = document.createElement("div");
  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = getHrefByFilename(post.filename);
  link.innerText = getTitle(post.text);
  link.style.color = "blue";
  const highlights = document.createElement("div");
  highlights.innerHTML = getHighlights(post.text)
  title.appendChild(link);
  container.appendChild(title);
  container.appendChild(highlights);
  return container;
}

//2014-01-20-hello.md -> hello
function getHrefByFilename(filename){
  filename = filename.substring(filename.indexOf("-")+1,filename.length);
  filename = filename.substring(filename.indexOf("-")+1,filename.length);
  const href = filename.substring(filename.indexOf("-")+1,filename.lastIndexOf("."));
  return "/"+href+"/";
}

function getHighlights(content){
  const keywords = document.getElementsByClassName("keywords")[0].value;
  let context = getContext(content, keywords);
  const regexForContent = new RegExp(keywords, 'gi');
  // Replace content where regex matches
  context = context.replace(regexForContent, "<span class='hightlighted'>$&</span>");
  return context;
}

function getContext(content,keywords){
  const startIndex = Math.max(0,content.indexOf(keywords) - 50);
  const endIndex = Math.min(content.indexOf(keywords) + 50 + keywords.length, content.length);
  return content.substring(startIndex, endIndex);
}

function getTitle(content){
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.startsWith("title: ")) {
      line = line.substring("title: ".length,line.length);
      return line.replace("\"","");
    }
  }
}

async function indexDocument(){
  updateStatus("索引中……");
  const jsonString = await downloadPosts();
  const result = JSON.parse(jsonString);
  posts = result.posts;
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    index.add(post.id,post.text);
  }
  updateStatus("");
}

function downloadPosts(){
  return new Promise(function(resolve){
    updateStatus("下载博客内容中……");
    function reqListener() {
      updateStatus("");
      resolve(this.responseText);
    }
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", "/posts.json");
    req.send();
  });
}

function updateStatus(info){
  document.getElementsByClassName("status")[0].innerText = info;
}
