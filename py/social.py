#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import hjson
import pprint
import os

#from jinja2 import Template
#from jinja2 import Environment, PackageLoader, select_autoescape
from jinja2 import Environment, PackageLoader, FileSystemLoader

#>>> template = Template('Hello {{ name }}!')
#>>> template.render(name='John Doe')
#u'Hello John Doe!'

class SocialGenerator:
  def __init__ (self, siteFolder):
    self.siteFolder = siteFolder
    self.sitePath = os.path.join(self.siteFolder, 'site.md')
    self.socialFolder = os.path.join(self.siteFolder, 'social')
    self.postsFolder = os.path.join(self.siteFolder, 'posts')
    #print 'sitePath = ' + self.sitePath
    self.site = self.loadSite(self.sitePath)
    #if self.site is not None:
    #  print self.site
    pass

  def generateSocialPage (self, post, target, rootFolder):
    #loader=PackageLoader('yourapplication', 'templates')
    loader = FileSystemLoader('/home/jmramoss/almacen/MyCMS/py/templates/', followlinks=True, encoding='utf-8')
    #env = Environment(loader=loader, autoescape=select_autoescape(['html', 'xml']))
    env = Environment(loader=loader)
    template = env.get_template('social.html.jn2')

    #print '--------------------------------'
    #pp = pprint.PrettyPrinter(indent=4)
    #pp.pprint(post)
    #print post

    #target = '/home/jmramoss/almacen/webtuaplicacionpropia/test.txt'
    template.stream(data=post, rootFolder=rootFolder).dump(target, encoding='utf-8')

  def loadPost (self, postUrl):
    result = None
    fullPostUrl = os.path.join(self.siteFolder, 'posts', postUrl)
    #posturl = None
    #if len(sys.argv) > idx:
    #  posturl = sys.argv[idx]
    if postUrl is not None:
      infile = open(fullPostUrl, 'r')
      result = hjson.load(infile, encoding='utf-8')
      result['url'] = postUrl
    return result

  def loadSite (self, fileaddr):
    result = None
    fileaddr = self.sitePath
    #if len(sys.argv) > idx:
    #  fileaddr = sys.argv[idx]
    if fileaddr is not None:
      infile = open(fileaddr, 'r')
      result = hjson.load(infile, encoding='utf-8')
      result['url'] = fileaddr
    return result

  def _getSocialTarget (self, postUrl):
    result = None
    ridx = postUrl.rindex('.')
    basename = postUrl[:ridx]
    #print 'basename = ' + basename
    targetName = basename + '.html'
    target = os.path.join(self.socialFolder, targetName)
    #print 'dir = ' + targetFolder
    result = target
    return result

  def render (self, postUrl):
    #/home/jmramoss/almacen/webtuaplicacionpropia/posts/popurri/post1.md
    #fullPostUrl = os.path.join(self.siteFolder, 'posts', postUrl)
    #print 'fullPostUrl = ' + fullPostUrl
    #fullPostUrl = os.path.join(fullPostUrl, postUrl)
    #print 'fullPostUrl = ' + fullPostUrl
    post = self.loadPost(postUrl)
    if post is not None:
      post['app'] = self.site
    #  print post

    #encode = (u'Tu aplicacón propia').encode('utf-8')
    #print encode
    #print u'Tu aplicacón propia'

    
    #target = '/home/jmramoss/almacen/webtuaplicacionpropia/social/test.html'
    #print 'basename = ' + os.path.basename(postUrl)
    #ridx = postUrl.rindex('.')
    #basename = postUrl[:ridx]
    #print 'basename = ' + basename
    #targetName = basename + '.html'
    #target = os.path.join(self.socialFolder, targetName)
    target = self._getSocialTarget(postUrl)
    targetFolder = os.path.dirname(target)
    #print 'dir = ' + targetFolder
    if (not os.path.isdir(targetFolder)):
      os.makedirs(targetFolder)

    lenRoot = postUrl.count('/')
    rootFolder = '../'
    for i in range(lenRoot):
      rootFolder += '../'

    self.generateSocialPage(post, target, rootFolder)

  def renderAll (self, force=False):
    for root, directories, filenames in os.walk(self.postsFolder):
      #for directory in directories:
      #  print os.path.join(root, directory) 
      for filename in filenames: 
        if filename.endswith('.md') and filename != 'index.md':
          fullfile = os.path.join(root,filename) 
          lenPosts = len(self.postsFolder) + 1
          postUrl = os.path.join(root, filename)[lenPosts:]
          modTimeMd = os.path.getmtime(fullfile)
          socialPath = self._getSocialTarget(postUrl)
          modTimeSocial = os.path.getmtime(socialPath) if os.path.exists(os.path.join(self.socialFolder, socialPath)) else 0
          if (force or (modTimeMd > modTimeSocial)):
            #print filename 
            #print os.path.join(root,filename) 
            print 'postUrl = ' + postUrl
            self.render(postUrl)
    pass

#./social.py /home/jmramoss/almacen/webtuaplicacionpropia popurri/post1.md
generator = SocialGenerator(sys.argv[1])
#generator.render(sys.argv[2])
generator.renderAll()
