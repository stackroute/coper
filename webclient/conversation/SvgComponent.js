import React from 'react';
import speaker from 'material-ui/svg-icons';

import SvgIcon from 'material-ui/SvgIcon';


class SvgIconarea extends React.Component {

render(props)
{
const styles = {

  float: 'right',
  marginRight: '1%',
  marginBottom: '2px',
//  height: '40px'
};
return(

  <div>
  <SvgIcon {...props }style={styles}>
    case 'perm-camera-mic':
    return (
    <g><path d="M20 5h-3.17l-1.83-2h-6l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91v2.09h7c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2v-4c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
    );
    </SvgIcon>


    </div>
  );
}
}

    export default SvgIconarea;
