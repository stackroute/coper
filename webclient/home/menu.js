import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router';

class CustomMenu extends React.Component {
    constructor()
    {
        super();
        this.state = {
            drawerMenu: []
        }
        this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.menu != newProps) {
            this.setState({drawerMenu: this.props.menu})
        }
    }
    handleNestedListToggle(item) {
        item.setState({open: item.state.open});
    };
    handleNestedListToggle1(event, item) {
        item.setState({open: item.state.open});
    };
    createMenu(drawerMenu)
    {

        var menuItems = [];
        var that = this;
        drawerMenu.forEach(function(item) {
            var x = {};
            if (item.subMenu.length === 0) {
                x = <ListItem key={item.id + item.text} primaryText={item.text} open={false} containerElement={< Link to = {
                    item.link
                } />}/>;
            } else {

                x = <ListItem key={item.id + item.text} primaryText={item.text} open={that.state.open} onNestedListToggle={that.handleNestedListToggle} nestedItems={that.createMenu(item.subMenu)}/>
            }
            menuItems.push(x);
        })
        return (menuItems)
    }
    render() {
        var menu = this.createMenu(this.state.drawerMenu);
        return (
            <List>
                {menu}
            </List>
        );
    }
}
export default CustomMenu;
