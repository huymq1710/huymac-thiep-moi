import React from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
import { BrideAndGroom } from '@/types/data.ts';

const Host = () => {
  const { groom, bride } = data.greeting.host;
  return (
    <>
      <HostContainer>
        <HostInfo person={groom} />
        <HostInfo person={bride} />
      </HostContainer>
    </>
  );
};

export default Host;

const HostInfo = ({ person }: { person: BrideAndGroom }) => {
  // Hardcode names based on relation
  const displayName = person.relation === 'Con trai' ? '🤵🏻‍♂️ Mạc Quang Huy' : '👰🏻‍♀️ Hoàng Thanh Hương';
  
  return (
    <HostDetails>
      <HighlightedName>{displayName}</HighlightedName>
      <RelationshipText>
        Bố mẹ
      </RelationshipText>
      <ParentsInfo>
        {person.parents && (
          <>
            {person.parents.map((parent, index) => (
              <React.Fragment key={index}>
                {index > 0 && ' · '}
                {parent.name}
              </React.Fragment>
            ))}
          </>
        )}
      </ParentsInfo>
    </HostDetails>
  );
};

const HighlightedName = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #4f4f4f;
  margin-right: 5px;
`;

const HostContainer = styled.div`
  gap: 8px;
  font-family: 'Crimson Text', serif;
`;

const HostDetails = styled.div`
  padding: 20px 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-weight: 700;
  font-family: 'Crimson Text', serif;
  gap: 8px;
  margin-bottom: 20px;
`;

const ParentsInfo = styled.div`
  font-size: 1.05rem;
  color: #333;
  margin-bottom: 4px;
  font-weight: 600;
`;

const RelationshipText = styled.div`
  font-size: 0.9rem;
  color: #888;
  font-weight: 500;
`;
