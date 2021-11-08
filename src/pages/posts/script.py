import os

new_information = '''---
layout: ../../layouts/BlogPost.astro
title: Autism
tag: autism
date: Friday, 2020-09-11
image: /social.jpg
author: Jen Blacow
authorImage: /woman.jpg
description: 
---
'''

for filename in os.listdir(os.getcwd()):
    if not filename.lower().endswith('.py'):
        with open(os.path.join(os.getcwd(), filename), 'r') as contents: # open in readonly mode
            save = contents.read()
        with open(os.path.join(os.getcwd(), filename),'w') as contents:
            contents.write(new_information)
        with open(os.path.join(os.getcwd(), filename),'a') as contents:
            contents.write(save)