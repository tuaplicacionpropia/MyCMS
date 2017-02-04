var ArticleUI = React.createClass({

  componentWillMount: function () {
    var self = this;
  },

  componentDidMount: function () {
    var self = this;
  },

  componentDidUpdate: function () {
    var self = this;
  },

  _openPost: function() {
    if (this.props.openPost != null) {
      this.props.openPost(this.props.item);
    }
    else {
      alert(this.props.item.title);
    }
  },

  _renderMoldBanner: function() {
    var article = this.props.item;

    var title = article.getTitle();
    var title = (title != null ? title : "");

    var contentHtml = article.getContentHtml();
    var contentHtml = (contentHtml != null ? contentHtml : "");

    var firstParagraph = article.getFirstParagraph();

    var mainImage = article.getMainImage();
    var mainImage = (mainImage != null ? "images/" + mainImage : "");
    var attrStyle = "url(" + mainImage + ")";

    return (
      <div className="banner" style={{backgroundImage: attrStyle}}>
        <div className="container">
          <h2>{title}</h2>
          <span dangerouslySetInnerHTML={{__html: [firstParagraph]}} />
          <a href="#" onClick={this._openPost}>READ ARTICLE</a>
        </div>
      </div>
    );
  },

  _renderMoldResume: function() {
    var article = this.props.item;

    var title = article.getTitle();
    var title = (title != null ? title : "");

    var mainImage = article.getMainImage();
    var mainImage = (mainImage != null ? "images/" + mainImage : "");

    var mainLabel = article.getMainLabel();
    var mainLabel = (mainLabel != null ? mainLabel : "");

    var contentHtml = article.getContentHtml();
    var contentHtml = (contentHtml != null ? contentHtml : "");

    var firstParagraph = article.getFirstParagraph();

    var publishDay = null;//article.getPublishDateDay();
    var publishDay = (publishDay != null ? publishDay : "");

    var author = article.getAuthor();
    var author = (author != null ? author : "");

    var numComments = null;
    var numComments = (numComments != null ? numComments : 0);

    var numFavourites = null;
    var numFavourites = (numFavourites != null ? numFavourites : 0);

    var numViews = null;
    var numViews = (numViews != null ? numViews : 0);

    return (
<span>
        <div className="soci">
          <ul>
            <li><a href="#" className="facebook-1"> </a></li>
            <li><a href="#" className="facebook-1 twitter"> </a></li>
            <li><a href="#" className="facebook-1 chrome"> </a></li>
            <li><a href="#"><i className="glyphicon glyphicon-envelope"> </i></a></li>
            <li><a href="#"><i className="glyphicon glyphicon-print"> </i></a></li>
            <li><a href="#"><i className="glyphicon glyphicon-plus"> </i></a></li>
          </ul>
        </div>
        <div className="tc-ch" onClick={this._openPost}>
        {mainImage.length > 0 &&
          <div className="tch-img">
            <a href="#"><img src={mainImage} className="img-responsive" alt="" /></a>
          </div>
        }
        {mainImage.length > 0 && mainLabel.length > 0 &&
          <a className="blog pink" href="singlepage.html">{mainLabel}</a>
        }
          <h3><a href="#">{title}</a></h3>
          <span dangerouslySetInnerHTML={{__html: [firstParagraph]}} />
          <div className="blog-poast-info">
            <ul>
            {author.length > 0 &&
              <li><i className="glyphicon glyphicon-user"> </i><a className="admin" href="#"> {author} </a></li>
            }
            {publishDay.length > 0 &&
              <li><i className="glyphicon glyphicon-calendar"> </i>{publishDay}</li>
            }
            {numComments > 0 &&
              <li><i className="glyphicon glyphicon-comment"> </i><a className="p-blog" href="#">{numComments} Comments </a></li>
            }
            {numFavourites > 0 &&
              <li><i className="glyphicon glyphicon-heart"> </i><a className="admin" href="#">{numFavourites} favourites </a></li>
            }
            {numViews > 0 &&
              <li><i className="glyphicon glyphicon-eye-open"> </i>{numViews} views</li>
            }
            </ul>
          </div>
        </div>
</span>
    );
  },


  _renderMoldMini: function() {
    return (
      <div className="blog-grids">
        <div className="blog-grid-left">
          <a href="singlepage.html"><img src="images/6.jpg" className="img-responsive" alt="" /></a>
        </div>
        <div className="blog-grid-right">
          <h5><a href="singlepage.html">Pellentesque dui, non felis. Maecenas male</a> </h5>
        </div>
        <div className="clearfix"> </div>
      </div>
    );
  },



  _renderMoldFull_Comments: function () {
    var result = null;

    var article = this.props.item;
    var title = article.getTitle();
    var title = (title != null ? title : "");

    var pageId = Utils.slugify(title);
    var result = newDisqusUI({"pageId": pageId});
    return result;
  },

  _renderMoldFull_Comments2: function () {
    return [
      (
        <div className="comment-top">
          <h2>Comment</h2>
          <div className="media-left">
            <a href="#">
              <img src="images/si.png" alt="" />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">Richard Spark</h4>
            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
            <div className="media">
              <div className="media-left">
                <a href="#">
                  <img src="images/si.png" alt="" />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">Joseph Goh</h4>
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                <div className="media">
                  <div className="media-left">
                    <a href="#">
                      <img src="images/si.png" alt="" />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Melinda Dee</h4>
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="media">
              <div className="media-left">
                <a href="#">
                  <img src="images/si.png" alt="" />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">Rackham</h4>
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
              </div>
            </div>
          </div>
        </div>
        ), 
        (
          <div className="comment">
            <h3>Leave a Comment</h3>
            <div className=" comment-bottom">
              <form>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Message" required=""></textarea>
                <input type="submit" value="Send" />
              </form>
            </div>
          </div>
        )
     ];
  },

  _renderMoldFull: function() {
    var article = this.props.item;

    var title = article.getTitle();
    var title = (title != null ? title : "");

    var mainImage = article.getMainImage();
    var mainImage = (mainImage != null ? "images/" + mainImage : "");

    var mainLabel = article.getMainLabel();
    var mainLabel = (mainLabel != null ? mainLabel : "");

    var contentHtml = article.getContentHtml();
    var contentHtml = (contentHtml != null ? contentHtml : "");

    var firstParagraph = article.getFirstParagraph();

    var publishDay = article.getPublishDateDay();
    var publishDay = (publishDay != null ? publishDay : "");

    var author = article.getAuthor();
    var author = (author != null ? author : "");

    var numComments = null;
    var numComments = (numComments != null ? numComments : 0);

    var numFavourites = null;
    var numFavourites = (numFavourites != null ? numFavourites : 0);

    var numViews = null;
    var numViews = (numViews != null ? numViews : 0);



    return (
        <div className="tc-ch business">
          <div className=" blog-grid2">
            <img src={mainImage} className="img-responsive" alt="" />
            <div className="blog-text">
              <h5>{title}</h5>
              <span dangerouslySetInnerHTML={{__html: [contentHtml]}} />
          <div className="blog-poast-info">
            <ul>
            {author.length > 0 &&
              <li><i className="glyphicon glyphicon-user"> </i><a className="admin" href="#"> {author} </a></li>
            }
            {publishDay.length > 0 &&
              <li><i className="glyphicon glyphicon-calendar"> </i>{publishDay}</li>
            }
            {numComments > 0 &&
              <li><i className="glyphicon glyphicon-comment"> </i><a className="p-blog" href="#">{numComments} Comments </a></li>
            }
            {numFavourites > 0 &&
              <li><i className="glyphicon glyphicon-heart"> </i><a className="admin" href="#">{numFavourites} favourites </a></li>
            }
            {numViews > 0 &&
              <li><i className="glyphicon glyphicon-eye-open"> </i>{numViews} views</li>
            }
            </ul>
          </div>
            </div>
          </div>
          {this._renderMoldFull_Comments()}
        </div>
    );
  },

  render: function() {
    var self = this;
    var mold = self.props.mold;
    var result = null;
    var result = (mold == "banner" ? this._renderMoldBanner() : result);
    var result = (mold == "resume" ? this._renderMoldResume() : result);
    var result = (mold == "mini" ? this._renderMoldMini() : result);
    var result = (mold == "full" ? this._renderMoldFull() : result);
    return result;
  }

});

var newArticleUI = React.createFactory(ArticleUI);
