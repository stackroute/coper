import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {List,ListItem} from 'material-ui/List';
import { Link,browserHistory  } from 'react-router';
import axios from 'axios';
const styles={
  paperStyle:{
    textAlign: "justify",
    opacity: "0.5",
    padding: "20px",
    width: "auto",
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '20px',
    height: "600px",
    fontSize: "20px",
    fontWeight:600,

  },
  divStyle:{
    width: "15%",
  }
}
class CustomMenu extends React.Component {
  constructor()
  {
    super();
    this.state={
      drawerMenu: [],
    }
    this.handleNestedListToggle=this.handleNestedListToggle.bind(this);
  }
  componentDidMount()
  {

  }
  componentWillReceiveProps(newProps){
    if(this.props.menu!=newProps)
    {
      this.setState({drawerMenu: this.props.menu})
    }
  }
  handleNestedListToggle(item){
    item.setState({
      open: item.state.open,
    });
  };
  handleNestedListToggle1(event,item){
    item.setState({
      open: item.state.open,
    });
  };
  createMenu(drawerMenu)
  {

    var menuItems=[];
    var that=this;
    drawerMenu.forEach(function(item){
      var x={};
      if(item.subMenu.length === 0)
      {
        x=<ListItem
        key={item.id+item.text}
        primaryText={item.text}
        open={false}
        containerElement={<Link to={item.link} />}
        />;
      }
      else
      {

        x=<ListItem
        key={item.id+item.text}
        primaryText={item.text}
        open={that.state.open}
        onNestedListToggle={that.handleNestedListToggle}
        nestedItems={that.createMenu(item.subMenu)}
        />
      }
      menuItems.push(x);
    })
    return(
      menuItems
      )
  }
  render() {
   var menu=this.createMenu(this.state.drawerMenu);
   return (
     <div>
     {menu}
     </div>
     );

 }
}
export default CustomMenu;
