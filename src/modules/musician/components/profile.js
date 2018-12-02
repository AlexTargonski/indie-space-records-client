import React                       from 'react';
import PropTypes                   from 'prop-types';
import styled                      from 'styled-components';
import { Helmet }                  from 'react-helmet';

const Profile = ({ myProfile }) => (
  <div>
    <Profile.Body
      key={myProfile.id}
      elementStyles={JSON.parse(myProfile.theme.style)}
    >
      <Helmet>
        <link href={`https://fonts.googleapis.com/css?family=${JSON.parse(myProfile.theme.fonts).headlineFont}`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css?family=${JSON.parse(myProfile.theme.fonts).regularTextFont}`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css?family=${JSON.parse(myProfile.theme.fonts).linksFont}`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css?family=${JSON.parse(myProfile.theme.fonts).subHead}`} rel="stylesheet" />
      </Helmet>
      <Profile.Header elementStyles={JSON.parse(myProfile.theme.style)}>
        <Profile.NavItems >
          {
            myProfile.theme.sections.map(section =>
              <Profile.NavItem>
                <Profile.Link
                  href=""
                  elementStyles={JSON.parse(myProfile.theme.style)}
                  elementFont={JSON.parse(myProfile.theme.fonts)}
                  className="apply-font-linksFont"
                >
                  {section.name}
                </Profile.Link>
              </Profile.NavItem>
            )
          }
        </Profile.NavItems>
      </Profile.Header>
      {
        myProfile.theme.sections.map(section =>
          <Profile.Section
            key={section.id}
            elementStyles={JSON.parse(section.style)}
          >
            <Profile.SubHeadline
              elementStyles={JSON.parse(myProfile.theme.style)}
              elementFont={JSON.parse(myProfile.theme.fonts)}
              className="apply-font-subHead"
            >
              {section.name}
            </Profile.SubHeadline>
            <Profile.SectionContent
              elementStyles={JSON.parse(myProfile.theme.style)}
              elementFont={JSON.parse(myProfile.theme.fonts)}
              className="apply-font-regularTextFont"
            >
              sddsdsds
            </Profile.SectionContent>
          </Profile.Section>
        )
      }
    </Profile.Body>
  </div>
);

Profile.Body = styled.div`
  color            : ${props => props.elementStyles.color};
  background-color : ${props => props.elementStyles.backgroundColor};
  position         : relative;
`;

Profile.Section = styled.div`
  background-color : ${props => props.elementStyles.background};
  display          : flex;
  flex-direction   : column;
`;

Profile.NavItems = styled.ul`
  margin  : 0;
  padding : 0;
`;

Profile.Link = styled.a`
  && {
    color           : ${props => props.elementStyles.LinksColor};
    text-decoration : none;
    font-family     : ${props => `${props.elementFont.linksFont}`}, sans-serif;
    font-weight     : 600;
    outline         : none;

    &:hover {
      color : ${props => props.elementStyles.LinksHover};
    }
  }
`;

Profile.NavItem = styled.li`
  display : inline-block;
  padding : 2%;
`;

Profile.Header = styled.div`
  background-color : ${props => props.elementStyles.headerBackground};
  text-align       : ${props => props.elementStyles.MenuLinksPosition};
`;

Profile.SubHeadline = styled.h2`
  font-family : ${props => `${props.elementFont.subHead}`}, sans-serif;
  font-size   : ${props => props.elementStyles.h2FontSize}px;
`;

Profile.SectionContent = styled.p`
  font-family : ${props => `${props.elementFont.regularTextFont}`}, sans-serif;
  font-size   : ${props => props.elementStyles.RegularFontSize}px;
`;

Profile.propTypes = {
  myProfile : PropTypes.object.isRequired,
};

export default Profile;
