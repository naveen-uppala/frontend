import React from 'react';
import './CustomerStyles.css'


const AboutUs = () => {
    const styles= {
        color: '#009ac7'   
    };

    return(
        <div className="about_body">
            <h1 style={styles}>  Hyderabad Packers and Movers</h1>
            <p>Turn to the most trusted Hyderabad packers and movers, Element Moving and Storage.
                Our helpful, dedicated team is available to address even the most specific and unique needs of a local or long-distance move.
            </p>
            <h2  style={styles}>I’m looking for movers near me in Hyderabad, Telangana</h2>
            <p>Element Moving and Storage has you covered. We are experienced in working with a wide range of clients, in the most general terms, these clients include:</p>
                <ul>
                    <li>
                        <strong>Residential:</strong>&nbsp;
                        Our local packers and movers in Hyderabad Telangana bring value to residential moves. We ensure that the move will be quick, efficient and effective. 
                        Element has worked with clients who are moving in and out of everything from small apartments and condos to large, sprawling homes.
                    </li>
                    <li>
                        <strong>Commercial:</strong>&nbsp;
                        If you’re thinking,'I need Hyderabad movers near me that can handle the extensive logistical needs of an office relocation', then you have come to the right place. 
                        We have a team of Hyderabad packers and movers that will streamline a commercial move to minimize the impact that it has on your operations.
                    </li>
                </ul>
            <p>We also offer specialty services. For instance, if you have a piano, our professional piano movers in Hyderabad Telangana can utilize special equipment to make sure that the item is packed, transported and unpacked safely and soundly.
                We’re not just premier Hyderabad professional piano movers, either. We also handle fine art, antiques, furniture and more.
            </p>
            <h2  style={styles}>Movers who care</h2>
            <p>If you find yourself thinking,'I need movers near me in Hyderabad Telangana that will go the extra mile to take care of my belongings', then Element should be your first call. 
                We practice a “Culture of Care,” where we’re devoted to preserving the condition of your items during a move.
            </p>
            <p>Contact our Hyderabad local packers and movers and talk to them about your needs.
                We would be happy to offer you a free proposal and estimate.</p>
        </div>
    )
};

export default AboutUs;