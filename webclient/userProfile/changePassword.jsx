import React from 'react';

class ChangePassword extends React.Component {
  constructor()
  {
    super();
    this.state={
      drawerMenu: [],
    }
  }
  componentDidMount()
  {

  }

  render() {
   const style={
     textAlign: 'center',
   };
   return(
    <div><h1 style={style}>ChangePassword :/</h1></div>
    );

 }
}
export default ChangePassword;
