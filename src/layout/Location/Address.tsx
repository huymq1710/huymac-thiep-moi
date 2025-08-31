import styled from '@emotion/styled';
import data from 'data.json';
import { Caption, PointTitle } from '@/components/Text.tsx';
import { ILocationInfo } from '@/types/data.ts';

const Address = () => {
  const { locationInfo } = data;
  
  const renderTextWithLinks = (text: string) => {
    // Pattern để detect URL với custom text: (URL|text)
    const customLinkRegex = /\((https?:\/\/[^\s|]+)\|([^)]+)\)/g;
    // Pattern để detect URL thông thường
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Xử lý custom links trước
    let processedText = text.replace(customLinkRegex, (_, url, linkText) => {
      return `__CUSTOM_LINK__${url}__TEXT__${linkText}__END__`;
    });
    
    // Sau đó xử lý URL thông thường
    const parts = processedText.split(/(__CUSTOM_LINK__[^_]+__TEXT__[^_]+__END__|https?:\/\/[^\s]+)/);
    
    return parts.map((part, index) => {
      // Xử lý custom link
      if (part.startsWith('__CUSTOM_LINK__')) {
        const matches = part.match(/__CUSTOM_LINK__([^_]+)__TEXT__([^_]+)__END__/);
        if (matches) {
          const [, url, linkText] = matches;
          return (
            <StyledLink 
              key={index} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {linkText}
            </StyledLink>
          );
        }
      }
      
      // Xử lý URL thông thường
      if (urlRegex.test(part)) {
        return (
          <StyledLink 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {part}
          </StyledLink>
        );
      }
      
      return part;
    });
  };

  return (
    <WayWrapper>
      {locationInfo?.map((item: ILocationInfo) => {
        const { title, desc } = item;
        return (
          <Way key={title}>
            <PointTitle>{title}</PointTitle>
            <Caption>{renderTextWithLinks(desc)}</Caption>
          </Way>
        );
      })}
    </WayWrapper>
  );
};

export default Address;

const WayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0px;
  gap: 20px;
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const StyledLink = styled.a`
  color: #007bff;
  text-decoration: underline;
  
  &:hover {
    color: #0056b3;
    text-decoration: none;
  }
  
  &:visited {
    color: #6f42c1;
  }
`;
