var AppUI = React.createClass({

  componentWillMount: function () {
    var self = this;
console.log('location = ' + window.location.href);
    self.setState({complete: false});
    var dao = Dao.createNew(this);

//file:///home/jmramoss/almacen/webtuaplicacionpropia/index.html?javascript/intro_reactjs.md
//file:///home/jmramoss/almacen/webtuaplicacionpropia/index.html?www/github_api_rest.md
    var href = window.location.href;

    var params = Utils.getParamsGET();
    var inputPost = params['post'];
    if (inputPost != null && inputPost.length > 0) {
      if (inputPost.endsWith(".md")) {
        dao.provPosts.load(inputPost, "post2Open", function() {
          var post2Open = self.state.post2Open;
          post2Open['id'] = inputPost;
          self._openPost(Article.createNew(self.state.post2Open));
        });
      }
      else {
        dao.selectMenu(inputPost);
      }
    }
    else {
      dao.loadHome();
      dao.loadLastPosts();
    }

    this.setState({dao: dao});
  },

  componentDidMount: function () {
    var self = this;
  },

  componentDidUpdate: function () {
    var self = this;
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    var result = true;
    var self = this;

    if (typeof nextState["complete"] !== "undefined") {
      result = nextState["complete"];
    }

    return result;
  },

  _renderHeader: function() {
    return (
      <div className="header">
        {this._renderHeaderTop()}
        {this._renderHeaderBottom()}
      </div>
    );
  },

  _renderHeaderTop: function() {
    return (
      <div className="header-top">
        <div className="container">
          <div className="logo">
            <a href="index.html"><h1>TU APLICACIÓN PROPIA</h1></a>
          </div>
          <div className="search">
            <form>
              <input type="text" value="Search" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Search';}" />
              <input type="submit" value="" />
            </form>
          </div>
          <div className="social">
            <ul>
              <li><a href="https://www.facebook.com/tuaplicacionpropia" target="_blank" className="facebook"> </a></li>
              <li><a href="https://twitter.com/tuaplicacionpro" target="_blank" className="facebook twitter"> </a></li>
              <li><a href="https://plus.google.com/112667009554417038338?hl=es" target="_blank" className="facebook chrome"> </a></li>
              <li><a href="https://www.linkedin.com/in/jes%C3%BAs-mar%C3%ADa-ramos-saky-835871121/" target="_blank" className="facebook in"> </a></li>
              <li><a href="https://www.youtube.com/channel/UCZ0Y_Mh6iRsNp3jt5lbL7qg" target="_blank" className="facebook yout"> </a></li>

              <li><a href="https://github.com/tuaplicacionpropia/tuaplicacionpropia.github.io" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a></li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  },

  _renderHeaderBottom: function () {
    return (
      <div className="head-bottom">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            {this._renderTopMenu()}
          </div>
        </div>
      </div>
    );
  },

  _renderMenuitem: function(menuitem) {
    var result = null;
    if (menuitem.menu != null && menuitem.menu.length > 0) {
      var result = this._renderMenuitemContainer(menuitem);
    }
    else {
      var result = this._renderMenuitemLeaf(menuitem);
    }
    return result;
  },

  _openMenu: function (menuitem) {
    this.state.dao.selectedPost = null;
    this.state.dao.selectMenu(menuitem.id);
    //alert(menuitem);
  },

  _openHome: function (menuitem) {
    this.state.dao.selectedPost = null;
    this.state.dao.selectMenu(null);
    //alert(menuitem);
  },



  _renderMenuitemLeaf: function(menuitem) {
    return (
      <li><a href="javascript:void(0)" onClick={this._openMenu.bind(this, menuitem)}>{menuitem.title}</a></li>
    );
  },

  _renderMenuitemContainer: function(menuitem) {
    var result = null;
    var options = [];
    if (menuitem.menu != null && menuitem.menu.length > 0) {
      for (var j = 0; j < menuitem.menu.length; j++) {
        var menuitemSuboption = menuitem.menu[j];
        var option = this._renderMenuitem(menuitemSuboption);
        options.push(option);
      }
    }
    var result = (
      <li className="dropdown">
        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{menuitem.title} <span className="caret"></span></a>
        <ul className="dropdown-menu">
          {options}
        </ul>
      </li>
    );
    return result;
  },

  _renderTopMenu: function() {
    var result = null;
    var menu = this.state.menu;//dao.loadMenu();
    //console.log('posts = ' + menu[0].posts);
    var length = (menu != null ? menu.length : 0);
    var options = []
    for (var i = 0; i < length; i++) {
      var menuitem = menu[i];
      var option = this._renderMenuitem(menuitem);
      options.push(option);
    }
    var result = (
            <ul className="nav navbar-nav">
              <li><a href="javascript:void(0)" onClick={this._openHome.bind(this)}>Inicio</a></li>
              {options}
            </ul>
    );
    return result;
  },

  _renderTopMenu2: function() {
    return (
            <ul className="nav navbar-nav">
              <li><a href="index.html">Home</a></li>
              <li><a href="videos.html">Videos</a></li>
              <li><a href="reviews.html">Reviews</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tech <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="tech.html">Action</a></li>
                  <li><a href="tech.html">Action</a></li>
                  <li><a href="tech.html">Action</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Culture <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="singlepage.html">Action</a></li>
                  <li><a href="singlepage.html">Action</a></li>
                  <li><a href="singlepage.html">Action</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Science <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="singlepage.html">Action</a></li>
                  <li><a href="singlepage.html">Action</a></li>
                  <li><a href="singlepage.html">Action</a></li>
                </ul>
              </li>
              <li><a href="design.html">Design</a></li>
              <li><a href="business.html">Business</a></li>
              <li><a href="world.html">World</a></li>
              <li><a href="forum.html">Forum</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
    );
  },

  _openPost: function (post) {
    $('meta[itemprop=image]').attr('content', 'http://tuaplicacionpropia.com/images/banner1.jpg');
    this.state.dao.selectedPost = post;
    window.location.href = '?post=' + post['id'];
    this.forceUpdate();
    //alert('periquito ' + post.title);
  },

  _renderBanner: function() {
    var result = [];
    var articles = this.state.dao.listArticles();
    var length = (articles != null ? articles.length : 0);

    if (length > 0) {
      var index = Utils.randInt(length);

      var self = this;
      var fnOpenPost = function (post) {
        self._openPost(post);
      };
      var article = articles[index];
      var wArticle = newArticleUI({mold: "banner", item: article, openPost: fnOpenPost});
      result.push(wArticle);
    }

    return result;
  },

  _renderContent: function() {
    return (
      <div className="technology">
        {this._renderMainContent()}
      </div>
    );
  },

  _renderMainContent: function() {
    var content = null;
    if (this.state.dao.selectedPost == null) {
      var content = this._renderArticles();
    }
    else {
      var content = newArticleUI({mold: "full", item: this.state.dao.selectedPost});
    }
    return (
  <div className="container">
    <div className="col-md-9 technology-left">
      <div>
        {content}
      </div>
    </div>
    {this._renderSidePanel()}
    <div className="clearfix"></div>
  </div>
    );
  },

  _renderArticles: function() {
    var result = [];
    var articles = this.state.dao.listArticles();
    var length = (articles != null ? articles.length : 0);
    var self = this;
    var fnOpenPost = function (post) {
      self._openPost(post);
    };

    for (var i = 0; i < length; i++) {
      var article = articles[i];
      var wArticle = newArticleUI({mold: "resume", item: article, openPost: fnOpenPost});
      result.push(wArticle);
    }
    return result;
  },

  _renderSidePanel: function() {
    return (
      <div className="col-md-3 technology-right">

        <div className="blo-top">
          <div className="tech-btm">
            <img src="images/banner1.jpg" className="img-responsive" alt="" />
          </div>
        </div>
        <div className="blo-top">
          <div className="tech-btm">
            <h4>Sign up to our newsletter</h4>
            <p>Pellentesque dui, non felis. Maecenas male</p>
            <div className="name">
              <form>
                <input type="text" placeholder="Email" required="" />
              </form>
            </div>	
            <div className="button">
              <form>
                <input type="submit" value="Subscribe" />
              </form>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
        <div className="blo-top1">
          <div className="tech-btm">
            <h4>Top stories of the week </h4>
            <div className="blog-grids">
              <div className="blog-grid-left">
                <a href="singlepage.html"><img src="images/6.jpg" className="img-responsive" alt="" /></a>
              </div>
              <div className="blog-grid-right">
                <h5><a href="singlepage.html">Pellentesque dui, non felis. Maecenas male</a> </h5>
              </div>
              <div className="clearfix"> </div>
            </div>
            <div className="blog-grids">
              <div className="blog-grid-left">
                <a href="singlepage.html"><img src="images/7.jpg" className="img-responsive" alt="" /></a>
              </div>
              <div className="blog-grid-right">
                <h5><a href="singlepage.html">Pellentesque dui, non felis. Maecenas male</a> </h5>
              </div>
              <div className="clearfix"> </div>
            </div>
            <div className="blog-grids">
              <div className="blog-grid-left">
                <a href="singlepage.html"><img src="images/11.jpg" className="img-responsive" alt="" /></a>
              </div>
              <div className="blog-grid-right">
                <h5><a href="singlepage.html">Pellentesque dui, non felis. Maecenas male</a> </h5>
              </div>
              <div className="clearfix"> </div>
            </div>
            <div className="blog-grids">
              <div className="blog-grid-left">
                <a href="singlepage.html"><img src="images/9.jpg" className="img-responsive" alt="" /></a>
              </div>
              <div className="blog-grid-right">
                <h5><a href="singlepage.html">Pellentesque dui, non felis. Maecenas male</a> </h5>
              </div>
              <div className="clearfix"> </div>
            </div>
            <div className="blog-grids">
              <div className="blog-grid-left">
                <a href="singlepage.html"><img src="images/10.jpg" className="img-responsive" alt="" /></a>
              </div>
              <div className="blog-grid-right">
                <h5><a href="singlepage.html">Pellentesque dui, non felis. Maecenas male</a> </h5>
              </div>
              <div className="clearfix"> </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _renderFooter: function() {
    return (
      <div className="footer">
        <div className="container">
          <div className="col-md-4 footer-left">
            <h6>THIS LOOKS GREAT</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt consectetur adipisicing elit,</p>
          </div>
          <div className="col-md-4 footer-middle">
            <h4>Twitter Feed</h4>
            <div className="mid-btm">
              <p>Consectetur adipisicing</p>
              <p>Sed do eiusmod tempor</p>
              <a href="https://w3layouts.com/">https://w3layouts.com/</a>
            </div>
            <p>Consectetur adipisicing</p>
            <p>Sed do eiusmod tempor</p>
            <a href="https://w3layouts.com/">https://w3layouts.com/</a>
          </div>
          <div className="col-md-4 footer-right">
            <h4>Quick Links</h4>
            <li><a href="#">Eiusmod tempor</a></li>
            <li><a href="#">Consectetur </a></li>
            <li><a href="#">Adipisicing elit</a></li>
            <li><a href="#">Eiusmod tempor</a></li>
            <li><a href="#">Consectetur </a></li>
            <li><a href="#">Adipisicing elit</a></li>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  },

  _renderFooterNav: function () {
    return (
      <div className="foot-nav">
        <div className="container">
          {this._renderBottomMenu()}
        </div>
      </div>
    );
  },

  _renderBottomMenu: function () {
    var menu = this.state.menu;//dao.loadMenu();
    var length = (menu != null ? menu.length : 0);
    var options = []
    for (var i = 0; i < length; i++) {
      var menuitem = menu[i];
      var option = this._renderMenuitem(menuitem);
      options.push(option);
    }
    var result = (
      <ul>
        <li><a href="#" onClick={this._openHome.bind(this)}>Inicio</a></li>
        {options}
        <div className="clearfix"></div>
      </ul>
    );
    return result;
  },

  _renderBottomMenu2: function () {
    return (
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="videos.html">Videos</a></li>
            <li><a href="reviews.html">Reviews</a></li>
            <li><a href="tech.html">Tech</a></li>
            <li><a href="singlepage.html">Culture</a></li>
            <li><a href="singlepage.html">Science</a></li>
            <li><a href="design.html">Design</a></li>
            <li><a href="business.html">Business</a></li>
            <li><a href="world.html">World</a></li>
            <li><a href="forum.html">Forum</a></li>
            <li><a href="contact.html">Contact</a></li>
            <div className="clearfix"></div>
          </ul>
    );
  },

  _renderCopyright: function () {
    return (
      <div className="copyright">
        <div className="container">
          <p>© 2016 Business_Blog. All rights reserved | Template by <a href="http://w3layouts.com/">W3layouts</a></p>
        </div>
      </div>
    );
  },
/*
  render: function() {
    return [
      (
        {this._renderHeader()}
      ),
      (
        {this._renderBanner()}
      ),
      (
        {this._renderContent()}
      ),
      (
        {this._renderFooterNav()}
      ),
      (
        {this._renderCopyright()}
      )
    ];
  }
*/

  _renderBannerContent: function() {
    var result = null;
    var result = [];
    if (this.state.dao.selectedPost == null) {
      result.push(this._renderBanner());
    }
    result.push(this._renderContent());
    return result;
  },

  render: function() {
    console.log("RENDERING APP");
    return (
       <span>
        {this._renderHeader()}
        {this._renderBannerContent()}
        {this._renderFooter()}
        {this._renderFooterNav()}
        {this._renderCopyright()}
       </span>
    );
  }

});

var newAppUI = React.createFactory(AppUI);
