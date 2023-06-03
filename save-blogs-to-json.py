import os
import markdown
from bs4 import BeautifulSoup
import time
import json

def md_to_text(md):
    html = markdown.markdown(md)
    soup = BeautifulSoup(html)
    return soup.get_text()
    
def generate_json():
    result = {}
    posts = []
    index = 0
    for filename in os.listdir("_posts"):
        with open(os.path.join("_posts",filename),encoding="utf-8") as f:
            md = f.read()
            text = md_to_text(md)
            post = {"id":index,"text":text,"filename":filename}
            posts.append(post)
        index = index + 1
    result["posts"] = posts
    result["generated_timestamp"] = int(time.time()*1000)
    json_str = json.dumps(result, ensure_ascii=False)
    fw = open("posts.json","w",encoding="utf-8")
    fw.write(json_str)
    fw.close()

if __name__ == "__main__":
    generate_json()