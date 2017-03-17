import React from 'react';

class About extends React.Component
{
render()
{
const style={

textAlign:'center',
color:'red',

};
const mainBlock={
  height:140,
  width:'auto',
  backgroundColor:'skyblue',
};
console.log('about');
return(
<div>
<div style={mainBlock}>
<h1 style={style}>About</h1>
</div>
</div>

);


}


}
export default About;
