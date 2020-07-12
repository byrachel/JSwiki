import React from 'react';

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

import {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

const SocialMedia = ({ shareUrl, name, summary }) => {

    const title = name + ' | JS(wiki)'

    return (
        <>
            <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="margin-right"
          >
            <FacebookIcon size={20} borderRadius={10} />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="margin-right"
          >
            <TwitterIcon size={20} borderRadius={10} />
          </TwitterShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="margin-right"
          >
            <WhatsappIcon size={20} borderRadius={10} />
          </WhatsappShareButton>


          <LinkedinShareButton url={shareUrl}
            className="margin-right"
            >
            <LinkedinIcon size={20} borderRadius={10} />
          </LinkedinShareButton>
      
        </>
    );
}

export default SocialMedia;
