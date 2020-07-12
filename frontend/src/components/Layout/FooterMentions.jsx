import React from 'react';
import Footer from 'react-bulma-components/lib/components/footer';
import { Link } from 'react-router-dom';

const FooterMentions = () => {
    return (
        <Footer centered>
            <p className="center meta">
            Website réalisé par Rachel Nething - stack MERN - <Link to='/mentionslegales'>Mentions Légales</Link>
            </p>
        </Footer>
    );
}

export default FooterMentions;
