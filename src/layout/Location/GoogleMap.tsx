const GoogleMap = () => {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '250px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(232, 140, 166, 0.2)',
        border: '2px solid rgba(232, 140, 166, 0.2)',
        position: 'relative'
      }}
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3727.4697113403467!2d106.6043196!3d20.8934139!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a79517f48d819%3A0xa0165e3dca9a94a3!2zQ-G6o25oIEjGsG5nIFBhbGFjZQ!5e0!3m2!1sen!2s!4v1756646950088!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '14px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Cảnh Hưng Palace - Địa điểm tổ chức lễ cưới"
      />
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '6px 10px',
        borderRadius: '20px',
        fontSize: '0.56rem',
        fontFamily: 'Crimson Text, serif',
        color: '#44484d',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(232, 140, 166, 0.3)',
        boxShadow: '0 2px 8px rgba(232, 140, 166, 0.2)'
      }}>
        🏰 Cảnh Hưng Palace
      </div>
    </div>
  );
};

export default GoogleMap;
