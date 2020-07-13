import React from 'react';

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from "react-share";

import {
    TiSocialTwitter,
    TiSocialFacebook,
    TiSocialLinkedin
} from 'react-icons/ti';

const SocialMedia = ({ shareUrl, name, summary }) => {

    const title = name + summary

    return (
        <>
            <FacebookShareButton
            url={shareUrl}
            quote={title}
            hashtag={'JSwiki'}
            className="margin-right"
          >
            <TiSocialFacebook className="tweet-icon"  />
          </FacebookShareButton>

          <TwitterShareButton
            hashtags={['JavaScript', 'JS', 'JSwiki']}
            url={shareUrl}
            title={title}
            className="margin-right"
          >
            <TiSocialTwitter className="tweet-icon"   />
          </TwitterShareButton>


          <LinkedinShareButton
            title={name}
            summary={summary}
            url={shareUrl}
            className="margin-right"
            >
            <TiSocialLinkedin className="tweet-icon" />
          </LinkedinShareButton>
      
        </>
    );
}

export default SocialMedia;
