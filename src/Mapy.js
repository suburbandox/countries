import React from "react";
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;


export default Mapy;
function Mapy(){
    // const defaultProps = {
    //     center: {
    //       lat: 10.99835602,
    //       lng: 77.01502627
    //     },
    //     zoom: 11
    //   };
    
    //   return (
    //     // Important! Always set the container height explicitly
    //     <div style={{ height: '100vh', width: '100%' }}>
    //       <GoogleMapReact
    //         bootstrapURLKeys={{ key: "" }}
    //         defaultCenter={defaultProps.center}
    //         defaultZoom={defaultProps.zoom}
    //       >
    //         <AnyReactComponent
    //           lat={59.955413}
    //           lng={30.337844}
    //           text="My Marker"
    //         />
    //       </GoogleMapReact>
    //     </div>
    //   );
    return
    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d51219.34398997511!2d78.40374700515615!3d17.416561159565376!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1697681648510!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    
}