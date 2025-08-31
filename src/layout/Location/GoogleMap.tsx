const GoogleMap = () => {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '230px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3727.4697113403467!2d106.6043196!3d20.8934139!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a79517f48d819%3A0xa0165e3dca9a94a3!2zQ-G6o25oIEjGsG5nIFBhbGFjZQ!5e0!3m2!1sen!2s!4v1756646950088!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Cảnh Hưng Palace - Địa điểm tổ chức lễ cưới"
      />
    </div>
  );
};

export default GoogleMap;
