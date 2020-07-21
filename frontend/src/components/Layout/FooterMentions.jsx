import React from 'react';
import Footer from 'react-bulma-components/lib/components/footer';
import { Link } from 'react-router-dom';

const FooterMentions = () => {
    return (
        <Footer>
            <p className="center meta">
            Site réalisé par Rachel Nething - stack MERN - <Link to='/mentionslegales'>Mentions Légales</Link>
            </p>
        </Footer>
    );
}

export default FooterMentions;