import styled from '@emotion/styled';
import data from 'data.json';
import Button from '@/components/Button.tsx';

const MapButtons = () => {
  const { googleMap } = data.mapInfo;

  return (
    <MapButtonWrapper>
      <Button onClick={() => window.open(googleMap)}>Mở Google Maps</Button>
    </MapButtonWrapper>
  );
};

export default MapButtons;

const MapButtonWrapper = styled.div`
  margin: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
`;
