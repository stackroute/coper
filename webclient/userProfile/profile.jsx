import React from 'react';

class Profile extends React.Component {
  constructor()
  {
    super();

  }
  render() {
   const style={
     textAlign: 'center',
   };

   return(
    <div>
    <br/>
    <br/>
    <br/>
    <h1 style = {style}>Hey there :)</h1>
   </div>
   );

}
}
export default Profile;
